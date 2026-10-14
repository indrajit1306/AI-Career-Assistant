/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2FBF6',
          100: '#DCFCE7',
          200: '#A7D9BC',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#0F3422',
          800: '#0D2E1F',
          900: '#061A10',
          925: '#04140C',
          950: '#020B06',
        },
        amber: {
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        }
      }
    },
  },
  plugins: [],
}
