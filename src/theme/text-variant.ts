import { type TextVariant, TypeScale } from "@/theme/typography";
import { toKebabCase } from "@/utils/strings";

export function getTextVariantClasses(variant: TextVariant): string {
  return `font-${TypeScale[variant].role} text-${toKebabCase(variant)}`;
}
