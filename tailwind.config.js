const { Colors } = require("./src/theme/colors");

const toKebabCase = (camelCase) =>
  camelCase.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

const toVars = (set) =>
  Object.fromEntries(
    Object.entries(set).map(([k, v]) => [`--${toKebabCase(k)}`, v]),
  );

const toColors = (set) =>
  Object.fromEntries(
    Object.keys(set).map((k) => [toKebabCase(k), `var(--${toKebabCase(k)})`]),
  );

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: toColors(Colors.light),
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        ":root": toVars(Colors.light),
        "@media (prefers-color-scheme: dark)": { ":root": toVars(Colors.dark) },
      }),
  ],
};
