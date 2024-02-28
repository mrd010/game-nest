/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        Lato: ['Lato', 'sans-serif'],
      },
      spacing: {
        'auto-resize': '20vw',
      },
    },
  },
  plugins: [],
};
