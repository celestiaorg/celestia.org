import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import ts from "typescript";

const require = createRequire(import.meta.url);

// Use the installed TypeScript compiler so Node's test runner can exercise TS modules and `@/` aliases.
export function load(file) {
	const exports = {};
	const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
		compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
	});
	new Function("require", "exports", outputText)((id) => {
		if (!id.startsWith("@/")) return require(id);
		const target = resolve("src", id.slice(2));
		return existsSync(`${target}.ts`) ? load(`${target}.ts`) : require(`${target}.mjs`);
	}, exports);
	return exports;
}
