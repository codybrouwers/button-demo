import { useEffect } from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { TTheme, Header } from "@components";
import { useStateWithCallback } from "@hooks";

// == Types ================================================================

// == Constants ============================================================

const DEFAULT_THEME: TTheme = "light";

// == Component ============================================================

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useStateWithCallback(DEFAULT_THEME, (updatedTheme) => {
    window.localStorage.setItem("theme", updatedTheme);
  });

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (!savedTheme) return;

    setTheme(savedTheme as TTheme);
  }, [setTheme]);

  return (
    <>
      <Head>
        <meta
          content="width=device-width, height=device-height, initial-scale=1.0,user-scalable=no, shrink-to-fit=yes"
          name="viewport"
        />
      </Head>
      <GeistProvider themeType={theme}>
        <CssBaseline />
        <Header setTheme={setTheme} theme={theme} />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  );
}

// == Styles ===============================================================
