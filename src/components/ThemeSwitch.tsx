import { Select, Text, Grid } from "@geist-ui/react";
import { Sun, Moon } from "@geist-ui/react-icons";

// == Types ================================================================

export type TTheme = "dark" | "light";

interface IProps {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
}

// == Constants ============================================================

// == Functions ============================================================

// == Component ============================================================

export function ThemeSwitch({ theme, setTheme }: IProps) {
  return (
    <Grid margin={1} style={{ position: "fixed", right: 0, zIndex: 8 }}>
      <Select
        pure
        icon={theme === "light" ? Sun : Moon}
        value={theme}
        onChange={(selectedTheme) => setTheme(selectedTheme as TTheme)}
      >
        <Select.Option value="dark">
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Moon size={20} />
            <Text style={{ marginLeft: 10 }}>Dark</Text>
          </div>
        </Select.Option>
        <Select.Option value="light">
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Sun size={20} />
            <Text style={{ marginLeft: 10 }}>Light</Text>
          </div>
        </Select.Option>
      </Select>
    </Grid>
  );
}
// == Styles ===============================================================
