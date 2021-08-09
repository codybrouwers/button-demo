import { useTheme as useGeistTheme, GeistUIThemes } from "@geist-ui/react";

// == Types ================================================================

export interface ITheme extends GeistUIThemes {
  type: "dark" | "light";
  isDark: boolean;
  isLight: boolean;
}

// == Constants ============================================================

// == Hook =================================================================

export const useTheme = () => {
  const theme = useGeistTheme() as ITheme;
  return { ...theme, isDark: theme.type === "dark", isLight: theme.type === "light" };
};
