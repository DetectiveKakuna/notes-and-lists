import { Text, TextProps } from "react-native";

export default function AppText({ className, children, ...rest }: TextProps) {
  return (
    <Text className={`font-sans text-on-surface ${className ?? ""}`} {...rest}>
      {children}
    </Text>
  );
}
