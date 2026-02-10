import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#05080f",
        storm: "#0e1724",
        haze: "#9baec5",
        gold: "#b9c9dd",
        aurora: "#7ea6d6",
        steel: "#d7e0ec"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        luxe: "0 20px 45px rgba(2, 8, 16, 0.55)",
        glow: "0 0 34px rgba(126, 166, 214, 0.38)"
      },
      backgroundImage: {
        "radial-fog": "radial-gradient(circle at 20% 20%, rgba(126, 166, 214, 0.2), transparent 52%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(120%)" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
