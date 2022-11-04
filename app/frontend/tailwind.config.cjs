/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{tsx,ts}',
    './src/pages/**/*.{tsx,ts}',
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
