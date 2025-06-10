module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "var(--primary-blue)",
          light: "var(--primary-blue-light)",
          dark: "var(--primary-blue-dark)",
        },
        background: {
          primary: "var(--background-primary)",
          secondary: "var(--background-secondary)",
          tertiary: "var(--background-tertiary)",
          accent: "var(--background-accent)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          light: "var(--text-light)",
          placeholder: "var(--text-placeholder)",
        },
        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
        },
        success: "var(--success-color)",
        warning: "var(--warning-color)",
        error: "var(--error-color)",
        line: {
          red: "var(--line-red)",
        },
      },
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};