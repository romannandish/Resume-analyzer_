/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.5s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      colors: {
        "dark-blue": "#0f172a",
        "dark-purple": "#1e1b4b",
        "neon-blue": "#3b82f6",
        "neon-purple": "#8b5cf6",
      },
      backgroundImage: {
        'futuristic-dark': 'linear-gradient(135deg, #0f172a, #1e1b4b)',
      },
    },
  },
  plugins: [],
}