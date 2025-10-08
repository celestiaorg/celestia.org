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

// Aeonik font
export const aeonik = localFont({
	src: [
		{
			path: "../../public/fonts/aeonik/AeonikPro-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/fonts/aeonik/AeonikPro-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/aeonik/AeonikPro-Regular.woff2",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-aeonik",
	display: "swap",
	fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
	preload: true,
});

// Spartan font
export const spartan = localFont({
	src: [
		{
			path: "../../public/fonts/spartan/LeagueSpartan-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/spartan/LeagueSpartan-SemiBold.woff2",
			weight: "600",
			style: "normal",
		},
	],
	variable: "--font-spartan",
	display: "swap",
	fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
	preload: true,
});
