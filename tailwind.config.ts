import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "#121212",
        white: "#F5F5F5",
        "off-white": "#F8F8F8",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
        work: ["var(--font-work-sans)"],
        mont: ["var(--font-montserrat)"],
        oxygen: ["var(--font-oxygen)"],
        oxygenMono: ["var(--font-oxygen-mono)"],
        geist: ["var(--font-geist-sans)"],
        "geist-mono": ["var(--font-geist-mono)"],
        "work-sans": ["var(--font-work-sans)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
