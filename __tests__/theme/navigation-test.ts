import { type ColorMode, Colors } from "@/theme/colors";
import { getNavigationTheme } from "@/theme/navigation";
import { type ColorSchemeName } from "react-native";

describe("getNavigationTheme", () => {
  test.each<[ColorSchemeName, boolean]>([
    ["dark", true],
    ["light", false],
    ["unspecified", true],
  ])("getNavigationTheme(%s).dark is %s", (scheme, expected) => {
    expect(getNavigationTheme(scheme).dark).toBe(expected);
  });

  test.each<[ColorMode]>([["light"], ["dark"]])(
    "maps the %s color roles to navigation colors",
    (mode) => {
      const colors = Colors[mode];

      expect(getNavigationTheme(mode).colors).toEqual({
        primary: colors.primary,
        background: colors.surface,
        card: colors.surfaceContainer,
        text: colors.onSurface,
        border: colors.outlineVariant,
        notification: colors.error,
      });
    },
  );

  test("returns the same theme object on every call", () => {
    expect(getNavigationTheme("dark")).toBe(getNavigationTheme("dark"));
    expect(getNavigationTheme("light")).toBe(getNavigationTheme("light"));
  });
});
