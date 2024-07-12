/** @type {import('tailwindcss').Config} */
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
          pure: "#000000",
        },
        white: {
          DEFAULT: "#ffffff",
          weak: "F6F6F6",
          pure: "#ffffff",
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
