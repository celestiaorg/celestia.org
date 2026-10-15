import { NextResponse } from "next/server";

// Keep `error` as a string for existing form clients; add machine-readable guidance.
export function apiError(status: number, code: string, error: string, hint: string, headers: Record<string, string> = {}) {
	return NextResponse.json({ error, code, hint }, {
		status, headers: { "Cache-Control": "no-store", ...headers },
	});
}

export class InvalidJsonError extends Error {}

export async function readJsonObject(request: Request): Promise<Record<string, unknown>> {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		throw new InvalidJsonError("Invalid JSON");
	}
	if (!body || typeof body !== "object" || Array.isArray(body)) {
		throw new InvalidJsonError("Expected a JSON object");
	}
	return body as Record<string, unknown>;
}

export function methodNotAllowed(allow: string) {
	return apiError(405, "METHOD_NOT_ALLOWED", "Method not allowed", `Use ${allow}. See /openapi.json.`, { Allow: allow });
}
