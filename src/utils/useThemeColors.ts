import { useMemo } from "react";

// Third Party
import resolveConfig from "tailwindcss/resolveConfig";
import type { Config } from "tailwindcss";

// Project
import tailwindConfigRaw from "@/../tailwind.config.js";

// The JS config object is not statically typed to tailwindcss/Config — cast here.
const tailwindConfig = tailwindConfigRaw as unknown as Config;

// Add viewport heights to theme config
const viewportHeights = {
	hero: {
		md: "70vh",
		lg: "90vh",
	},
} as const;

export type ViewportHeights = typeof viewportHeights;

export default function useThemeColors() {
	const tailwind = useMemo(() => {
		const config = resolveConfig(tailwindConfig);
		return {
			...config.theme.colors,
			viewportHeights,
		};
	}, []);

	return tailwind;
}
