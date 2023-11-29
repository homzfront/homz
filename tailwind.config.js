/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        BlackHomz: '#202020',
        BlueHomz: '#006AFF',
        BlueHomz2: '#0058D4',
        GrayHomz: '#4E4E4E',
        GrayHomz2: '#A9A9A9',
        GrayHomz3: '#9BB9E4',
        GrayHomz6: '#E6E6E6',
        GrayHomz5: '#D5D5D5',


      },
    },
  },
  plugins: [],
}


