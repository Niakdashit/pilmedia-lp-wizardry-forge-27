
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f4f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bfa8ff',
          400: '#a078ff',
          500: '#8347ff',
          600: '#7c2dff',
          700: '#7019f7',
          800: '#5d15d0',
          900: '#4d14aa',
          950: '#2f0875',
        },
        accent: {
          50: '#f0f0ff',
          100: '#e4e4ff',
          200: '#ccccff',
          300: '#a8a8ff',
          400: '#7c7cff',
          500: '#5050ff',
          600: '#3030ff',
          700: '#2121eb',
          800: '#1c1cb8',
          900: '#1e1e94',
          950: '#0f0f5c',
        },
        brand: {
          50: '#f4f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bfa8ff',
          400: '#a078ff',
          500: '#8347ff',
          600: '#7c2dff',
          700: '#7019f7',
          800: '#5d15d0',
          900: '#4d14aa',
          950: '#2f0875',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2f0875 0%, #5d15d0 25%, #7c2dff 50%, #a078ff 75%, #d9ceff 100%)',
        'brand-gradient-reverse': 'linear-gradient(135deg, #d9ceff 0%, #a078ff 25%, #7c2dff 50%, #5d15d0 75%, #2f0875 100%)',
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgb(124 45 255 / 0.05), 0 2px 4px -2px rgb(124 45 255 / 0.05)',
        'glass-sm': '0 1px 2px 0 rgb(124 45 255 / 0.05)',
        'glass-hover': '0 8px 12px -2px rgb(124 45 255 / 0.05), 0 4px 8px -4px rgb(124 45 255 / 0.05)',
      }
    },
  },
  plugins: [],
}
