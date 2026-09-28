import { toKebabCase } from "@/lib/strings";
import { cn } from "@/lib/utils";
import { type TextVariant, TypeScale } from "@/theme/typography";
import { Text, type TextProps } from "react-native";

type Props = TextProps & { variant?: TextVariant };

export function getTextVariantClasses(variant: TextVariant): string {
  return `font-${TypeScale[variant].role} text-${toKebabCase(variant)}`;
}

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
