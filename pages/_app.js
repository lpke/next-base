import React, { useEffect } from "react";
import Head from "next/head";
import Wrapper from "layouts/_wrapper";
import "styles/global.scss";
import { ViewportProvider } from "lib/hooks/use-viewport";
import TagManager from "react-gtm-module";

function App({ Component, pageProps }) {
  // Initialise Google Tag Manager (adds the necessary scripts)
  useEffect(() => {
    TagManager.initialize({
      gtmId: "GTM-TCKFPTP",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Website</title> {/* Can be overwritten */}
        <link rel="icon" href="/icons/favicons/default-favicon.ico" />
      </Head>

      <ViewportProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ViewportProvider>
    </>
  );
}

export default App;