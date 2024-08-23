/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from "@react-navigation/native";
import { COLORS } from "@/constants/Colors";
import { LIGHT_THEME } from "@/theme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof LIGHT_THEME.colors,
) {
  const theme = useTheme().dark ? "dark" : "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return COLORS[theme][colorName];
  }
}
