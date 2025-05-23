/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#841b60',
          dark: '#6d164f',
          light: '#f8f0f5',
        },
        background: '#ebf4f7',
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
      boxShadow: {
        'soft': '0 8px 16px rgba(0, 0, 0, 0.04)',
        'hover': '0 16px 32px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};