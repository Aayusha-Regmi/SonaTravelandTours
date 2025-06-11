module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#0a639d",
           'blue-dark': "var(--primary-blue-dark)",
          'blue-light': "var(--primary-blue-light)",
          orange: "#ff8f1f",
          dark: "#07456e",
        },
        secondary: {
          gray: "#5f5f5f",
          darkGray: "#3d3d3d",
          lightGray: "#8f8f8f",
          extraLightGray: "#ececec",
        },
        accent: {
          orange: "#b36416",
          lightOrange: "#fff4e9",
        },
        background: {
          light: "#f5f5f5",
          white: "#ffffff",
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
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          disabled: "var(--text-disabled)",
          success: "var(--text-success)",
          dark: "#3d3d3d",
          gray: "#5f5f5f",
          lightGray: "#b0b0b0",
          placeholder: "#d9d9d9",
        },
         border: {
          light: "var(--border-light)",
        },
      },
      spacing: {
        '10px': '10px',
        '20px': '20px',
        '30px': '30px',
        '58px': '58px',
          3: '0.75rem',
        '22': '5.5rem', // This will create ml-22 = 88px
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'oleo-script': ['Oleo Script', 'cursive'],
      },
      boxShadow: {
        card: '0px 4px 0px #888888',
        stats: '8px 8px 13px rgba(10, 99, 157, 0.3)',
      },      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        flowDown: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'flow-zigzag': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(40px) translateY(20px)' },
          '50%': { transform: 'translateX(80px) translateY(0)' },
          '75%': { transform: 'translateX(120px) translateY(20px)' },
          '100%': { transform: 'translateX(160px) translateY(0)' },
        },
        'flow-zigzag-reverse': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-40px) translateY(20px)' },
          '50%': { transform: 'translateX(-80px) translateY(0)' },
          '75%': { transform: 'translateX(-120px) translateY(20px)' },
          '100%': { transform: 'translateX(-160px) translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
        slideDown: 'slideDown 0.2s ease-out',
        pulse: 'pulse 1.5s ease-in-out infinite',
        flowDown: 'flowDown 2s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'flow-zigzag': 'flow-zigzag 4s linear infinite',
        'flow-zigzag-reverse': 'flow-zigzag-reverse 4s linear infinite',
      },
    },
  },
  plugins: [],
};