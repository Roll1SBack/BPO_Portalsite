module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        gold: {
          400: "#f5c518",
          500: "#e8b923",
          600: "#d8a31f",
        },
      },

      clipPath: {
        'ribbon-left': 'polygon(0 0, 100% 0, 80% 100%, 0 100%)', // Left curve for the ribbon
        'ribbon-right': 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)', // Right curve for the ribbon
      },
    },
  },
  
  plugins: 
  [
    require('tailwindcss-animate'),
    require('tailwind-clip-path'),
  ],
};

