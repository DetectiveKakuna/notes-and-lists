import { getTextVariantClasses } from "@/theme/text-variant";
import { type TextVariant } from "@/theme/typography";
import { cn } from "@/utils/cn";
import { type Ref } from "react";
import { TextInput, type TextInputProps } from "react-native";

type Props = TextInputProps & { variant?: TextVariant; ref?: Ref<TextInput> };

export function AppTextInput({
  variant = "bodyLarge",
  ref,
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
      ref={ref}
      {...rest}
    />
  );
}
