// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // for expo-router files
    "./components/**/*.{js,jsx,ts,tsx}", // if you have a components folder
    "./app.{js,jsx,ts,tsx}", // main entry point
  ],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a", // Tailwind green-600
        secondary: "#f97316", // Tailwind orange-600
        background: "#f3f4f6", // Tailwind gray-200
        text: "#111827", // Tailwind gray-900
        light: "#fff",
      },
    },
  },
  plugins: [],
};
