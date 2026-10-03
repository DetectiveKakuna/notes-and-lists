import { getTextVariantClasses } from "@/theme/text-variant";
import { type TextVariant } from "@/theme/typography";
import { cn } from "@/utils/cn";
import { Text, type TextProps } from "react-native";

type Props = TextProps & { variant?: TextVariant };

export function AppText({
  variant = "bodyLarge",
  className,
  children,
  ...rest
}: Props) {
  return (
    <Text
      className={cn(
        getTextVariantClasses(variant),
        "text-on-surface",
        className,
      )}
      {...rest}
    >
      {children}
    </Text>
  );
}
