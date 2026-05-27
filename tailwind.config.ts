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
        paper: "#f8f8f5",
        ink: "#181817",
        muted: "#6f6f68",
        line: "#e4e2dc",
        accent: "#2f6f5e"
      },
      fontFamily: {
        sans: ["Geist", "Satoshi", "Aptos", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "SFMono-Regular", "ui-monospace", "monospace"]
      },
      boxShadow: {
        soft: "0 24px 60px -42px rgba(24, 24, 23, 0.32)"
      },
      keyframes: {
        "quiet-rise": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        breathe: {
          "0%, 100%": { opacity: "0.48", transform: "scale(0.92)" },
          "50%": { opacity: "1", transform: "scale(1)" }
        }
      },
      animation: {
        "quiet-rise": "quiet-rise 680ms cubic-bezier(0.16, 1, 0.3, 1) both",
        scan: "scan 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        breathe: "breathe 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite"
      }
    }
  },
  plugins: []
};

export default config;
