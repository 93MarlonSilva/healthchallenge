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
        purple: "var(--color-purple)",
        lightpurple: "var(--color-lightpurple)",
        semidark: "var(--color-semidark)",
        dark: "var(--color-dark)",
        gray: "var(--color-gray)",
        orange: "var(--color-orange)",
      },
    },
  },
  plugins: [],
} satisfies Config;
