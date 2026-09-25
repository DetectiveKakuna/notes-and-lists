import { ErrorBoundaryProps, Stack } from "expo-router";
import { Text } from "react-native";
import "../global.css";

function ScreenErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <Text onPress={retry}>Try again: {error.message}</Text>;
}

export const unstable_settings = {
  screenErrorBoundary: ScreenErrorBoundary,
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
