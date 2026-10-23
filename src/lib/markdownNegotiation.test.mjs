import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { load } from "../testLoad.mjs";

const require = createRequire(import.meta.url);
const { prefersMarkdown } = load("src/lib/markdownNegotiation.ts");
const { proxy, config } = load("src/proxy.ts");
const { NextRequest } = require("next/server");
const { unstable_doesMiddlewareMatch } = require("next/experimental/testing/server");

test("Markdown negotiation respects quality, specificity, and UTF-8 parameters", () => {
	for (const accept of [
		"text/markdown", "TEXT/MARKDOWN;Q=1", "text/html;q=0.5, text/markdown",
		"text/markdown;q=0.9, */*;q=0.5", "text/*;q=0.8, text/html;q=0.5",
		"text/markdown; charset=\"UTF-8\"", "text/markdown; charset=utf-8; q=0.8, text/html;q=0.5",
		"text/html; charset=utf-8; q=0, text/html, text/markdown;q=0.5",
		"application/json; profile=\"a,b;c\", text/markdown",
	]) assert.equal(prefersMarkdown(accept), true, accept);
	for (const accept of [
		null, "", "*/*", "text/*", "text/html", "application/json", "*/*;q=0",
		"text/markdown, text/html", "text/html, text/markdown", "text/markdown;q=0",
		"text/markdown;q=0, text/*;q=1", "text/markdown;q=0.5, */*;q=1",
		"text/html,application/xhtml+xml,image/avif,*/*;q=0.8",
		"text/markdown; charset=iso-8859-1", "text/markdown; variant=GFM",
		"text/markdown; charset=utf-8; q=0, text/markdown, text/html;q=0.5",
		"text/markdown; q=1.1", "text/markdown; q=-1", "text/markdown; q=NaN",
		"text/markdown; q=0.1234", "text/markdown; q=\"1\"", "text/markdown; q=1; q=0",
		"text/markdown; invalid", "application/json; profile=\"text/markdown,foo\"",
	]) assert.equal(prefersMarkdown(accept), false, String(accept));
});

test("homepage GET/HEAD serve Markdown while HTML and other methods pass through", async () => {
	for (const method of ["GET", "HEAD"]) {
		const request = new NextRequest("https://celestia.org/?campaign=test", { method, headers: { Accept: "text/markdown" } });
		const response = await proxy(request);
		assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
		assert.equal(await response.text(), method === "HEAD" ? "" : readFileSync("public/index.md", "utf8"));
		assert.equal(response.headers.get("cache-control"), "private, no-store");
		request.headers.set("accept", "text/html");
		assert.equal((await proxy(request)).headers.get("x-middleware-next"), "1");
	}
	for (const method of ["POST", "PUT", "DELETE", "OPTIONS"]) {
		const response = await proxy(new NextRequest("https://celestia.org/", { method, headers: { Accept: "text/markdown" } }));
		assert.equal(response.headers.get("x-middleware-next"), "1");
		assert.equal(response.headers.get("cache-control"), null);
	}
});

test("proxy only matches homepage document requests, excluding Next.js navigation before headers are stripped", () => {
	for (const url of ["/", "/?campaign=test"]) assert.equal(unstable_doesMiddlewareMatch({ config, url }), true, url);
	for (const url of ["/index.md", "/about/", "/api/health/", "/_next/static/test.js", "/images/test.png"]) {
		assert.equal(unstable_doesMiddlewareMatch({ config, url }), false, url);
	}
	for (const header of ["rsc", "next-router-state-tree", "next-router-prefetch", "next-router-segment-prefetch", "next-action"]) {
		assert.equal(unstable_doesMiddlewareMatch({ config, url: "/", headers: { accept: "text/markdown", [header]: "1" } }), false, header);
	}
});
