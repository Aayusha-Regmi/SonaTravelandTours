module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#0a639d",
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
        text: {
          dark: "#3d3d3d",
          gray: "#5f5f5f",
          lightGray: "#b0b0b0",
          placeholder: "#d9d9d9",
        },
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
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        pulse: 'pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};