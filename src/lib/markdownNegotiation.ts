type Media = "text/html" | "text/markdown";

export function prefersMarkdown(accept: string | null): boolean {
	// Keep quoted parameter values intact when splitting HTTP lists.
	const ranges = (accept?.match(/(?:[^,"]|"(?:\\.|[^"\\])*")+/g) || []).flatMap((part) => {
		const [type, ...parameters] = (part.match(/(?:[^;"]|"(?:\\.|[^"\\])*")+/g) || [])
			.map((value) => value.trim());
		let q = 1;
		let charset = false;
		let weighted = false;
		for (const parameter of parameters) {
			const match = parameter.match(/^([^=\s]+)\s*=\s*(?:"((?:\\.|[^"\\])*)"|([^"\s]+))$/);
			if (!match) return [];
			const name = match[1].toLowerCase();
			const value = (match[2] ?? match[3]).replace(/\\(.)/g, "$1").toLowerCase();
			if (name === "q") {
				if (weighted || match[2] !== undefined || !/^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(value)) return [];
				q = Number(value);
				weighted = true;
			} else if (name === "charset" && value === "utf-8" && !charset) {
				charset = true;
			} else {
				// Neither representation offers other media parameters (e.g. a Markdown variant).
				return [];
			}
		}
		return [{ type: type?.toLowerCase(), q, charset }];
	});
	const quality = (media: Media) => {
		let specificity = -1;
		let result = 0;
		for (const range of ranges) {
			const rank = range.type === media ? 2 : range.type === "text/*" ? 1 : range.type === "*/*" ? 0 : -1;
			if (rank < 0) continue;
			const score = rank * 2 + Number(range.charset);
			if (score > specificity) {
				specificity = score;
				result = range.q;
			} else if (score === specificity) {
				result = Math.max(result, range.q);
			}
		}
		return result;
	};
	// HTML remains the default for ties, missing Accept, and unsupported formats.
	return quality("text/markdown") > quality("text/html");
}
