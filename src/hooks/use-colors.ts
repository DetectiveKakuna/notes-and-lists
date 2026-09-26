import { Colors, MD3ColorsType } from "@/theme/colors";
import { useColorScheme } from "react-native";

export default function useColors(): MD3ColorsType {
  const currentColorScheme = useColorScheme();

  return currentColorScheme === "dark" ? Colors.dark : Colors.light;
}
