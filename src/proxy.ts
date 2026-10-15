import { NextRequest, NextResponse } from "next/server";
import homepageMarkdown from "@/data/home/markdown";

export function proxy(request: NextRequest) {
	const headers = { Vary: "Accept, RSC" };

	// Non-read requests must keep Next.js routing semantics.
	if (["GET", "HEAD"].includes(request.method)) {
		const mediaTypes = (request.headers.get("accept") || "").split(",").map((entry) => {
			const [type, ...parameters] = entry.toLowerCase().split(";").map((part) => part.trim());
			const qualityParameter = parameters.find((part) => part.startsWith("q="));
			const quality = qualityParameter ? Number(qualityParameter.slice(2)) : 1;
			return { type, quality: Number.isFinite(quality) && quality >= 0 && quality <= 1 ? quality : 0 };
		});
		const markdown = mediaTypes.find(({ type }) => type === "text/markdown")?.quality || 0;
		const html = ["text/html", "text/*", "*/*"]
			.map((type) => mediaTypes.find((entry) => entry.type === type))
			.find(Boolean)?.quality || 0;

		if (markdown > 0 && markdown >= html) {
			return new NextResponse(request.method === "HEAD" ? null : homepageMarkdown, {
				headers: {
					...headers,
					"Content-Type": "text/markdown; charset=utf-8",
					// Prevent a CDN from caching Markdown at the HTML homepage URL.
					"Cache-Control": "private, no-store",
				},
			});
		}
	}

	return NextResponse.next({ headers });
}

export const config = {
	// Next.js strips RSC headers inside Proxy; exclude them before it runs.
	matcher: [{ source: "/", missing: [{ type: "header", key: "rsc", value: "1" }] }],
};
