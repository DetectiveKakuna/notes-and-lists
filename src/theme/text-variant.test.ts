import { getTextVariantClasses } from "@/theme/text-variant";
import { type TextVariant, TypeScale } from "@/theme/typography";

describe("getTextVariantClasses", () => {
  test.each<[TextVariant, string]>([
    ["displayLarge", "font-brand text-display-large"],
    ["headlineSmall", "font-brand text-headline-small"],
    ["titleMedium", "font-plain text-title-medium"],
    ["bodyLarge", "font-plain text-body-large"],
    ["labelSmall", "font-plain text-label-small"],
  ])("%s uses %s", (variant, expected) => {
    expect(getTextVariantClasses(variant)).toBe(expected);
  });

  test.each(Object.keys(TypeScale) as TextVariant[])(
    "%s uses the font role from the type scale",
    (variant) => {
      expect(getTextVariantClasses(variant)).toContain(
        `font-${TypeScale[variant].role}`,
      );
    },
  );
});
