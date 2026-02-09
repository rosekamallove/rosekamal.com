import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content.ts"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "IBM Plex Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace"
        ]
      },
      colors: {
        background: "var(--bg)",
        text: "var(--text)",
        heading: "var(--heading)",
        accent: "var(--accent)"
      }
    }
  },
  plugins: []
};

export default config;
