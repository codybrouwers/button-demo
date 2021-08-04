import { Link, Grid } from "@geist-ui/react";
import { Github } from "@geist-ui/react-icons";
import { ThemeSwitch, TTheme } from "components/ThemeSwitch";

// == Types ================================================================

interface IProps {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
}

// == Constants ============================================================

// == Functions ============================================================

// == Component ============================================================

export function Header({ theme, setTheme }: IProps) {
  return (
    <Grid alignItems="center" margin={1} style={{ display: "flex", position: "fixed", right: 0, zIndex: 8 }}>
      <Link href="https://github.com/CodyBrouwers/button-demo" style={{ marginRight: 10 }} target="_blank">
        <Github />
      </Link>
      <ThemeSwitch setTheme={setTheme} theme={theme} />
    </Grid>
  );
}
// == Styles ===============================================================
