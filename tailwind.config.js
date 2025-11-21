/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#E8A0B9',
        'brand-pink-dark': '#D18AA3',
        'brand-beige': '#FDF6F3',
        'brand-dark': '#2F2F2F',
        'brand-light': '#FBFBFB',
      },
      fontFamily: {
          sans: ['Brooklyn', 'sans-serif'],
        brooklyn: ['Brooklyn', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}