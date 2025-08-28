/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'custom-bg': '#FFFAE9',
        'custom-div':'#C4F5DF',
        'custom-b-btn' : '#5ABBEC',
        'custom-r-btn' : '#FF5A2D',
        'custom-line-col':'#23A491',
      }
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#FFFAE9",
        "custom-div": "#C4F5DF",
        "custom-b-btn": "#5ABBEC",
        "custom-r-btn": "#FF5A2D",
        "custom-line-col": "#23A491",
      },
      fontFamily: {
        cute: ["Nunito", "sans-serif"], // 귀여운 폰트
        button: ["Poppins", "sans-serif"], // 버튼용
        title: ["Rubik", "sans-serif"], // 모던한 느낌
      },
    },
  },
  plugins: [],
};