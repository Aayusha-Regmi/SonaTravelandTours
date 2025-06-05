/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'opensans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          blue: '#0a639d',
          'blue-dark': '#084d7a',
          'blue-light': '#e7eff5',
        },
        secondary: {
          white: '#ffffff',
          gray: '#f5f5f5',
          dark: '#3d3d3d',
        },
        text: {
          primary: '#3d3d3d',
          secondary: '#5f5f5f',
          muted: '#8f8f8f',
          disabled: '#b0b0b0',
          success: '#388b68',
        },
        seat: {
          booked: '#df7a80',
          selected: '#5a9f82',
          available: '#b0b0b0',
        },
        route: {
          line: '#efbdc0',
        },
        stepper: {
          line: '#9bbfd7',
        },
        border: {
          light: '#ececec',
        },
      },
    },
  },
  plugins: [],
}