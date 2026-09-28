export type FontRole = "brand" | "plain";

export const FontFamily: Record<FontRole, string> = {
  brand: "Google Sans Flex",
  plain: "Google Sans Flex",
};

type TextVariantStyles = "display" | "headline" | "title" | "body" | "label";
type TextVariantSizes = "Small" | "Medium" | "Large";

export type TextVariant = `${TextVariantStyles}${TextVariantSizes}`;

type FontWeight = 400 | 500;

type TypeStyle = {
  size: number;
  lineHeight: number;
  weight: FontWeight;
  role: FontRole;
};

export const TypeScale: Record<TextVariant, TypeStyle> = {
  displayLarge: { size: 57, lineHeight: 64, weight: 400, role: "brand" },
  displayMedium: { size: 45, lineHeight: 52, weight: 400, role: "brand" },
  displaySmall: { size: 36, lineHeight: 44, weight: 400, role: "brand" },
  headlineLarge: { size: 32, lineHeight: 40, weight: 400, role: "brand" },
  headlineMedium: { size: 28, lineHeight: 36, weight: 400, role: "brand" },
  headlineSmall: { size: 24, lineHeight: 32, weight: 400, role: "brand" },
  titleLarge: { size: 22, lineHeight: 28, weight: 400, role: "plain" },
  titleMedium: { size: 16, lineHeight: 24, weight: 500, role: "plain" },
  titleSmall: { size: 14, lineHeight: 20, weight: 500, role: "plain" },
  bodyLarge: { size: 16, lineHeight: 24, weight: 400, role: "plain" },
  bodyMedium: { size: 14, lineHeight: 20, weight: 400, role: "plain" },
  bodySmall: { size: 12, lineHeight: 16, weight: 400, role: "plain" },
  labelLarge: { size: 14, lineHeight: 20, weight: 500, role: "plain" },
  labelMedium: { size: 12, lineHeight: 16, weight: 500, role: "plain" },
  labelSmall: { size: 11, lineHeight: 16, weight: 500, role: "plain" },
};
