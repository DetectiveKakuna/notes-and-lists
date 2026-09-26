import { type ExpoConfig } from "expo/config";
import "tsx/cjs"; // must load before any .ts imports
import { Colors } from "./src/theme/colors";

const config: ExpoConfig = {
  name: "Notes and Lists",
  description: "Stay organized using notes and lists!",
  slug: "notes-and-lists",
  owner: "floof-n-liz",
  version: "0.0.1",
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
              fontFamily: "Google Sans",
              fontDefinitions: [
                {
                  path: "./node_modules/@expo-google-fonts/google-sans/400Regular/GoogleSans_400Regular.ttf",
                  weight: 400,
                },
                {
                  path: "./node_modules/@expo-google-fonts/google-sans/500Medium/GoogleSans_500Medium.ttf",
                  weight: 500,
                },
                {
                  path: "./node_modules/@expo-google-fonts/google-sans/600SemiBold/GoogleSans_600SemiBold.ttf",
                  weight: 600,
                },
                {
                  path: "./node_modules/@expo-google-fonts/google-sans/700Bold/GoogleSans_700Bold.ttf",
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
