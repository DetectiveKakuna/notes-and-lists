import { type Theme } from "expo-router";
import { type ColorSchemeName } from "react-native";
import { Colors } from "./colors";

export const getNavigationTheme = (
  scheme: ColorSchemeName,
): ReactNavigation.Theme => {
  return scheme === "dark" ? defaultDark : defaultLight;
};

const themeFonts: Theme["fonts"] = {
  regular: {
    fontFamily: "Google Sans",
    fontWeight: "400",
  },
  medium: {
    fontFamily: "Google Sans",
    fontWeight: "500",
  },
  bold: {
    fontFamily: "Google Sans",
    fontWeight: "600",
  },
  heavy: {
    fontFamily: "Google Sans",
    fontWeight: "700",
  },
};

const defaultLight: ReactNavigation.Theme = {
  dark: false,
  colors: {
    primary: Colors.light.primary,
    background: Colors.light.surface,
    card: Colors.light.surfaceContainer,
    text: Colors.light.onSurface,
    border: Colors.light.outlineVariant,
    notification: Colors.light.error,
  },
  fonts: themeFonts,
};

const defaultDark: ReactNavigation.Theme = {
  dark: true,
  colors: {
    primary: Colors.dark.primary,
    background: Colors.dark.surface,
    card: Colors.dark.surfaceContainer,
    text: Colors.dark.onSurface,
    border: Colors.dark.outlineVariant,
    notification: Colors.dark.error,
  },
  fonts: themeFonts,
};
