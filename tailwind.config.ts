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
        midnight: "#06121a",
        storm: "#0b1f2a",
        haze: "#5d6d78",
        gold: "#38b7e6",
        aurora: "#38b7e6",
        steel: "#e5f5fb",
        ink: "#0b1f2a",
        ivory: "#ffffff",
        glacier: "#dff5fc",
        brass: "#38b7e6",
        rhododendron: "#38b7e6",
        copper: "#38b7e6",
        canvas: "#f7fbff"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        luxe: "0 20px 45px rgba(2, 8, 16, 0.28)",
        glow: "0 0 34px rgba(56, 183, 230, 0.28)"
      },
      backgroundImage: {
        "radial-fog": "radial-gradient(circle at 20% 20%, rgba(56, 183, 230, 0.18), transparent 52%)"
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
