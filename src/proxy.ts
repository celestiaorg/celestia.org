import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import { prefersMarkdown } from "@/lib/markdownNegotiation";

export async function proxy(request: NextRequest) {
	if (!["GET", "HEAD"].includes(request.method) || !prefersMarkdown(request.headers.get("accept"))) {
		return NextResponse.next();
	}
	// A static-file rewrite can lose these headers; return the existing file directly.
	const markdown = await readFile(join(process.cwd(), "public/index.md"), "utf8");
	return new NextResponse(request.method === "HEAD" ? null : markdown, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			"Vary": "Accept",
			"Cache-Control": "private, no-store",
		},
	});
}

export const config = {
	matcher: [{
		source: "/",
		// Next.js strips Flight headers before invoking proxy; exclude them in the matcher.
		missing: [
			{ type: "header", key: "rsc" },
			{ type: "header", key: "next-router-state-tree" },
			{ type: "header", key: "next-router-prefetch" },
			{ type: "header", key: "next-router-segment-prefetch" },
			{ type: "header", key: "next-action" },
		],
	}],
};
