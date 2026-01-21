/** @type {import('tailwindcss').Config} */

// design settings
const mobileViewport = 390;
const desktopViewport = 1440;

// Custom scaling font sizes based on 1440px and 375px design and vw
const fontSize = [82, 50, 40, 32, 24, 20, 18, 16, 14, 12, 10, 8];

const calcDesktopSize = (size) => (size / desktopViewport) * 100 + "vw";
const calcMobileSize = (size) => (size / mobileViewport) * 100 + "vw";
const customFontSize = () => {
	let fontSizeObj = {};
	fontSize.forEach((size) => {
		fontSizeObj[`scaled-desktop-${size}`] = calcDesktopSize(size);
		fontSizeObj[`scaled-mobile-${size}`] = calcMobileSize(size);
	});
	return fontSizeObj;
};

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/macros/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: [
		"group-hover:fill-[#ffffff], group-hover:fill-[#17141A], line-clamp-1, line-clamp-2, line-clamp-3, line-clamp-4, line-clamp-5, line-clamp-6, line-clamp-7, line-clamp-8, line-clamp-9, line-clamp-10",
	],
	theme: {
		extend: {
			screens: {
				xs: "390px",
				"3xl": "1920px",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				black: {
					DEFAULT: "#17141A",
					subtle: "#453D51",
					pure: "#000000",
				},
				white: {
					DEFAULT: "#ffffff",
					weak: "#F6F6F6",
					pure: "#ffffff",
				},
				purple: {
					DEFAULT: "#7b2bf9",
					weak: "#995DF9",
					dark: "#38167F",
					muted: "#766793",
					// New brand colors (2025)
					soft: "#CABBFF", // Primary button gradient end
					softer: "#E8E2FF", // Primary button gradient start (at full opacity)
					base: "#AD9BDD", // Button stroke/border color
					deep: "#7B68A6", // Darker purple for light theme borders
					fill: "#CBBEF2", // Primary button solid background
					hover: "#ADB5FF", // Outline button hover color
					"primary-hover": "#E0D7FF", // Primary light hover color
				},
				// Button border colors
				"button-border": {
					DEFAULT: "#353238", // Outline dark default border
					light: "#F4EFFD", // Outline light default border
					"light-hover": "#C3B3E0", // Outline light hover border
				},
				// Button active state
				"button-active": {
					DEFAULT: "#A3A7CD", // Dark theme active background
					light: "#EAE4F3", // Light theme active background
				},
				// Disabled/muted states
				disabled: {
					DEFAULT: "#67646A",
					bg: "#3A3A3A",
				},
				red: {
					DEFAULT: "#EC5643",
					error: {
						DEFAULT: "#ff4949",
						subtle: "#FFC7C7",
					},
				},
				weak: {
					DEFAULT: "#D9D9DB",
				},
				subtle: {
					DEFAULT: "#5D5C62",
				},
				green: {
					DEFAULT: "#42D885",
				},
				input: {
					bg: "#201c25",
					border: "rgba(226,232,240,0.1)",
					placeholder: "#4f4857",
				},
				grayscale: {
					400: "#94a3b8",
				},
			},
			fontFamily: {
				untitledSans: ["var(--font-untitled-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
				youth: ["var(--font-youth)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
				druk: ["var(--font-druk)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
			},
			fontSize: customFontSize(),
			backgroundImage: {
				"explore-card-gradient": "linear-gradient(161.19deg, #4E4D51 17.03%, #29242A 100.02%)",
				// Button gradients (2025 design system)
				"button-primary-fill": "linear-gradient(to bottom, rgba(232, 226, 255, 0.4) 0%, rgb(202, 187, 255) 90.385%), linear-gradient(#FFFFFF, #FFFFFF)",
				"button-border-dark": "linear-gradient(to bottom, rgba(232, 226, 255, 0.4) 0%, #CABBFF 100%)",
				"button-border-light": "linear-gradient(to bottom, #AD9BDD 0%, #7B68A6 100%)",
			},
			boxShadow: {
				"button-inset": "inset 0px 2px 0px 0px rgba(255, 255, 255, 0.33)",
			},
			width: {
				"1/10": "10%",
				"2/10": "20%",
				"3/10": "30%",
				"4/10": "40%",
				"5/10": "50%",
				"6/10": "60%",
				"7/10": "70%",
				"8/10": "80%",
				"9/10": "90%",
			},
		},
	},
	plugins: [
		// Plugin for the .scrollbar-hide utility
		require("@tailwindcss/line-clamp"),
		function ({ addUtilities }) {
			addUtilities({
				".no-scrollbar": {
					"-ms-overflow-style": "none" /* IE and Edge */,
					"scrollbar-width": "none" /* Firefox */,
				},
				".no-scrollbar::-webkit-scrollbar": {
					display: "none" /* Chrome, Safari, and Opera */,
				},
			});
		},
	],
};
