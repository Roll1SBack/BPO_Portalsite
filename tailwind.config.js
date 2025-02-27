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

