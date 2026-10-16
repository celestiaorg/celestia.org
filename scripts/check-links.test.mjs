import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

for (const [name, exit, json, stderr, expected, report] of [
	["crawler crash preserves its diagnostics", 13, "", "unsettled top-level await", 1, /exit 13, 0 bytes/],
	["empty output cannot pass", 0, "", "", 1, /exit 0, 0 bytes/],
	["truncated output cannot pass", 0, '{"links":', "", 1, /Error parsing linkinator output/],
	["broken links still fail", 1, JSON.stringify({ links: [{ url: "https://example.test/missing", status: 404, state: "BROKEN" }] }), "", 1, /Broken Links Report/],
	["existing bot-protection policy still applies", 1, JSON.stringify({ links: [{ url: "https://docs.celestia.org/", status: 403, state: "BROKEN" }] }), "", 0, null],
	["healthy scan passes", 0, JSON.stringify({ links: [{ url: "https://example.test/", status: 200, state: "OK" }] }), "", 0, null],
]) {
	test(`link-check wrapper: ${name}`, () => {
		const directory = mkdtempSync(join(tmpdir(), "link-check-test-"));
		try {
			for (const path of ["bin", "scripts", "node_modules/.bin"]) mkdirSync(join(directory, path), { recursive: true });
			for (const file of ["check-links.sh", "parse-links.js"]) copyFileSync(resolve("scripts", file), join(directory, "scripts", file));
			const executable = (path, body) => writeFileSync(join(directory, path), `#!/bin/sh\n${body}\n`, { mode: 0o755 });
			// Avoid builds, network calls, port cleanup, and startup waits in this shell integration test.
			executable("bin/npm", 'if [ "$*" = "run start" ]; then exec /bin/sleep 60; fi');
			executable("bin/curl", 'printf "<urlset><loc>https://example.test/</loc></urlset>"');
			executable("bin/lsof", "exit 1");
			executable("bin/sleep", "exit 0");
			executable("node_modules/.bin/linkinator", 'printf "%s" "$TEST_JSON"; printf "%s" "$TEST_STDERR" >&2; exit "$TEST_EXIT"');
			const result = spawnSync("bash", ["scripts/check-links.sh"], {
				cwd: directory,
				encoding: "utf8",
				timeout: 5000,
				env: { ...process.env, PATH: `${join(directory, "bin")}:${process.env.PATH}`, TEST_EXIT: String(exit), TEST_JSON: json, TEST_STDERR: stderr },
			});
			assert.equal(result.status, expected, result.stderr);
			if (stderr) assert.ok(result.stderr.includes(stderr));
			if (report) assert.match(readFileSync(join(directory, "broken-links.txt"), "utf8"), report);
		} finally {
			rmSync(directory, { recursive: true, force: true });
		}
	});
}

// An early timer must schedule another wakeup, not let Node exit with an unsettled await.
test("linkinator completes delayed retries when a timer fires early", () => {
	const result = spawnSync(process.execPath, ["--input-type=module", "-e", `
		import { Queue } from "./node_modules/linkinator/build/src/queue.js";
		const setTimeout = globalThis.setTimeout;
		globalThis.setTimeout = (callback, delay) => setTimeout(callback, Math.max(0, delay - 5));
		const queue = new Queue({ concurrency: 5 });
		queue.add(async () => {}, { delay: 20 });
		await queue.onIdle();
		console.log("completed");
	`], { encoding: "utf8", timeout: 5000 });
	assert.equal(result.status, 0, result.stderr);
	assert.equal(result.stdout.trim(), "completed");
});
