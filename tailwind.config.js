/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zinc: {
          950: '#09090B',
          900: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
          600: '#52525B',
          500: '#71717A',
          400: '#A1A1AA',
          300: '#D4D4D8',
          200: '#E4E4E7',
          100: '#F4F4F5',
          50:  '#FAFAFA',
        },
        accent: '#2563EB',
        'accent-light': '#DBEAFE',
        gold: '#CA8A04',
        'gold-light': '#FEF9C3',
        muted: '#71717A',
        'muted-light': '#A1A1AA',
        'border-subtle': '#E4E4E7',
        surface: '#FFFFFF',
        'surface-alt': '#F4F4F5',
        foreground: '#09090B',
      },
      fontFamily: {
        headline: ['"Archivo"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)',
        'nav': '0 1px 3px rgba(0,0,0,0.06)',
        'elevated': '0 20px 40px -12px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
