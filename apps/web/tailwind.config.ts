import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C293C',
        surface: '#FBFBF9',
        paper: '#FBF7EE',
        primary: {
          DEFAULT: '#FDC800',
          soft: '#FFF1C4',
        },
        secondary: '#432DD7',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
      },
      boxShadow: {
        brut: '8px 8px 0 #1C293C',
        'brut-lg': '12px 12px 0 #1C293C',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Inconsolata', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
