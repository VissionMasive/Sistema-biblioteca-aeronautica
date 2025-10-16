/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Montserrat','ui-sans-serif','system-ui','Segoe UI','Roboto','Inter','Arial'] },
      colors: { primary:'#0b5cab', secondary:'#1e90ff', accent:'#0a3f7a' }
    }
  },
  plugins: []
}