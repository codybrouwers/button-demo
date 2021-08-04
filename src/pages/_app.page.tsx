import { useEffect, useState } from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { AppProps } from "next/app";
import { TTheme, Header } from "components";

// == Types ================================================================

// == Constants ============================================================

// == Component ============================================================

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<TTheme>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (!savedTheme) return;
    setTheme(savedTheme as TTheme);
  }, []);

  const saveTheme = (newTheme: TTheme) => {
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
  };

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
      <Header setTheme={saveTheme} theme={theme} />
      <Component {...pageProps} />
    </GeistProvider>
  );
}

// == Styles ===============================================================
