#!/usr/bin/env node

// Check a running production build: npm run verify-seo -- http://localhost:3100
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const baseUrl = process.argv[2] || "http://localhost:3000";
const reportOnly = process.argv.includes("--report");
let passed = 0;
let total = 0;

async function get(url, options = {}) {
	const response = await fetch(new URL(url, baseUrl), {
		...options,
		signal: AbortSignal.timeout(10000),
	});
	return { response, body: await response.text() };
}

async function check(name, run) {
	total++;
	try {
		await run();
		passed++;
		console.log(`PASS ${name}`);
	} catch (error) {
		console.log(`FAIL ${name}: ${error.message}`);
	}
}

function publicRoutes(directory, segments = []) {
	return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		if (entry.isDirectory()) {
			if (/^[_\[]/.test(entry.name)) return [];
			return publicRoutes(path.join(directory, entry.name),
				entry.name.startsWith("(") ? segments : [...segments, entry.name]);
		}
		return entry.name === "page.tsx" ? [`/${segments.join("/")}${segments.length ? "/" : ""}`] : [];
	});
}

async function main() {
	const { response: htmlResponse, body: html } = await get("/", { headers: { Accept: "text/html" } });
	assert.equal(htmlResponse.status, 200, "Homepage must be reachable");

	await check("Raw homepage content", () => {
		assert.match(html, /<h1\b/i);
		const text = html.replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
			.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
		assert.ok(text.length >= 500, `Only ${text.length} characters of raw content`);
		assert.match(text, /Celestia/);
	});

	await check("AI crawler access", async () => {
		const { response, body } = await get("/robots.txt");
		assert.equal(response.status, 200);
		assert.match(body, /User-agent:\s*\*\s*\nAllow:\s*\//i);
		for (const agent of ["ChatGPT-User", "OAI-SearchBot", "Claude-User", "PerplexityBot"]) {
			const page = await get("/", { headers: { "User-Agent": agent } });
			assert.equal(page.response.status, 200, agent);
			assert.match(page.body, /<h1\b/i, agent);
			assert.doesNotMatch(page.body, /cf-chl-|Just a moment\.\.\./i, agent);
		}
	});

	await check("Complete public sitemap", async () => {
		const { response, body } = await get("/sitemap.xml");
		assert.equal(response.status, 200);
		assert.match(response.headers.get("content-type"), /xml/);
		assert.match(body, /<urlset\b/);
		const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
		const paths = new Set(urls.map((url) => url.pathname));
		assert.equal(paths.size, urls.length, "Duplicate sitemap URLs");
		const expected = [...publicRoutes("src/app"), ...fs.readdirSync("src/content/glossary")
			.filter((file) => file.endsWith(".md")).map((file) => `/glossary/${file.slice(0, -3)}/`)];
		const missing = expected.filter((route) => !paths.has(route));
		assert.deepEqual(missing, [], "Public pages missing from sitemap");
		assert.ok(!urls.some((url) => /localhost|127\.0\.0\.1/.test(url.hostname)), "Local sitemap URLs");
		assert.ok(!paths.has("/dev/"), "Dev routes must not be indexed");
	});

	await check("Homepage metadata", () => {
		assert.match(html, /<html[^>]+lang=["']en["']/);
		assert.match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/celestia\.org\/["']/);
		assert.match(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']https:\/\//);
		assert.match(html, /<meta[^>]+property=["']og:type["'][^>]+content=["']website["']/);
	});

	await check("Organization and website JSON-LD", () => {
		const graphs = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)]
			.flatMap((match) => { const data = JSON.parse(match[1]); return data["@graph"] || [data]; });
		for (const type of ["Organization", "WebSite"]) {
			const entity = graphs.find((item) => item["@type"] === type);
			assert.ok(entity, `Missing ${type}`);
			assert.equal(entity.name, "Celestia");
			assert.equal(new URL(entity.url).hostname, "celestia.org");
			assert.ok(entity.description);
		}
	});

	await check("Homepage Markdown negotiation", async () => {
		for (const accept of ["text/markdown", "text/markdown; charset=utf-8", "text/html;q=0.5, text/markdown;q=0.9"]) {
			const { response, body } = await get("/", { headers: { Accept: accept } });
			assert.equal(response.status, 200);
			assert.match(response.headers.get("content-type"), /^text\/markdown\b/);
			assert.match(response.headers.get("vary") || "", /\bAccept\b/i);
			assert.match(response.headers.get("cache-control") || "", /no-store/i, "Negotiated Markdown must not enter shared caches");
			assert.match(body, /^# .*Celestia/m);
			assert.ok(body.length >= 500);
			assert.doesNotMatch(body, /<html|<script/i);
		}
		for (const accept of ["text/html", "*/*", "text/markdown;q=0", "text/html, text/markdown;q=0.5", "text/markdown;q=0, text/*;q=1"]) {
			const { response, body } = await get("/", { headers: { Accept: accept } });
			assert.match(response.headers.get("content-type"), /^text\/html\b/);
			assert.match(response.headers.get("vary") || "", /\bAccept\b/i);
			assert.match(body, /<h1\b/i);
		}
		const head = await get("/", { method: "HEAD", headers: { Accept: "text/markdown" } });
		assert.match(head.response.headers.get("content-type"), /^text\/markdown\b/);
		assert.equal(head.body, "");
		const rsc = await get("/", { headers: { RSC: "1", Accept: "text/markdown" } });
		assert.doesNotMatch(rsc.response.headers.get("content-type"), /^text\/markdown\b/);
	});

	await check("Homepage discovery Link headers", () => {
		const links = htmlResponse.headers.get("link") || "";
		assert.match(links, /<[^>]*\/sitemap\.xml>;\s*rel="sitemap"/);
		assert.match(links, /<[^>]*\/llms\.txt>;\s*rel="describedby"/);
		assert.match(links, /https:\/\/docs\.celestia\.org\//);
	});

	await check("LLM content guide", async () => {
		const { response, body } = await get("/llms.txt");
		assert.equal(response.status, 200);
		assert.match(body, /^# .*Celestia/m);
		assert.match(body, /https:\/\/docs\.celestia\.org\//);
		assert.match(body, /https:\/\/docs\.celestia\.org\/SKILL\.md/);
		assert.match(body, /exchanges|agentic payments/i);
		assert.doesNotMatch(body, /License: MIT/, "Do not claim a blanket license for site content");
	});

	const { body: robots } = await get("/robots.txt");
	console.log(`CONTENT_SIGNALS: ${/Content-Signal:.*search=yes.*ai-input=yes.*ai-train=yes/.test(robots) ? "pass" : "missing"}`);
	console.log(`CONTENT_READINESS: ${passed}`);
	console.log(`CHECKS: ${passed}/${total}`);
	if (!reportOnly && passed !== total) process.exitCode = 1;
}

main().catch((error) => {
	console.error(error.message);
	process.exitCode = 1;
});
