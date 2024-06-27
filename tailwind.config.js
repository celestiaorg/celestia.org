/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // Plugin for the .scrollbar-hide utility
    function ({ addUtilities }) {
      const newUtilities = {
        'a, button': {
          color: 'blue',
          textDecoration: 'underline',
          display: 'inline-block',
        },
        'hr': {
          border: '0',
          borderTop: '1px solid #333',
          margin: '1rem 0',
        },
      };
      addUtilities(newUtilities, ['responsive']);
    },
  ],

};
