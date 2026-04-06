/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy": {
          950: "#080c18",
          900: "#0d1326",
          800: "#141d3a",
          700: "#1c2a50",
          600: "#2a3d6e",
        },
        "accent": "#3b6cf0",
        "accent-light": "#ebf0fe",
        "gold": "#c9a24e",
        "gold-light": "#faf5e9",
        "muted": "#7b8ba5",
        "muted-light": "#94a3b8",
        "border-subtle": "#e8ecf2",
        "surface": "#ffffff",
        "surface-alt": "#f7f9fc",
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Inter", "sans-serif"],
      },
      boxShadow: {
        'card': '0 4px 24px rgba(8,12,24,0.04)',
        'card-hover': '0 16px 48px rgba(8,12,24,0.08)',
        'nav': '0 2px 20px rgba(8,12,24,0.06)',
      }
    },
  },
  plugins: [],
}
