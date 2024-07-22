/** @type {import('tailwindcss').Config} */

// design settings
const mobileViewport = 390;
const desktopViewport = 1440;

// Custom scaling font sizes based on 1440px and 375px design and vw
const fontSize = [82, 50];

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
  safelist: ["group-hover:fill-[#ffffff], group-hover:fill-[#17141A]"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
        weak: {
          DEFAULT: "#ADA1BF",
        },
      },
      fontFamily: {
        untitledSans: ['"UntitledSans"', "sans-serif"],
      },
      fontSize: customFontSize(),
      backgroundImage: {
        "explore-card-gradient":
          "linear-gradient(161.19deg, #4E4D51 17.03%, #29242A 100.02%)",
      },
    },
  },
  plugins: [
    // Plugin for the .scrollbar-hide utility
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
