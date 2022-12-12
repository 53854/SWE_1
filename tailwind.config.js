/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: '0.6rem',
      sm: '0.8rem',
      base: '0.9rem',
      xl: '1.25rem',
    },
  },
  plugins: [],
}
