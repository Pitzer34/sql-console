/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'selector',
  plugins: [require('tailwindcss-primeui')],
};
