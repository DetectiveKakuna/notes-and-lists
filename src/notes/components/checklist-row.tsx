import { AppTextInput } from "@/components/app-text-input";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/utils/cn";
import { SymbolView } from "expo-symbols";
import { type Ref, useState } from "react";
import { Pressable, TextInput, View, type ViewProps } from "react-native";

type Props = ViewProps & {
  checked: boolean;
  text: string;
  inputRef?: Ref<TextInput>;
  onPressDrag: () => void;
  onToggleCheck: () => void;
  onChangeText: (text: string) => void;
  onPressDelete: () => void;
};

export function ChecklistRow({
  checked,
  className,
  text,
  inputRef,
  onPressDrag,
  onToggleCheck,
  onChangeText,
  onPressDelete,
  ...rest
}: Props) {
  const colors = useColors();
  const [isFocused, setIsFocused] = useState(false);

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
        onPress={onToggleCheck}
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
      />
      {isFocused ? (
        <Pressable
          onPress={onPressDelete}
          className="p-3"
          role="button"
          aria-label="Delete item"
        >
          <SymbolView
            name={{ android: "close" }}
            tintColor={colors.onSurface}
          />
        </Pressable>
      ) : (
        <View className="w-12" />
      )}
    </View>
  );
}
