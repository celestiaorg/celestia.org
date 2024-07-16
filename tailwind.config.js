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
        // coral: {
        //   DEFAULT: '#F84F4F',
        // },
        // purple: {
        //   DEFAULT: "#BDBCE1",
        // },
        // grey: {
        //   DEFAULT: '#8b8b8b'
        // }
      },
      fontFamily: {
        untitledSans: ['"UntitledSans"', "sans-serif"],
      },
      fontSize: customFontSize(),
    },
  },
  plugins: [
    // Plugin for the .scrollbar-hide utility
    function ({ addUtilities }) {
      const newUtilities = {
        hr: {
          border: "0",
          borderTop: "1px solid #333",
          margin: "1rem 0",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
