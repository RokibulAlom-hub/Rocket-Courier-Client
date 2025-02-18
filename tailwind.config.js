/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgcolor:"#f2f3f8",
        secondary:"#9b9b9b",
        accent:"#7a8c90",
        text:"#2C3E50",
        backup:"#fefffa"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

