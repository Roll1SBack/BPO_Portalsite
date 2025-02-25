module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#d4a017', // A rich, elegant gold color
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate')
  ],
};