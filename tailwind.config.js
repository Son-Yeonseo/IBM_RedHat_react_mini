/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#FFFAE9',
        'custom-div':'#C4F5DF',
        'custom-b-btn' : '#5ABBEC',
        'custom-r-btn' : '#FF5A2D',
        'custom-line-col':'#23A491',
      },
    },
  },
  plugins: [],
};