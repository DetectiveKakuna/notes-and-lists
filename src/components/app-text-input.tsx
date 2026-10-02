import { cn } from "@/lib/utils";
import { getTextVariantClasses } from "@/theme/text-variant";
import { type TextVariant } from "@/theme/typography";
import { TextInput, type TextInputProps } from "react-native";

type Props = TextInputProps & { variant?: TextVariant };

export function AppTextInput({
  variant = "bodyLarge",
  className,
  ...rest
}: Props) {
  return (
    <TextInput
      className={cn(
        getTextVariantClasses(variant),
        "text-on-surface",
        className,
      )}
      {...rest}
    />
  );
}
