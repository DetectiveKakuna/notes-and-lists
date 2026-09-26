import AppText from "@/components/app-text";
import useColors from "@/hooks/use-colors";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const colors = useColors();

  return (
    <View>
      <ActivityIndicator size="large" color={colors.primary} />
      <AppText>This is Google Sans Flex.</AppText>
    </View>
  );
}
