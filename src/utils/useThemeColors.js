import { useMemo } from "react";

// Third Party
import resolveConfig from "tailwindcss/resolveConfig";

// Project
import tailwindConfig from "@/../tailwind.config.js";

// Add viewport heights to theme config
const viewportHeights = {
	hero: {
		md: "70vh",
		lg: "90vh",
	},
};

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
