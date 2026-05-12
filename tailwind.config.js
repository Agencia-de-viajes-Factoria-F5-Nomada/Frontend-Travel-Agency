/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
<<<<<<< HEAD
          50: '#f0f5fa',
          100: '#dae7f1',
          200: '#bbd2e5',
          300: '#8db4d1',
          400: '#588fb7',
          500: '#3a729e',
          600: '#2c5a83',
          700: '#254a6b',
          800: '#1c364e', 
          900: '#041C32', 
        },
        surface: {
          950: '#020d17',
          900: '#041C32', // Fondo oscuro principal
          800: '#0E375A', // Contraste
          700: '#164B78',
          600: '#1F5F96',
        },
        ink: {
          DEFAULT: '#F4F8FA', 
          muted: '#94A3B8',
          soft: '#CBD5E1',
=======
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
>>>>>>> dev
        },
        status: {
          confirmed: '#22c55e',
          pending: '#ef4444',
          warning: '#f59e0b',
          info: '#38bdf8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
<<<<<<< HEAD
        card: '0 10px 30px -12px rgba(4, 28, 50, 0.5)', 
        focus: '0 0 0 3px rgba(58, 114, 158, 0.5)',
=======
        card: '0 10px 30px -12px rgba(0, 31, 63, 0.3)',
        focus: '0 0 0 3px rgba(76, 145, 181, 0.5)',
>>>>>>> dev
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
}