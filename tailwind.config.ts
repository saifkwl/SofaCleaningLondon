import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7f6',
          100: '#d4ebe8',
          200: '#a9d7d2',
          300: '#73bcb5',
          400: '#419b95',
          500: '#27807b',
          600: '#1c6663',
          700: '#185250',
          800: '#164241',
          900: '#123736',
          950: '#06201f',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f2760c',
          600: '#e35d05',
          700: '#bc4508',
          800: '#95370e',
          900: '#792f0f',
        },
        ink: {
          DEFAULT: '#12211f',
          soft: '#3f5450',
          muted: '#6b807c',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      },
      maxWidth: {
        content: '72rem',
        prose: '44rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,33,31,0.04), 0 8px 24px -12px rgba(18,33,31,0.18)',
        lift: '0 2px 4px rgba(18,33,31,0.05), 0 18px 40px -16px rgba(18,33,31,0.28)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .5s cubic-bezier(.22,.61,.36,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
