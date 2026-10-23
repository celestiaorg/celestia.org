export function prefersMarkdown(accept: string | null): boolean {
	const ranges = (accept || "").split(",").map((range) => {
		const [type, ...parameters] = range.trim().toLowerCase().split(";").map((part) => part.trim());
		const q = parameters.find((parameter) => parameter.startsWith("q="))?.slice(2);
		return { type, q: q === undefined ? 1 : Number(q) || 0 };
	});
	// Most specific matching range wins; the highest q among equally specific ranges.
	const quality = (media: string) => {
		for (const pattern of [media, "text/*", "*/*"]) {
			const matches = ranges.filter((range) => range.type === pattern);
			if (matches.length) return Math.max(...matches.map((range) => range.q));
		}
		return 0;
	};
	// HTML remains the default for ties, missing Accept, and unsupported formats.
	return quality("text/markdown") > quality("text/html");
}
