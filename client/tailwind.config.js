/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        primaryBG: 'rgba(34,197,94,0.2)',
        alter: 'rgb(239 68 68)' ,
      }
    },
  },
  plugins: [],
}