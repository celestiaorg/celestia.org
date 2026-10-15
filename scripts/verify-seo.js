#!/usr/bin/env node

// Check a running production build: npm run verify-seo -- http://localhost:3100
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const baseUrl = process.argv[2] || "http://localhost:3000";
const reportOnly = process.argv.includes("--report");
let passed = 0;
let total = 0;

function hasVaryAccept(value) {
	return value.split(",").some((token) => token.trim().toLowerCase() === "accept");
}

assert.equal(hasVaryAccept("RSC, Accept-Encoding"), false);
assert.equal(hasVaryAccept("RSC, aCcEpT, Accept-Encoding"), true);

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

function mainText(html) {
	const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
	assert.ok(main, "Page must have a main element");
	return main[1].replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
		.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function main() {
	const { response: htmlResponse, body: html } = await get("/", { headers: { Accept: "text/html" } });
	assert.equal(htmlResponse.status, 200, "Homepage must be reachable");

	await check("Raw homepage content", () => {
		assert.match(html, /<h1\b/i);
		const text = mainText(html);
		assert.ok(text.length >= 500, `Only ${text.length} characters of raw content`);
		assert.match(text, /Celestia/);
	});

	await check("Trust pages contain meaningful content", async () => {
		for (const path of ["/about/", "/contact/", "/privacy/"]) {
			const { response, body } = await get(path);
			assert.equal(response.status, 200, path);
			assert.ok(mainText(body).length >= 500, `${path}: fewer than 500 characters in main content`);
			assert.match(body, /<h1\b/i);
		}
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
		assert.match(html, /<title>Modular Blockchain and Data Availability \| Celestia<\/title>/);
		assert.match(html, /<html[^>]+lang=["']en["']/);
		assert.match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/celestia\.org\/["']/);
		assert.match(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']https:\/\//);
		assert.match(html, /<meta[^>]+property=["']og:type["'][^>]+content=["']website["']/);
	});

	await check("Organization and website JSON-LD", () => {
		const graphs = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)]
			.flatMap((match) => { const data = JSON.parse(match[1]); return data["@graph"] || [data]; });
		for (const type of ["Organization", "WebSite"]) {
			const entity = graphs.find((item) => item["@type"] === type && item.name === "Celestia");
			assert.ok(entity, `Missing ${type}`);
			assert.equal(entity.name, "Celestia");
			assert.equal(new URL(entity.url).hostname, "celestia.org");
			assert.ok(entity.description);
		}
		const operator = graphs.find((item) => item["@id"] === "https://celestia.org/#website-operator");
		assert.equal(operator.name, "Strange Loop Labs AG");
		assert.equal(operator.contactPoint.email, "privacy@celestia.org");
		assert.equal(operator.contactPoint.contactType, "privacy inquiries");
		assert.equal(operator.address["@type"], "PostalAddress");
		assert.equal(operator.address.streetAddress, "Pradafant 11");
		assert.equal(operator.address.addressCountry, "LI");
		assert.equal(graphs.find((item) => item["@type"] === "WebSite").publisher["@id"], operator["@id"]);
	});

	await check("Homepage Markdown negotiation", async () => {
		for (const accept of ["text/markdown", "text/markdown; charset=utf-8", "text/html;q=0.5, text/markdown;q=0.9"]) {
			const { response, body } = await get("/", { headers: { Accept: accept } });
			assert.equal(response.status, 200);
			assert.match(response.headers.get("content-type"), /^text\/markdown\b/);
			assert.ok(hasVaryAccept(response.headers.get("vary") || ""), "Vary must contain the exact Accept token");
			assert.match(response.headers.get("cache-control") || "", /no-store/i, "Negotiated Markdown must not enter shared caches");
			assert.match(body, /^# .*Celestia/m);
			assert.ok(body.length >= 500);
			assert.doesNotMatch(body, /<html|<script/i);
		}
		for (const accept of ["text/html", "*/*", "text/*", "text/html, text/markdown;q=0.5", "text/markdown;q=0, text/*;q=1"]) {
			const { response, body } = await get("/", { headers: { Accept: accept } });
			assert.match(response.headers.get("content-type"), /^text\/html\b/);
			// Next.js overwrites HTML Vary, so HTML must stay out of caches too.
			assert.match(response.headers.get("cache-control") || "", /(?:^|,)\s*no-store\s*(?:,|$)/i, "Negotiated HTML must not enter caches");
			assert.match(body, /<h1\b/i);
		}
		for (const accept of ["application/json", "text/markdown;q=0", "text/html;q=0, text/markdown;q=0", "*/*;q=0"]) {
			for (const method of ["GET", "HEAD"]) {
				const { response, body } = await get("/", { method, headers: { Accept: accept } });
				assert.equal(response.status, 406, accept);
				assert.ok(hasVaryAccept(response.headers.get("vary") || ""));
				if (method === "HEAD") assert.equal(body, "");
				else assert.equal(JSON.parse(body).code, "NOT_ACCEPTABLE");
			}
		}
		const wildcard = await get("/", { headers: { Accept: "text/html;q=0, text/*;q=1" } });
		assert.match(wildcard.response.headers.get("content-type"), /^text\/markdown\b/);
		for (const accept of ["text/html", "text/markdown"]) {
			const { response, body } = await get("/", { method: "HEAD", headers: { Accept: accept } });
			assert.equal(response.status, 200);
			assert.equal(response.headers.get("content-type").split(";")[0], accept);
			assert.match(response.headers.get("cache-control") || "", /(?:^|,)\s*no-store\s*(?:,|$)/i, "HEAD must use the same cache policy as GET");
			if (accept === "text/markdown") assert.ok(hasVaryAccept(response.headers.get("vary") || ""));
			assert.equal(body, "");
		}
		for (const [ranges, expected] of [
			[["text/markdown;q=0.9", "text/markdown;charset=utf-8;q=0", "text/html;q=0.5"], "text/html"],
			[["text/markdown;q=0.9", "text/markdown;charset=utf-8;q=0.2", "text/html;q=0.5"], "text/html"],
			[["text/markdown;q=0", 'text/markdown;charset="UTF-8";q=0.9', "text/html;q=0.5"], "text/markdown"],
			[["text/html;q=0.9", "text/html;charset=utf-8;q=0", "text/markdown;q=0.5"], "text/markdown"],
			[["text/markdown;charset=iso-8859-1", "text/html;q=0.5"], "text/html"],
			[["text/markdown;variant=GFM", "text/html;q=0.5"], "text/html"],
		]) {
			for (const accept of [ranges.join(", "), [...ranges].reverse().join(", ")]) {
				for (const method of ["GET", "HEAD"]) {
					const { response, body } = await get("/", { method, headers: { Accept: accept } });
					assert.equal(response.status, 200);
					assert.equal(response.headers.get("content-type").split(";")[0], expected, `${method} Accept: ${accept}`);
					if (method === "HEAD") assert.equal(body, "");
				}
			}
		}
		const rsc = await get("/", { headers: { RSC: "1", Accept: "text/markdown" } });
		assert.doesNotMatch(rsc.response.headers.get("content-type"), /^text\/markdown\b/);
	});

	await check("Homepage discovery Link headers", () => {
		const links = htmlResponse.headers.get("link") || "";
		assert.match(links, /<[^>]*\/sitemap\.xml>;\s*rel="sitemap"/);
		assert.match(links, /<[^>]*\/llms\.txt>;\s*rel="describedby"/);
		assert.ok(links.includes('<https://docs.celestia.org/>; rel="service-doc"'), "Missing canonical developer docs Link");
		assert.ok(links.includes('</openapi.json>; rel="service-desc"'));
		assert.ok(links.includes('</api-docs.md>; rel="service-doc"'));
	});

	await check("LLM content guide", async () => {
		const { response, body } = await get("/llms.txt");
		assert.equal(response.status, 200);
		assert.match(body, /^# .*Celestia/m);
		assert.ok(body.includes("](https://docs.celestia.org/)"), "Missing canonical developer docs link");
		assert.ok(body.includes("](https://docs.celestia.org/SKILL.md)"), "Missing canonical agent skill link");
		assert.match(body, /exchanges|agentic payments/i);
		for (const path of ["/openapi.json", "/api-docs.md", "/developers/"]) assert.ok(body.includes(`https://celestia.org${path}`));
		assert.ok(body.includes("https://docs.celestia.org/build/rpc/clients/"));
		assert.doesNotMatch(body, /License: MIT/, "Do not claim a blanket license for site content");
	});

	await check("Developer documentation redirects", async () => {
		for (const path of ["/developers/", "/docs/"]) {
			const { response } = await get(path, { redirect: "manual" });
			assert.equal(response.status, 308);
			assert.equal(response.headers.get("location"), "https://docs.celestia.org/");
		}
	});

	await check("OpenAPI and website API documentation", async () => {
		const { response, body } = await get("/openapi.json");
		assert.equal(response.status, 200);
		assert.match(response.headers.get("content-type"), /json/);
		const spec = JSON.parse(body);
		assert.equal(spec.openapi, "3.1.1");
		assert.equal(spec.servers[0].url, "https://celestia.org");
		const operations = Object.values(spec.paths).flatMap((path) => Object.values(path));
		assert.equal(new Set(operations.map((op) => op.operationId)).size, operations.length);
		for (const op of operations) {
			assert.ok(op.operationId && op.description && op.responses["200"]);
		}
		for (const match of body.matchAll(/"\$ref":\s*"#\/([^" ]+)"/g)) {
			assert.ok(match[1].split("/").reduce((value, key) => value?.[key], spec), `Unresolved reference: ${match[1]}`);
		}
		const docs = await get("/api-docs.md");
		assert.equal(docs.response.status, 200);
		assert.match(docs.body, /^# Celestia Website API/);
		assert.match(docs.body, /Retry-After/);
		const legacyGuide = await get("/llm.txt");
		assert.equal(legacyGuide.response.status, 200);
	});

	await check("API health and JSON errors", async () => {
		const health = await get("/api/health/");
		assert.equal(health.response.status, 200);
		assert.deepEqual(JSON.parse(health.body), { status: "ok" });
		const head = await get("/api/health/", { method: "HEAD" });
		assert.equal(head.response.status, 200);
		assert.equal(head.body, "");
		for (const [route, allow] of [["health", "GET, HEAD, OPTIONS"], ["contact", "POST, OPTIONS"], ["subscribe", "POST, OPTIONS"]]) {
			const options = await get(`/api/${route}/`, { method: "OPTIONS" });
			assert.equal(options.response.status, 204);
			assert.equal(options.response.headers.get("allow"), allow);
		}
		for (const [path, method, status, code, body] of [
			["/api/", "GET", 404, "NOT_FOUND"],
			["/api/not-an-endpoint/", "GET", 404, "NOT_FOUND"],
			["/api/health/", "POST", 405, "METHOD_NOT_ALLOWED"],
			["/api/contact/", "GET", 405, "METHOD_NOT_ALLOWED"],
			["/api/subscribe/", "GET", 405, "METHOD_NOT_ALLOWED"],
			["/api/contact/", "POST", 400, "INVALID_JSON", "{"],
			["/api/subscribe/", "POST", 400, "INVALID_JSON", "null"],
			["/api/contact/", "POST", 400, "INVALID_INPUT", "{}"],
			["/api/subscribe/", "POST", 400, "INVALID_INPUT", "{}"],
		]) {
			const result = await get(path, { method, body, headers: { "Content-Type": "application/json" } });
			assert.equal(result.response.status, status, `${method} ${path}`);
			assert.match(result.response.headers.get("content-type"), /application\/json/);
			const data = JSON.parse(result.body);
			assert.equal(data.code, code);
			assert.ok(data.error && data.hint);
			if (status === 405) assert.ok(result.response.headers.get("allow"));
		}
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
