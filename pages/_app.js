import React, { useEffect } from "react";
import Head from "next/head";
import Wrapper from "layouts/_wrapper";
import "styles/global.scss";
import { ViewportProvider } from "lib/hooks/use-viewport";
import TagManager from "react-gtm-module";

const createTitle = (pageName) => {
  const websiteName = "Website";
  return pageName ? `${websiteName} - ${pageName}` : websiteName;
};

function App({ Component, pageProps }) {
  // Initialise Google Tag Manager (adds the necessary scripts)
  useEffect(() => {
    TagManager.initialize({
      gtmId: "GTM-TCKFPTP",
    });
  }, []);

  useEffect(() => {
    console.log(Component);
    // test if this only fires once on page load
    // if so, use it to do a dataLayer.push() for gtm
    // also need to create a firing trigger for the analytics tag
    // (as currently not firing on "all pages")
  }, [Component]);

  useEffect(() => {
    console.log(pageProps);
    // this is here for testing purposes
  }, [pageProps]);

  return (
    <>
      <Head>
        <title>{createTitle(pageProps.pageName || Component.name)}</title> {/* Can be overwritten */}
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