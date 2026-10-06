import { AppText } from "@/components/app-text";
import { useColors } from "@/hooks/use-colors";
import { SymbolView } from "expo-symbols";
import { Pressable, View, type ViewProps } from "react-native";

type Props = ViewProps & { onPress: () => void };

export function NewChecklistRow({ onPress, className, ...rest }: Props) {
  const colors = useColors();

  return (
    <View className={className} {...rest}>
      <Pressable
        className="flex-row justify-center p-3"
        onPress={onPress}
        role="button"
        aria-label="Add item"
      >
        <SymbolView
          name={{ android: "add_circle" }}
          tintColor={colors.onSurface}
        />
        <AppText className="pl-5">Add item</AppText>
      </Pressable>
    </View>
  );
}
