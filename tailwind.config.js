/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#d84e55",
          dark: "#b32d33"
        },
        secondary: {
          DEFAULT: "#1d2129",
          light: "#6d7f9c"
        },
        background: "#f5f5f5"
      }
    }
  },
  plugins: []
};
