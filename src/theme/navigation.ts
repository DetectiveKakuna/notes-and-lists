import { type Theme } from "expo-router";
import { type ColorSchemeName } from "react-native";
import { type ColorMode, Colors, getColorMode } from "./colors";

const themeFonts: Theme["fonts"] = {
  regular: {
    fontFamily: "Google Sans Flex",
    fontWeight: "400",
  },
  medium: {
    fontFamily: "Google Sans Flex",
    fontWeight: "500",
  },
  bold: {
    fontFamily: "Google Sans Flex",
    fontWeight: "600",
  },
  heavy: {
    fontFamily: "Google Sans Flex",
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
    fonts: themeFonts,
  };
}

const navigationThemes: Record<ColorMode, Theme> = {
  light: toNavigationTheme("light"),
  dark: toNavigationTheme("dark"),
};

export function getNavigationTheme(scheme: ColorSchemeName): Theme {
  return navigationThemes[getColorMode(scheme)];
}
