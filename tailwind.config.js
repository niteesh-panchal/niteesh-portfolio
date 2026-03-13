// tailwind.config.js
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gs: ["var(--font-google-sans)"],
        "main-heading": ["var(--font-poppins)"],
      },
      colors: {
        "main-dark": "#000000",
        "secondary-dark": "#fca311",
        "accent-dark": "#ffffff",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
