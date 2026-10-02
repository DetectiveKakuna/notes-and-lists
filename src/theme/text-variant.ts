import { toKebabCase } from "@/lib/strings";
import { type TextVariant, TypeScale } from "@/theme/typography";

export function getTextVariantClasses(variant: TextVariant): string {
  return `font-${TypeScale[variant].role} text-${toKebabCase(variant)}`;
}
