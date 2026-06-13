import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          DEFAULT: "#2563eb",
        },
        secondary: {
          50: "#e8edf5",
          100: "#c5d0e6",
          200: "#8fa2c9",
          300: "#5a74ad",
          400: "#2d4c93",
          500: "#1a3578",
          600: "#0f1e3d",
          700: "#0b1830",
          800: "#071224",
          900: "#030b18",
          DEFAULT: "#0f1e3d",
        },
        "accent-green": {
          50: "#ecfdf5",
          100: "#d1fae5",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          DEFAULT: "#10b981",
        },
        "accent-violet": {
          50: "#f5f3ff",
          100: "#ede9fe",
          400: "#a78bfa",
          500: "#7c3aed",
          600: "#6d28d9",
          DEFAULT: "#7c3aed",
        },
        "accent-orange": {
          50: "#fffbeb",
          100: "#fef3c7",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          DEFAULT: "#f59e0b",
        },
        "accent-rose": {
          50: "#fdf2f8",
          100: "#fce7f3",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          DEFAULT: "#ec4899",
        },
        "accent-cyan": {
          50: "#ecfeff",
          100: "#cffafe",
          400: "#22d3ee",
          500: "#06b6d4",
          DEFAULT: "#06b6d4",
        },
        "accent-indigo": {
          50: "#eef2ff",
          100: "#e0e7ff",
          400: "#818cf8",
          500: "#6366f1",
          DEFAULT: "#6366f1",
        },
        surface: {
          DEFAULT: "#f8fafc",
          dark: "#f1f5f9",
        },
        background: {
          DEFAULT: "#eef2ff",
          card: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)",
        "card-hover":
          "0 10px 25px -3px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.08)",
        sidebar: "2px 0 20px rgba(15,30,61,0.15)",
        glow: "0 0 30px rgba(37,99,235,0.25)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #0f1e3d 0%, #1a3578 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #0f1e3d 0%, #1a3578 40%, #2563eb 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
