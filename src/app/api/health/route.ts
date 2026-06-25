import { NextResponse } from "next/server";

/**
 * Health check endpoint for Kubernetes liveness/readiness probes.
 *
 * Why this exists: probes previously hit static assets (/favicon.ico, then
 * /robots.txt). Static files are served straight from disk and stay "200 OK"
 * even if the Node runtime is wedged — a false healthy. This route is rendered
 * dynamically, so a 200 here confirms the Next.js server is actually accepting
 * and serving requests.
 *
 * It is intentionally lightweight: no env reads, no external calls, no DB
 * lookups — so it cannot time out or fail for the wrong reason. This is a
 * liveness signal, not a deep dependency check.
 *
 * NOTE FOR INFRA: this app sets `trailingSlash: true` (next.config.js), so the
 * canonical path is `/api/health/`. Hitting `/api/health` (no slash) returns a
 * 308 redirect to `/api/health/`. Point the K8s probe `path` at `/api/health/`
 * to get a clean, direct 200.
 */

// Always run through the runtime — never statically optimized or cached.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const HEALTH_HEADERS = {
	"Cache-Control": "no-store, no-cache, must-revalidate",
};

export async function GET() {
	return NextResponse.json({ status: "ok" }, { status: 200, headers: HEALTH_HEADERS });
}

// Some probe configurations issue HEAD requests — answer cheaply with no body.
export async function HEAD() {
	return new Response(null, { status: 200, headers: HEALTH_HEADERS });
}
