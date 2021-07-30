import { AppProps } from "next/app";
import "./styles.css";

// == Types ================================================================

// == Constants ============================================================

// == Component ============================================================

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// == Styles ===============================================================
