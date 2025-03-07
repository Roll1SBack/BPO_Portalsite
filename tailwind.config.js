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

        diamondGreen: {
          400: "#00bfa6",
          500: "#00a993",
          600: "#009a8d",
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

  safelist: [
    'bg-gold-400',
    'text-blue-900',
    'rounded-lg',
    'font-semibold',
    'hover:bg-gold-500',
    'shadow-md',
    'dark:bg-gray-200',
    'dark:text-blue-800',
    'dark:hover:bg-gray-300',
    'transition-all',
    'duration-300',
    'text-3xl',
    'font-bold',
    'text-gray-900',
    'text-center',
    'mb-12',
    'grid',
    'grid-cols-1',
    'md:grid-cols-3',
    'gap-8',
    'text-2xl',
    'text-gray-100',
    'dark:bg-gray-800',
    'dark:shadow-gray-700',
    'shadow-lg',
    'overflow-hidden',
    'hover:shadow-xl',
    'dark:text-gray-400',
    'text-lg',
    'ribbon-left',
    'ribbon-right',
    'diamondGreen-700',
    'diamondGreen-500',
  ],
};

