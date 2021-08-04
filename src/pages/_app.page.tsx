import { useState } from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { AppProps } from "next/app";
import { ThemeSwitch, TTheme } from "components";

// == Types ================================================================

// == Constants ============================================================

// == Component ============================================================

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<TTheme>("light");

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
      <ThemeSwitch setTheme={setTheme} theme={theme} />
      <Component {...pageProps} />
    </GeistProvider>
  );
}

// == Styles ===============================================================
