/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // automatycznie według systemu
  theme: {
    extend: {
      colors: {
        primary: "#1A237E",
        onPrimary: "#FFFFFF",

        secondary: "#90A4AE",
        onSecondary: "#000000",

        background: "#F5F5F5",
        onBackground: "#000000",

        surface: "#FFFFFF",
        onSurface: "#000000",

        error: "#D32F2F",
        onError: "#FFFFFF",
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "32px",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}
