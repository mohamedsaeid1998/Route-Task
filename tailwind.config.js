/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primaryColor: "#1246AC",
        mainBg: "rgba(13, 19, 33, 1)",
        subBg: "#333333",
        mainColor: "#C5D86D",
        secondColor: "#FFEDDF",
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
  },
  plugins: []
  ,
};
