import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import ts from "typescript";

const require = createRequire(import.meta.url);

// Use the installed TypeScript compiler so Node's test runner can exercise route handlers and aliases.
function load(file) {
	const exports = {};
	const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
		compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
	});
	new Function("require", "exports", outputText)((id) => {
		if (!id.startsWith("@/")) return require(id);
		const target = resolve("src", id.slice(2));
		return existsSync(`${target}.ts`) ? load(`${target}.ts`) : require(`${target}.mjs`);
	}, exports);
	return exports;
}

function request(body) {
	return new Request("http://localhost/api/", {
		method: "POST", headers: { "Content-Type": "application/json" }, body,
	});
}

function configure(t) {
	for (const key of ["MAILCHIMP_API_KEY", "MAILCHIMP_LIST_ID", "MAILCHIMP_SERVER_PREFIX", "RECAPTCHA_SECRET_KEY", "GOOGLE_APPS_SCRIPT_URL"]) {
		const previous = process.env[key];
		process.env[key] = key === "GOOGLE_APPS_SCRIPT_URL" ? "https://example.test/contact" : "test";
		t.after(() => { if (previous === undefined) delete process.env[key]; else process.env[key] = previous; });
	}
}

test("API discovery probes return JSON errors with codes and hints", async () => {
	for (const [route, methods, status, code] of [
		["[[...path]]", ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 404, "NOT_FOUND"],
		["health", ["POST", "PUT", "PATCH", "DELETE"], 405, "METHOD_NOT_ALLOWED"],
		["contact", ["GET", "PUT", "PATCH", "DELETE"], 405, "METHOD_NOT_ALLOWED"],
		["subscribe", ["GET", "PUT", "PATCH", "DELETE"], 405, "METHOD_NOT_ALLOWED"],
	]) {
		const handlers = load(`src/app/api/${route}/route.ts`);
		for (const method of methods) {
			const response = await handlers[method]();
			assert.equal(response.status, status, `${method} ${route}`);
			assert.match(response.headers.get("content-type"), /^application\/json\b/);
			assert.equal(response.headers.get("cache-control"), "no-store");
			const data = await response.json();
			assert.equal(data.code, code);
			assert.ok(data.error && data.hint);
			if (status === 405) assert.ok(response.headers.get("allow"));
		}
	}
});

for (const route of ["contact", "subscribe"]) {
	test(`${route}: invalid JSON and field types return actionable 400 errors without external calls`, async (t) => {
		configure(t);
		const fetch = t.mock.method(globalThis, "fetch", () => { throw new Error("Unexpected external request"); });
		const { POST } = load(`src/app/api/${route}/route.ts`);
		for (const body of ["{", "null", "[]", "42", '{"fullName":42}', '{"email":{},"token":[]}']) {
			const response = await POST(request(body));
			assert.equal(response.status, 400, body);
			const data = await response.json();
			assert.equal(typeof data.error, "string");
			assert.ok(data.code);
			assert.ok(data.hint);
		}
		assert.equal(fetch.mock.callCount(), 0);
	});
}

test("subscribe: upstream errors are read once and rate-limit guidance is preserved", async (t) => {
	configure(t);
	let upstream;
	t.mock.method(globalThis, "fetch", async (url) => String(url).includes("siteverify")
		? Response.json({ success: true }) : upstream);
	const { POST } = load("src/app/api/subscribe/route.ts");
	for (const [status, data, code] of [
		[400, { title: "Member Exists" }, "ALREADY_SUBSCRIBED"],
		[400, { detail: "Invalid list member" }, "SUBSCRIPTION_FAILED"],
		[429, {}, "RATE_LIMITED"],
	]) {
		upstream = Response.json(data, { status, headers: { "Retry-After": "120" } });
		const response = await POST(request(JSON.stringify({ email: "test@example.com", token: "test" })));
		assert.equal(response.status, status);
		assert.equal((await response.json()).code, code);
		if (status === 429) assert.equal(response.headers.get("retry-after"), "120");
	}
});

test("subscribe: success, CAPTCHA, provider failure, timeout, and missing configuration", async (t) => {
	configure(t);
	t.mock.method(console, "error", () => {});
	let human = true;
	let upstream = Response.json({ id: "subscriber" });
	let failure;
	t.mock.method(globalThis, "fetch", async (url) => {
		if (String(url).includes("siteverify")) return Response.json({ success: human });
		if (failure) throw failure;
		return upstream;
	});
	const { POST } = load("src/app/api/subscribe/route.ts");
	const submit = () => POST(request(JSON.stringify({ email: "test@example.com", token: "test" })));
	assert.deepEqual(await (await submit()).json(), { success: true });
	human = false;
	assert.equal((await (await submit()).json()).code, "INVALID_RECAPTCHA");
	human = true;
	upstream = new Response("<html>Provider unavailable</html>", { status: 502 });
	assert.equal((await submit()).status, 500, "Provider JSON failures must not be blamed on the caller");
	upstream = new Response(null, { status: 429 });
	assert.equal((await submit()).headers.get("retry-after"), "60");
	failure = new DOMException("Timed out", "TimeoutError");
	assert.equal((await (await submit()).json()).code, "REQUEST_TIMEOUT");
	delete process.env.MAILCHIMP_API_KEY;
	assert.equal((await (await submit()).json()).code, "SERVICE_UNAVAILABLE");
});

test("contact: delivery success, missing configuration fallback, and provider failure", async (t) => {
	configure(t);
	t.mock.method(console, "error", () => {});
	t.mock.method(console, "log", () => {});
	let upstream = new Response("OK");
	t.mock.method(globalThis, "fetch", async () => upstream);
	const { POST } = load("src/app/api/contact/route.ts");
	const submit = () => POST(request(JSON.stringify({ fullName: "Test", companyName: "Test", email: "test@example.com", interestedIn: "Test" })));
	assert.equal((await (await submit()).json()).success, true);
	upstream = new Response("Unavailable", { status: 503 });
	assert.equal((await (await submit()).json()).code, "CONTACT_FAILED");
	delete process.env.GOOGLE_APPS_SCRIPT_URL;
	const fallback = await (await submit()).json();
	assert.equal(fallback.success, true);
	assert.match(fallback.message, /not configured/);
});
