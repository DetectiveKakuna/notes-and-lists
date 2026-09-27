import { getColors, type ColorRoles } from "@/theme/colors";
import { useColorScheme } from "react-native";

export function useColors(): ColorRoles {
  const currentColorScheme = useColorScheme();

  return getColors(currentColorScheme);
}
