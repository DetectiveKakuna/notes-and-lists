import { AppText } from "@/components/app-text";
import { getNavigationTheme } from "@/theme/navigation";
import { type ErrorBoundaryProps, Stack } from "expo-router";
import { ThemeProvider } from "expo-router/react-navigation";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../global.css";

function ScreenErrorBoundary({ retry }: ErrorBoundaryProps) {
  return (
    <AppText onPress={retry}>TODO: Implement real error boundary.</AppText>
  );
}

export const unstable_settings = {
  screenErrorBoundary: ScreenErrorBoundary,
};

export default function RootLayout() {
  const currentColorScheme = useColorScheme();

  return (
    <ThemeProvider value={getNavigationTheme(currentColorScheme)}>
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <Stack>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
      </KeyboardProvider>
    </ThemeProvider>
  );
}
