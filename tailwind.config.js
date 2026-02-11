/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        accent2: "var(--accent-2)",
        card: "var(--card)",
        border: "var(--border)",
        glow: "var(--glow)"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(15, 23, 42, 0.12)",
        halo: "0 0 0 1px rgba(15, 23, 42, 0.08), 0 30px 80px rgba(15, 23, 42, 0.18)"
      },
      backgroundImage: {
        "hero-grid": "linear-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px)",
        "ambient": "radial-gradient(circle at 10% 10%, rgba(123, 167, 130, 0.22), transparent 45%), radial-gradient(circle at 90% 0%, rgba(15, 118, 110, 0.18), transparent 40%), radial-gradient(circle at 70% 80%, rgba(14, 116, 144, 0.16), transparent 45%)"
      }
    }
  },
  plugins: []
};
