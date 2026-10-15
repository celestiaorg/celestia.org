import { NextRequest, NextResponse } from "next/server";
import homepageMarkdown from "@/data/home/markdown";

export function proxy(request: NextRequest) {
	const headers = {
		Vary: "Accept, RSC",
		// shortcut: Next.js 16.3 overwrites HTML Vary; keep both formats uncached until it preserves Accept.
		"Cache-Control": "private, no-store",
	};

	// Non-read requests must keep Next.js routing semantics.
	if (["GET", "HEAD"].includes(request.method)) {
		const mediaTypes = (request.headers.get("accept") || "*/*").split(",").map((entry) => {
			const [type, ...parameters] = entry.toLowerCase().split(";").map((part) => part.trim());
			const qualityParameter = parameters.find((part) => part.startsWith("q="));
			const quality = qualityParameter ? Number(qualityParameter.slice(2)) : 1;
			return {
				type,
				parameters: parameters.filter((part) => part && !part.startsWith("q=")),
				quality: Number.isFinite(quality) && quality >= 0 && quality <= 1 ? quality : 0,
			};
		})
			// Both representations use UTF-8 and have no other media parameters.
			.filter(({ parameters }) => parameters.every((part) => /^charset=(?:utf-8|"utf-8")$/.test(part)))
			// Parameter-specific ranges override generic ones, including when q=0.
			.sort((a, b) => b.parameters.length - a.parameters.length || b.quality - a.quality);
		const qualityFor = (mediaType: string) => [mediaType, "text/*", "*/*"]
			.map((type) => mediaTypes.find((entry) => entry.type === type))
			.find(Boolean)?.quality || 0;
		const markdown = qualityFor("text/markdown");
		const html = qualityFor("text/html");

		if (markdown > html || (markdown > 0 && markdown === html && mediaTypes.some(({ type }) => type === "text/markdown"))) {
			return new NextResponse(request.method === "HEAD" ? null : homepageMarkdown, {
				headers: {
					...headers,
					"Content-Type": "text/markdown; charset=utf-8",
				},
			});
		}
		if (html === 0) {
			return new NextResponse(request.method === "HEAD" ? null : JSON.stringify({
				error: "No acceptable representation", code: "NOT_ACCEPTABLE",
				hint: "Request text/html or text/markdown in the Accept header.",
			}), { status: 406, headers: { ...headers, "Content-Type": "application/json" } });
		}
	}

	return NextResponse.next({ headers });
}

export const config = {
	// Next.js strips RSC headers inside Proxy; exclude them before it runs.
	matcher: [{ source: "/", missing: [{ type: "header", key: "rsc", value: "1" }] }],
};
