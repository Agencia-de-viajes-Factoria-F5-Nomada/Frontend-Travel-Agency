/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        surface: {
          950: '#0b1220',
          900: '#0f172a',
          800: '#111c2e',
          700: '#1e293b',
          600: '#334155',
        },
        ink: {
          DEFAULT: '#e2e8f0',
          muted: '#94a3b8',
          soft: '#cbd5e1',
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
        card: '0 10px 30px -12px rgba(0, 0, 0, 0.45)',
        focus: '0 0 0 3px rgba(6, 182, 212, 0.45)',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
}
