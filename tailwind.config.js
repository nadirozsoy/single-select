/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        sm: '1.6rem'
      },
      colors: {
        primary: {
          DEFAULT: '#475569'
        }
      }
    }
  },
  plugins: []
}
