import {
  type ColorMode,
  type ColorRoles,
  Colors,
  getColorMode,
  getColors,
} from "@/theme/colors";
import { type ColorSchemeName } from "react-native";

describe("Colors", () => {
  const rows = (Object.keys(Colors) as ColorMode[]).flatMap((mode) =>
    (Object.keys(Colors[mode]) as (keyof ColorRoles)[]).map(
      (role) => [mode, role] as [ColorMode, keyof ColorRoles],
    ),
  );

  test.each(rows)("%s mode's %s color has a valid hex code", (mode, role) => {
    const re = /^#[\dA-F]{6}$/i;

    expect(Colors[mode][role]).toMatch(re);
  });
});

describe("getColorMode", () => {
  test.each<[ColorSchemeName, ColorMode]>([
    ["dark", "dark"],
    ["light", "light"],
    ["unspecified", "light"],
  ])("getColorMode(%s) is %s", (scheme, expected) => {
    expect(getColorMode(scheme)).toBe(expected);
  });
});

describe("getColors", () => {
  test.each<[ColorSchemeName, ColorMode]>([
    ["dark", "dark"],
    ["light", "light"],
    ["unspecified", "light"],
  ])("getColors(%s) returns %s colors", (scheme, expectedMode) => {
    expect(getColors(scheme)).toBe(Colors[expectedMode]);
  });
});
