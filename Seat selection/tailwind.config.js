module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "var(--primary-blue)",
          'blue-dark': "var(--primary-blue-dark)",
          'blue-light': "var(--primary-blue-light)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          disabled: "var(--text-disabled)",
          success: "var(--text-success)",
        },
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          muted: "var(--bg-muted)",
        },
        status: {
          booked: "var(--status-booked)",
          selected: "var(--status-selected)",
          available: "var(--status-available)",
          line: "var(--status-line)",
          connector: "var(--status-connector)",
        },
        border: {
          light: "var(--border-light)",
        },
      },
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};