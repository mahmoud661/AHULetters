/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // Disable Tailwind's preflight
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#f6f9fc", // Light background color
          DEFAULT: "#3a73c2", // Primary color
          dark: "#2e2e2e", // Dark theme primary color
        },
        hover: {
          DEFAULT: "#29518a",
        },
        neutral: {
          light: "#797979", // Light neutral color
          DEFAULT: "#1d1d1d", // Default neutral color (dark)
        },
      },
    },
  },
  darkMode: "class", // Enable dark mode using class strategy
  plugins: [],
};
