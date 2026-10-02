import { AppTextInput } from "@/components/app-text-input";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { SymbolView } from "expo-symbols";
import { Pressable, View, type ViewProps } from "react-native";

type Props = ViewProps & {
  checked: boolean;
  text: string;
  onPressDrag: () => void;
  onToggle: () => void;
  onChangeText: (text: string) => void;
};

export function ChecklistRow({
  checked,
  className,
  text,
  onPressDrag,
  onToggle,
  onChangeText,
  ...rest
}: Props) {
  const colors = useColors();

  return (
    <View
      className={cn("flex-row", checked && "opacity-40", className)}
      {...rest}
    >
      {checked ? (
        <View className="w-12" />
      ) : (
        <Pressable onPress={onPressDrag} className="p-3">
          <SymbolView
            name={{ android: "drag_indicator" }}
            tintColor={colors.onSurface}
          />
        </Pressable>
      )}
      <Pressable
        onPress={onToggle}
        className="p-3"
        role="checkbox"
        aria-checked={checked}
        aria-label={text || "Empty item"}
      >
        <SymbolView
          name={
            checked
              ? { android: "select_check_box" }
              : { android: "check_box_outline_blank" }
          }
          tintColor={checked ? colors.onSurfaceVariant : colors.onSurface}
        />
      </Pressable>
      <AppTextInput
        value={text}
        onChangeText={onChangeText}
        className={cn(
          "flex-1 pl-2",
          checked && "text-on-surface-variant line-through",
        )}
        multiline
        scrollEnabled={false}
      />
    </View>
  );
}
