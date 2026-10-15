import { apiError } from "@/lib/apiError";

export function GET() {
	return apiError(404, "NOT_FOUND", "API endpoint not found", "See /openapi.json for supported endpoints and methods.");
}

export const POST = GET;
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;
export const OPTIONS = GET;
