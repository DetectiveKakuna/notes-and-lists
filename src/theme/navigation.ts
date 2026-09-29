import { type Theme } from "expo-router";
import { type ColorSchemeName } from "react-native";
import { type ColorMode, Colors, getColorMode } from "./colors";
import { FontFamily } from "./typography";

const ThemeFonts: Theme["fonts"] = {
  regular: {
    fontFamily: FontFamily.plain,
    fontWeight: "400",
  },
  medium: {
    fontFamily: FontFamily.plain,
    fontWeight: "500",
  },
  bold: {
    fontFamily: FontFamily.plain,
    fontWeight: "600",
  },
  heavy: {
    fontFamily: FontFamily.plain,
    fontWeight: "700",
  },
};

function toNavigationTheme(mode: ColorMode): Theme {
  const colors = Colors[mode];
  return {
    dark: mode === "dark",
    colors: {
      primary: colors.primary,
      background: colors.surface,
      card: colors.surfaceContainer,
      text: colors.onSurface,
      border: colors.outlineVariant,
      notification: colors.error,
    },
    fonts: ThemeFonts,
  };
}

const NavigationThemes: Record<ColorMode, Theme> = {
  light: toNavigationTheme("light"),
  dark: toNavigationTheme("dark"),
};

export function getNavigationTheme(scheme: ColorSchemeName): Theme {
  return NavigationThemes[getColorMode(scheme)];
}
