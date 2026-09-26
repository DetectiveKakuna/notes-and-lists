import { cn } from "@/lib/utils";
import { Text, type TextProps } from "react-native";

export function AppText({ className, children, ...rest }: TextProps) {
  return (
    <Text className={cn("font-sans text-on-surface", className)} {...rest}>
      {children}
    </Text>
  );
}
