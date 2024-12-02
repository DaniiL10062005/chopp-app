/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

//import { COLORS } from "@/constants/colors";
import { useChoppTheme } from "@/shared/context/chopp-theme-context";
import { LIGHT_THEME } from "@/theme";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const COLORS = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  // light: LIGHT_THEME.colors,
  // dark: DARK_THEME.colors
};

//TODO: отрефакторить, выяснить нужен ли вообще этот компонент
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof LIGHT_THEME.colors
) {
  const theme = useChoppTheme().isDarkTheme ? "dark" : "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return COLORS[theme][colorName];
  }
}
