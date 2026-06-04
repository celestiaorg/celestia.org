import { test } from "node:test";
import assert from "node:assert/strict";

import { sanitizeForLog } from "./sanitizeForLog.mjs";

test("strips newlines from a string so log entries cannot be forged", () => {
	const forged = "Alice\n[ERROR] forged admin login";
	assert.equal(sanitizeForLog(forged), "Alice [ERROR] forged admin login");
});

test("strips carriage returns and other control characters", () => {
	assert.equal(sanitizeForLog("a\r\nb\tc"), "a  b c");
});

test("sanitizes string values inside an object", () => {
	const formData = {
		fullName: "Bob\nInjected line",
		email: "bob@example.com",
	};
	assert.deepEqual(sanitizeForLog(formData), {
		fullName: "Bob Injected line",
		email: "bob@example.com",
	});
});

test("sanitizes nested objects and arrays", () => {
	const value = {
		outer: { inner: "x\ny" },
		list: ["ok", "bad\nvalue"],
	};
	assert.deepEqual(sanitizeForLog(value), {
		outer: { inner: "x y" },
		list: ["ok", "bad value"],
	});
});

test("leaves non-string primitives unchanged", () => {
	assert.equal(sanitizeForLog(42), 42);
	assert.equal(sanitizeForLog(true), true);
	assert.equal(sanitizeForLog(null), null);
	assert.equal(sanitizeForLog(undefined), undefined);
});
