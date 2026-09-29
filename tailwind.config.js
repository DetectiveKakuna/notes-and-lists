const { Colors } = require("./src/theme/colors");
const { FontFamily, TypeScale } = require("./src/theme/typography");
const { toKebabCase } = require("./src/lib/strings");

function toVars(mode) {
  Object.fromEntries(
    Object.entries(mode).map(([k, v]) => [`--${toKebabCase(k)}`, v]),
  );
}

function toColors(mode) {
  Object.fromEntries(
    Object.keys(mode).map((k) => [toKebabCase(k), `var(--${toKebabCase(k)})`]),
  );
}

function toFontSizes(scale) {
  Object.fromEntries(
    Object.entries(scale).map(([k, v]) => [
      toKebabCase(k),
      [
        `${v.size}px`,
        { lineHeight: `${v.lineHeight}px`, fontWeight: `${v.weight}` },
      ],
    ]),
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: toColors(Colors.light),
      fontFamily: {
        plain: [FontFamily.plain, "sans-serif"],
        brand: [FontFamily.brand, "sans-serif"],
      },
      fontSize: toFontSizes(TypeScale),
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        ":root": toVars(Colors.light),
        "@media (prefers-color-scheme: dark)": { ":root": toVars(Colors.dark) },
      }),
  ],
  safelist: [
    ...Object.keys(TypeScale).map((k) => `text-${toKebabCase(k)}`),
    "font-brand",
    "font-plain",
  ],
};
