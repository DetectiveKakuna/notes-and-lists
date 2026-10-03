import { TypeScale } from "@/theme/typography";
import { toKebabCase } from "@/utils/strings";
import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const appTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: Object.keys(TypeScale).map((k) => toKebabCase(k)) },
      ],
    },
    conflictingClassGroups: {
      "font-size": ["font-weight"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return appTwMerge(clsx(inputs));
}
