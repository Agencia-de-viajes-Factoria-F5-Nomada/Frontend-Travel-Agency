/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
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
        card: '0 10px 30px -12px rgba(4, 28, 50, 0.5)', 
        focus: '0 0 0 3px rgba(58, 114, 158, 0.5)',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
}