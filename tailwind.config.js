/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1220",
          900: "#10182B",
          800: "#182240",
          700: "#22305A",
          600: "#2E3F73",
        },
        paper: {
          50: "#FBFAF6",
          100: "#F5F2EA",
          200: "#EDE8DA",
        },
        brass: {
          400: "#D9B96A",
          500: "#C9A24B",
          600: "#A9813A",
          700: "#8A672D",
        },
        signal: {
          met: "#2F6B4F",
          partial: "#A9762D",
          missing: "#A13B33",
        },
      },
      fontFamily: {
        display: ["Newsreader", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
