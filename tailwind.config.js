/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6f9',
          100: '#d9eaf1',
          200: '#bdd8e4',
          300: '#7FAABC',
          400: '#638DA0',
          500: '#496E7E',
          600: '#3C5663',
          700: '#314853',
          800: '#314853',
          900: '#283b45',
        },
        surface: {
          950: '#3F6674',
          900: '#496E7E',
          800: '#6F97AA',
          700: '#5D8193',
          600: '#8FB6C9',
        },
        ink: {
          DEFAULT: '#F4F8FA',
          muted: '#BFD4DD',
          soft: '#DCE9EE',
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
        card: '0 10px 30px -12px rgba(60, 86, 99, 0.6)',
        focus: '0 0 0 3px rgba(143, 182, 201, 0.5)',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
}
