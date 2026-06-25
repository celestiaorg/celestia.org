import localFont from "next/font/local";

// UntitledSans font with multiple weights
export const untitledSans = localFont({
	src: [
		{
			path: "../../public/fonts/untitled-sans/untitled-sans-regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/untitled-sans/untitled-sans-medium.woff2",
			weight: "500",
			style: "normal",
		},
	],
	variable: "--font-untitled-sans",
	display: "swap",
	fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
	preload: true,
});

// Youth font
export const youth = localFont({
	src: "../../public/fonts/youth/Youth-Regular.woff2",
	weight: "400",
	style: "normal",
	variable: "--font-youth",
	display: "swap",
	fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
	preload: true,
});

// NuberNext font (body text for redesigned pages — replaces Slussen)
// Weight remap per design system: DemiBold registered as 500.
export const nuberNext = localFont({
	src: [
		{
			path: "../../public/fonts/nubernext/NuberNext-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/nubernext/NuberNext-DemiBold.woff2",
			weight: "500",
			style: "normal",
		},
	],
	variable: "--font-nubernext",
	display: "swap",
	fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
	adjustFontFallback: false,
	preload: false,
});

// NuberNext Wide font (display/headline for redesigned pages — replaces Slussen Extended)
// Weight remap per design system: Wide DemiBold = 500, Wide Bold = 600,
// and the big-stat numbers use NuberNext Extended Bold registered as 700.
export const nuberNextWide = localFont({
	src: [
		{
			path: "../../public/fonts/nubernext/NuberNextWide-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/nubernext/NuberNextWide-DemiBold.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/nubernext/NuberNextWide-Bold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../public/fonts/nubernext/NuberNextExtended-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-nubernext-wide",
	display: "swap",
	fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
	adjustFontFallback: false,
	preload: false,
});

// Roboto Mono font (tags/meta for redesigned pages — replaces Slussen Mono)
// Self-hosted variable font (OFL), weight axis 100–700.
export const robotoMono = localFont({
	src: [
		{
			path: "../../public/fonts/roboto-mono/RobotoMono-Variable.woff2",
			weight: "100 700",
			style: "normal",
		},
	],
	variable: "--font-roboto-mono",
	display: "swap",
	fallback: ["monospace"],
	adjustFontFallback: false,
	preload: false,
});
