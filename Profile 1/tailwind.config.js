module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "var(--primary-blue)",
          'blue-dark': "var(--primary-blue-dark)",
          red: "var(--primary-red)",
          background: "var(--primary-background)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          light: "var(--text-light)",
          white: "var(--text-white)",
        },
        bg: {
          white: "var(--bg-white)",
          'gray-light': "var(--bg-gray-light)",
          'gray-medium': "var(--bg-gray-medium)",
          'gray-dark': "var(--bg-gray-dark)",
        },
        border: {
          light: "var(--border-light)",
          medium: "var(--border-medium)",
        },
      },
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};