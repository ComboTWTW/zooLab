/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainRed: "#961914",
        mainRedHove: "#75110D",
        mainGray: "#434242",
        addGray: "#9F9E9D",
        pinkHover: "#EAD1D0",
        pinkLight: "#FFF4F3"
      },
      backgroundImage: {
        'hero-bg': "url('/src/assets/hero-bg.png')"
      }
    },
    screens: {
      sm: "460px",
      slides600: "600px",
      xs: "620px",
      md: '768px',
      md2: '980px',
      lg: '1200px',
    }
  },
  plugins: [],
}