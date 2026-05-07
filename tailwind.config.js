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
          DEFAULT: '#001f3f',
          50: '#e6f0fa',
          100: '#cce1f5',
          200: '#99c2eb',
          300: '#66a4e0',
          400: '#3385d6',
          500: '#0066cc',
          600: '#0052a3',
          700: '#003d7a',
          800: '#002952',
          900: '#001f3f',
        },
        surface: {
          DEFAULT: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
        },
        ink: {
          DEFAULT: '#001f3f',
          lighter: '#475569',
          light: '#1e293b',
        },
        nomada: {
          dark: '#001f3f',
          white: '#ffffff',
        }
      },
    },
  },
  plugins: [],
}