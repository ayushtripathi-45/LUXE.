export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"]
      },
      colors: {
        ink: { DEFAULT: "#1a1a2e", 50: "#f0f0f7", 100: "#d1d1e8", 900: "#0d0d1a" },
        cream: { DEFAULT: "#faf8f4", dark: "#f0ece3" },
        accent: { DEFAULT: "#e8633a", dark: "#c44d26", light: "#f08060" },
        gold: "#c9a84c"
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        pop: "pop 0.2s ease-out"
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(24px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        pop: { "0%": { transform: "scale(1)" }, "50%": { transform: "scale(1.2)" }, "100%": { transform: "scale(1)" } }
      }
    }
  },
  plugins: []
};
