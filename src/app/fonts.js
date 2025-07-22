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
