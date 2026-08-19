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
        /* Core editorial palette */
        navy: "#103b53",
        navydeep: "#0a2a3c",
        navysoft: "#17506c",
        cream: "#f6f1e7",
        creamdeep: "#ece3d3",
        sand: "#ddd1bc",
        sandstrong: "#c9b99c",
        accent: "#38b7e6",
        accentstrong: "#1795c9",

        /* Legacy aliases kept so existing markup keeps working */
        midnight: "#0a2a3c",
        storm: "#103b53",
        haze: "#8fa3ad",
        gold: "#38b7e6",
        aurora: "#38b7e6",
        steel: "#ece3d3",
        ink: "#103b53",
        ivory: "#ffffff",
        glacier: "#e4f4fb",
        brass: "#38b7e6",
        rhododendron: "#38b7e6",
        copper: "#38b7e6",
        canvas: "#f6f1e7"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      borderRadius: {
        card: "4px",
        btn: "3px"
      },
      boxShadow: {
        luxe: "0 22px 54px rgba(10, 42, 60, 0.22)",
        panel: "0 26px 60px rgba(8, 32, 45, 0.26)",
        card: "0 14px 34px rgba(16, 59, 83, 0.07)",
        glow: "0 0 34px rgba(56, 183, 230, 0.24)"
      },
      backgroundImage: {
        "radial-fog": "radial-gradient(circle at 20% 20%, rgba(56, 183, 230, 0.16), transparent 52%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(120%)" }
        },
        "marquee-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        marquee: "marquee-scroll 34s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
