/**
 * Sanitize a value for safe logging.
 *
 * Replaces CR, LF, and other ASCII control characters with a single space so
 * that user-provided input cannot forge or inject extra log entries (log
 * injection). Strings are sanitized directly; objects and arrays are sanitized
 * recursively. Non-string primitives are returned unchanged.
 */

function isControlCharCode(code) {
	// C0 control characters (includes tab, newline, carriage return) and DEL.
	return code < 32 || code === 127;
}

export function sanitizeForLog(value) {
	if (typeof value === "string") {
		return Array.from(value, (char) => (isControlCharCode(char.charCodeAt(0)) ? " " : char)).join("");
	}

	if (Array.isArray(value)) {
		return value.map(sanitizeForLog);
	}

	if (value !== null && typeof value === "object") {
		return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, sanitizeForLog(val)]));
	}

	return value;
}
