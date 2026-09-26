import { getNavigationTheme } from "@/theme/navigation";
import { ErrorBoundaryProps, Stack } from "expo-router";
import { ThemeProvider } from "expo-router/react-navigation";
import { Text, useColorScheme } from "react-native";
import "../global.css";

function ScreenErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <Text onPress={retry}>Try again: {error.message}</Text>;
}

export const unstable_settings = {
  screenErrorBoundary: ScreenErrorBoundary,
};

export default function RootLayout() {
  const currentColorScheme = useColorScheme();

  return (
    <ThemeProvider value={getNavigationTheme(currentColorScheme)}>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
