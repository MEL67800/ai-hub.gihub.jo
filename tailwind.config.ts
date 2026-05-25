import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255,255,255,0.72)",
        "glass-dark": "rgba(18,18,18,0.72)",
        primary: {
          DEFAULT: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
        },
        foreground: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          secondary: "var(--accent-secondary)",
        },
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "custom-sm": "var(--shadow-sm)",
        "custom-md": "var(--shadow-md)",
        "custom-lg": "var(--shadow-lg)",
      },
      borderRadius: {
        "custom-sm": "var(--radius-sm)",
        "custom-md": "var(--radius-md)",
        "custom-lg": "var(--radius-lg)",
        "custom-xl": "var(--radius-xl)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "shimmer": "shimmer 2s infinite",
        "slide-up-fade": "slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "progress-bar": "progressBar 2s ease-in-out forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUpFade: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        progressBar: {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
