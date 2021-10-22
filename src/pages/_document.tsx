import { CssBaseline } from "@geist-ui/react";
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

// == Types ================================================================

// == Constants ============================================================

// == Component ============================================================

export default class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = CssBaseline.flush();

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta content="yes" name="apple-mobile-web-app-capable" />
        </Head>
        <body>
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  if (!window.localStorage) return;

                  // Apply saved theme background on first paint
                  if (window.localStorage.getItem('theme') === 'dark') {
                    document.documentElement.style.background = '#000';
                    document.body.style.background = '#000';
                  };
                  // Remove theme background on page load so React can take over themeing
                  window.addEventListener('load', (event) => {
                    document.documentElement.style.background = null;
                    document.body.style.background = null;
                  });
                })()
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// == Styles ===============================================================
