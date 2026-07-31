import type { Config } from "tailwindcss";
import tokens from "./styles/tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#1B1B1B",
        "brand-charcoal": "#14213D",
        "brand-copper": "#B68F40",
        "brand-copper-light": "#B68F40",
        "brand-gold": "#B68F40",
        "brand-gold-dark": "#B68F40",
        paper: tokens.paper,
        ink: tokens.ink,
        heading: tokens.heading,
        primary: tokens.primaryBg,
        primaryfg: tokens.primaryFg,
        secondary: tokens.secondaryBg,
        secondaryfg: tokens.secondaryFg,
        outline: tokens.outline,
        panel: tokens.panel,
        olive: {
          DEFAULT: "#5D5838",
          light: "#7A7654",
          dark: "#454326",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      letterSpacing: {
        luxury: "0.2em",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;

