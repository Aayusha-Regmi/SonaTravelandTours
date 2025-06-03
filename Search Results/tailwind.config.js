module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0a639d',
          light: '#1e7bb8',
          dark: '#084d7a',
        },
        secondary: {
          DEFAULT: '#f5f5f5',
          light: '#ffffff',
          dark: '#ececec',
        },
        accent: {
          red: '#d85f66',
          orange: '#ff8f1f',
          green: '#388b68',
        },
        gray: {
          100: '#f5f5f5',
          200: '#ececec',
          300: '#d9d9d9',
          400: '#b0b0b0',
          500: '#8f8f8f',
          600: '#5f5f5f',
          700: '#3d3d3d',
        },
      },
    },
  },
  plugins: [],
};