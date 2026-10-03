import { AppText } from "@/components/app-text";
import { type HexColor } from "@/theme/colors";
import { SymbolView } from "expo-symbols";
import { Pressable, View, type ViewProps } from "react-native";

type Props = ViewProps & {
  label: string;
  color: HexColor;
  isExpanded?: boolean;
  onToggle: () => void;
};

export function Collapsible({
  label,
  color,
  isExpanded = false,
  onToggle,
  className,
  children,
  ...rest
}: Props) {
  return (
    <View className={className} {...rest}>
      <Pressable
        className="flex-row p-3"
        onPress={onToggle}
        role="button"
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
          <SymbolView
            name={{ android: "keyboard_arrow_down" }}
            tintColor={color}
          />
        ) : (
          <SymbolView
            name={{ android: "keyboard_arrow_right" }}
            tintColor={color}
          />
        )}
        <AppText variant="bodyLarge" className="ml-7" style={{ color: color }}>
          {label}
        </AppText>
      </Pressable>
      {isExpanded && children}
    </View>
  );
}
