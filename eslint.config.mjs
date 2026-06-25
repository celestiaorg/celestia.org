import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// Flat config equivalent of the previous `.eslintrc.json`
// (`{ "extends": "next/core-web-vitals" }`). `next lint` was removed in
// Next.js 16, so linting now runs via the ESLint CLI (`eslint .`).
//
// The TypeScript ruleset (`eslint-config-next/typescript`) is intentionally
// NOT included yet: the JS→TS migration is in progress and type errors are
// still gated by `npm run typecheck`, not lint. Add it once the codebase is
// fully TypeScript. See MIGRATION-PLAN.md.
const eslintConfig = defineConfig([
	...nextVitals,
	{
		// eslint-plugin-react-hooks@7 (pulled in by eslint-config-next@16) ships
		// the React Compiler-era rules as ERRORS. They did not error under the
		// Next 15 config, so to keep this migration behavior-equivalent — and to
		// keep the pre-push gate (which fails on lint errors) green — they are
		// demoted to warnings. They stay visible; address them incrementally,
		// then promote back to error. See MIGRATION-PLAN.md.
		rules: {
			"react-hooks/set-state-in-effect": "warn",
			"react-hooks/refs": "warn",
			"react-hooks/static-components": "warn",
			"react-hooks/purity": "warn",
			"react-hooks/immutability": "warn",
		},
	},
	// Restore the default ignores that eslint-config-next no longer applies
	// implicitly under flat config.
	globalIgnores(["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
