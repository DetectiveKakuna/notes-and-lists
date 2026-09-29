import "tsx/cjs"; // must load before any .ts imports

import { type ExpoConfig } from "expo/config";
import { Colors } from "./src/theme/colors";
import { FontFamily } from "./src/theme/typography";

const config: ExpoConfig = {
  name: "Notes and Lists",
  description: "Stay organized using notes and lists!",
  slug: "notes-and-lists",
  owner: "floof-n-liz",
  version: "0.1.1",
  platforms: ["android"],
  githubUrl: "https://github.com/DetectiveKakuna/notes-and-lists",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  icon: "./assets/images/icon/icon.png",
  scheme: "notes-and-lists",
  extra: {
    eas: {
      projectId: "cb4f7784-03c0-4f4f-bec6-ce05ae9147b4",
    },
  },
  plugins: [
    "expo-router",
    [
      "expo-font",
      {
        android: {
          fonts: [
            {
              fontFamily: FontFamily.brand,
              fontDefinitions: [
                {
                  path: "./node_modules/@expo-google-fonts/space-grotesk/400Regular/SpaceGrotesk_400Regular.ttf",
                  weight: 400,
                },
              ],
            },
            {
              fontFamily: FontFamily.plain,
              fontDefinitions: [
                {
                  path: "./node_modules/@expo-google-fonts/google-sans-flex/400Regular/GoogleSansFlex_400Regular.ttf",
                  weight: 400,
                },
                {
                  path: "./node_modules/@expo-google-fonts/google-sans-flex/500Medium/GoogleSansFlex_500Medium.ttf",
                  weight: 500,
                },
                {
                  path: "./node_modules/@expo-google-fonts/google-sans-flex/600SemiBold/GoogleSansFlex_600SemiBold.ttf",
                  weight: 600,
                },
                {
                  path: "./node_modules/@expo-google-fonts/google-sans-flex/700Bold/GoogleSansFlex_700Bold.ttf",
                  weight: 700,
                },
              ],
            },
          ],
        },
      },
    ],
    [
      "expo-splash-screen",
      {
        backgroundColor: Colors.light.surface,
        image: "./assets/images/icon/icon.png",
        dark: {
          backgroundColor: Colors.dark.surface,
        },
        imageWidth: 200,
      },
    ],
  ],
  android: {
    adaptiveIcon: {
      backgroundImage: "./assets/images/icon/adaptive-icon-background.png",
      foregroundImage: "./assets/images/icon/adaptive-icon-foreground.png",
      monochromeImage: "./assets/images/icon/adaptive-icon-monochrome.png",
    },
    package: "com.floofnliz.notesandlists",
    blockedPermissions: [
      "READ_EXTERNAL_STORAGE",
      "SYSTEM_ALERT_WINDOW",
      "WRITE_EXTERNAL_STORAGE",
    ],
  },
  web: {
    bundler: "metro",
    favicon: "./assets/images/icon/favicon.png",
  },
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
