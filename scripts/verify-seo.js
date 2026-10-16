#!/usr/bin/env node

// Check a running production build: npm run verify-seo -- http://localhost:3100
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const baseUrl = process.argv[2] || "http://localhost:3000";
const reportOnly = process.argv.includes("--report");
let passed = 0;
let total = 0;

function matchesUrl(href, origin, pathname) {
	const url = new URL(href);
	return url.origin === origin && url.pathname === pathname
		&& !url.search && !url.hash && !url.username && !url.password;
}

assert.equal(matchesUrl("https://docs.celestia.org/", "https://docs.celestia.org", "/"), true);
for (const href of [
	"https://docs.celestia.org.evil.test/",
	"https://evil.test/https://docs.celestia.org/",
	"https://evil.test/?next=https://docs.celestia.org/",
	"https://docs.celestia.org@evil.test/",
]) assert.equal(matchesUrl(href, "https://docs.celestia.org", "/"), false);

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

	await check("Trust pages preserve existing content", async () => {
		for (const path of ["/about/", "/contact/", "/privacy/"]) {
			const { response, body } = await get(path);
			assert.equal(response.status, 200, path);
			if (path === "/contact/") {
				assert.ok(mainText(body).includes("You own the infrastructure and the economics."), "Missing existing contact introduction");
			} else {
				assert.ok(mainText(body).length >= 500, `${path}: fewer than 500 characters in main content`);
			}
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
		assert.match(html, /<title>Fibre Optic Performance for Millisecond Markets \| Celestia<\/title>/);
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
		assert.equal(graphs.find((item) => item["@type"] === "WebSite").publisher["@id"], "https://celestia.org/#organization");
	});

	await check("Static homepage Markdown", async () => {
		for (const method of ["GET", "HEAD"]) {
			const { response, body } = await get("/index.md", { method });
			assert.equal(response.status, 200);
			assert.match(response.headers.get("content-type"), /^text\/markdown\b/);
			assert.doesNotMatch(response.headers.get("cache-control") || "", /private|no-store/i);
			if (method === "HEAD") assert.equal(body, "");
			else {
				assert.equal(body, fs.readFileSync("public/index.md", "utf8"));
				assert.match(body, /^# Celestia/m);
				assert.ok(body.length >= 500);
				assert.doesNotMatch(body, /<html|<script/i);
			}
		}
	});

	await check("Homepage HTML caching and Markdown discovery", async () => {
		for (const accept of ["text/html", "text/markdown", "application/json", "*/*;q=0"]) {
			for (const method of ["GET", "HEAD"]) {
				const { response, body } = await get("/", { method, headers: { Accept: accept } });
				assert.equal(response.status, 200);
				assert.match(response.headers.get("content-type"), /^text\/html\b/);
				assert.doesNotMatch(response.headers.get("cache-control") || "", /private|no-store/i);
				if (method === "HEAD") assert.equal(body, "");
				else assert.match(body, /<h1\b/i);
				const links = response.headers.get("link") || "";
				assert.ok(links.includes('</index.md>; rel="alternate"; type="text/markdown"'));
				assert.match(links, /<[^>]*\/sitemap\.xml>;\s*rel="sitemap"/);
				assert.match(links, /<[^>]*\/llms\.txt>;\s*rel="describedby"/);
				assert.ok(links.includes('<https://docs.celestia.org/>; rel="service-doc"'), "Missing canonical developer docs Link");
				assert.ok(links.includes('</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"'));
				assert.ok(links.includes('</openapi.json>; rel="service-desc"'));
				assert.ok(links.includes('</api-docs.md>; rel="service-doc"'));
			}
		}
		const rsc = await get("/", { headers: { RSC: "1", Accept: "text/markdown" } });
		assert.equal(rsc.response.status, 200);
		assert.match(rsc.response.headers.get("content-type"), /^text\/x-component\b/);
	});

	await check("LLM content guide", async () => {
		const { response, body } = await get("/llms.txt");
		assert.equal(response.status, 200);
		assert.match(body, /^# .*Celestia/m);
		const links = [...body.matchAll(/\]\((https:\/\/[^\s)]+)\)/g)].map((match) => match[1]);
		for (const path of ["/", "/SKILL.md", "/build/rpc/clients/"]) {
			assert.ok(links.some((href) => matchesUrl(href, "https://docs.celestia.org", path)), `Missing developer resource: ${path}`);
		}
		for (const path of ["/index.md", "/.well-known/api-catalog", "/openapi.json", "/api-docs.md", "/developers/"]) {
			assert.ok(links.some((href) => matchesUrl(href, "https://celestia.org", path)), `Missing website resource: ${path}`);
		}
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

	await check("API catalog matches the published website API", async () => {
		const spec = JSON.parse((await get("/openapi.json")).body);
		const origin = spec.servers[0].url;
		const endpoints = Object.keys(spec.paths).map((path) => `${origin}${path}`).sort();
		for (const method of ["GET", "HEAD"]) {
			const { response, body } = await get("/.well-known/api-catalog", {
				method, headers: { Accept: "application/linkset+json" },
			});
			assert.equal(response.status, 200);
			assert.equal(response.headers.get("content-type"), 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"');
			assert.ok((response.headers.get("link") || "").includes('</.well-known/api-catalog>; rel="api-catalog"'));
			if (method === "HEAD") { assert.equal(body, ""); continue; }
			const { linkset } = JSON.parse(body);
			assert.equal(linkset.length, endpoints.length + 1);
			const catalog = linkset.find((entry) => entry.anchor === `${origin}/.well-known/api-catalog`);
			assert.deepEqual(catalog.item.map((item) => item.href).sort(), endpoints);
			for (const endpoint of endpoints) {
				const entry = linkset.find((entry) => entry.anchor === endpoint);
				assert.deepEqual(entry["service-desc"], [{ href: `${origin}/openapi.json`, type: "application/vnd.oai.openapi+json" }]);
				assert.deepEqual(entry["service-doc"], [{ href: `${origin}/api-docs.md`, type: "text/markdown" }]);
			}
		}
		const missing = await get("/.well-known/missing-catalog");
		assert.equal(missing.response.status, 404);
		assert.doesNotMatch(missing.response.headers.get("content-type") || "", /application\/linkset\+json/);
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
