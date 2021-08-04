import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { AppProps } from "next/app";
// import "./styles.css";

// == Types ================================================================

// == Constants ============================================================

// == Component ============================================================

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}

// == Styles ===============================================================
