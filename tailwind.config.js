
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#faf7ff',
          100: '#f4edff',
          200: '#ebe0ff',
          300: '#dac7ff',
          400: '#c4a1ff',
          500: '#a975ff',
          600: '#9146ff',
          700: '#7c2dff',
          800: '#6628d4',
          900: '#5522aa',
          950: '#371474',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        brand: {
          50: '#faf7ff',
          100: '#f4edff',
          200: '#ebe0ff',
          300: '#dac7ff',
          400: '#c4a1ff',
          500: '#a975ff',
          600: '#9146ff',
          700: '#7c2dff',
          800: '#6628d4',
          900: '#5522aa',
          950: '#371474',
        },
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #9146ff 0%, #a975ff 25%, #c4a1ff 50%, #dac7ff 75%, #ebe0ff 100%)',
        'brand-gradient-reverse': 'linear-gradient(135deg, #ebe0ff 0%, #dac7ff 25%, #c4a1ff 50%, #a975ff 75%, #9146ff 100%)',
        'surface-gradient': 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #171717 100%)',
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgb(159 122 234 / 0.1), 0 2px 4px -2px rgb(159 122 234 / 0.1)',
        'glass-sm': '0 1px 2px 0 rgb(159 122 234 / 0.05)',
        'glass-hover': '0 10px 15px -3px rgb(159 122 234 / 0.1), 0 4px 6px -4px rgb(159 122 234 / 0.1)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
