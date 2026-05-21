/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e6f7ff',
          200: '#bfeaff',
          300: '#8fdcff',
          400: '#5fcfff',
          500: '#2da9ff',
          600: '#1f8adf',
          700: '#16619f',
          800: '#0d3f6f',
          900: '#05203f',
        },
        surface: {
          950: '#021a2a',
          900: '#042a3f',
          800: '#0b4860',
          700: '#135f7a',
          600: '#1e7a95',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          muted: '#CBD5E1',
          soft: '#E2E8F0',
        },
        accent: {
          DEFAULT: '#4A8FA8',
          light: '#DAEEF7',
          muted: '#7AAFC0',
          dark: '#1A3A5C',
          deep: '#122840',
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
        page: '85%',
      },
    },
  },
  plugins: [],
}