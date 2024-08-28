// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        greatvibes: ['Great Vibes', 'cursive'],
      },
      colors: {
        'pastel-pink': '#FFC0CB',
        'dark-bg': '#1a1a1a',
        'dark-card': '#2a2a2a',
        'dark-text': '#e0e0e0',
        'pink-highlight': '#ff79c6',
        'black': '#000000',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
