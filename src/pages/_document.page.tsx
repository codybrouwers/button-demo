import Document, { Html, Head, Main, NextScript } from "next/document";

// == Types ================================================================

// == Constants ============================================================

// == Component ============================================================

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  if (!window.localStorage) return;

                  if (window.localStorage.getItem('theme') === 'dark') {
                    document.documentElement.style.background = '#000';
                    document.body.style.background = '#000';
                  };
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
