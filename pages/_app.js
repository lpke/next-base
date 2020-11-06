import React from "react";
import Head from "next/head";
import Wrapper from "layouts/_wrapper";
import "styles/global.scss";
import { ViewportProvider } from "lib/hooks/use-viewport";

function App({ Component, pageProps }) {
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