import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        ink: "#050505",
        paper: "#f7f7f4",
        line: "rgba(255,255,255,0.11)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,.08), 0 24px 80px rgba(0,0,0,.42)",
        soft: "0 18px 60px rgba(0,0,0,.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
