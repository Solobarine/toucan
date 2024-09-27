/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        itim: ["Itim", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      colors: {
        primary: "#7e22ce",
        secondary: "#52525b",
        light: "#e7e5e4",
        dark: "#292524",
        "section-dark": "#292524",
      },
    },
  },
  plugins: [],
};
