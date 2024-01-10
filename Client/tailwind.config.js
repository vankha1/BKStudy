/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#FEFBFF',
        'primary': '#3C57BA',
        'secondary': '#c6e7ff',
        'borderline': '#cacaca',
        'footer': '#001453',
        'border': '#cacaca'
      },
      boxShadow: {
        'custom': '0 0 0 0.2rem rgba(15,108,191,.75)',
      }
    },
  },
  plugins: [],
}