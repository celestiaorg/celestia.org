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

// Slussen font (body text for redesigned pages)
export const slussen = localFont({
	src: [
		{
			path: "../../public/fonts/slussen/Slussen-Light.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/slussen/Slussen-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/slussen/Slussen-Medium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/slussen/Slussen-Semibold.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../public/fonts/slussen/Slussen-Bold.otf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-slussen",
	display: "swap",
	fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
	adjustFontFallback: false,
	preload: false,
});

// Slussen Extended font (display/headline for redesigned pages)
export const slussenExtended = localFont({
	src: [
		{
			path: "../../public/fonts/slussen/Slussen-Extended-Light.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/slussen/Slussen-Extended-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/slussen/Slussen-Extended-Medium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/slussen/Slussen-Extended-Semibold.woff2",
			weight: "600",
			style: "normal",
		},
	],
	variable: "--font-slussen-extended",
	display: "swap",
	fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
	adjustFontFallback: false,
	preload: false,
});

// Slussen Mono font (tags/meta for redesigned pages)
export const slussenMono = localFont({
	src: [
		{
			path: "../../public/fonts/slussen/Slussen-Mono-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/slussen/Slussen-Mono-Medium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/slussen/Slussen-Mono-Semibold.otf",
			weight: "600",
			style: "normal",
		},
	],
	variable: "--font-slussen-mono",
	display: "swap",
	fallback: ["monospace"],
	adjustFontFallback: false,
	preload: false,
});

// Druk font
export const druk = localFont({
	src: [
		{
			path: "../../public/fonts/druk/druk-medium-webfont.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/druk/druk-medium-webfont.woff",
			weight: "500",
			style: "normal",
		},
	],
	variable: "--font-druk",
	display: "swap",
	fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
	preload: true,
});
