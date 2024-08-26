/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '48': 'repeat(48, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '36': 'repeat(36, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

