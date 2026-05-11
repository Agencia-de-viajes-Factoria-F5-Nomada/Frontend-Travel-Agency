/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7fb',
          100: '#e1edf5',
          200: '#c7e0ed',
          300: '#9fcce0',
          400: '#6faecc',
          500: '#4c91b5',
          600: '#397598',
          700: '#2f5e7c',
          800: '#2a4f68',
          900: '#001f3f',
        },
        surface: {
          950: '#00152b',
          900: '#001f3f',
          800: '#0a2e52',
          700: '#143d66',
          600: '#1e4c7a',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          muted: '#CBD5E1',
          soft: '#E2E8F0',
        },
        status: {
          confirmed: '#22c55e',
          pending: '#ef4444',
          warning: '#f59e0b',
          info: '#06b6d4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0, 31, 63, 0.3)',
        focus: '0 0 0 3px rgba(76, 145, 181, 0.5)',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
}