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
          50: '#F8FAFC',
          100: '#E0F2FE',
          300: '#7DD3FC',
          400: '#38BDF8',
          700: '#1D4ED8',
          900: '#172554',
          925: '#0F172A',
          950: '#020617',
        }
      }
    },
  },
  plugins: [],
}
