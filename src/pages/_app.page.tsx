import { AppProps } from "next/dist/next-server/lib/router/router";
import "./styles.css";

// == Types ================================================================

// == Constants ============================================================

// == Component ============================================================

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// == Styles ===============================================================
