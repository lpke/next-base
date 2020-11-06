import Head from "next/head";
import { useState, useEffect } from "react";
import { useViewport } from "lib/hooks/use-viewport";

function Page(props) {
  const { vWidth, vHeight } = useViewport();

  const createTitle = (pageName) => {
    const websiteName = "Website";
    return pageName ? `${websiteName} - ${pageName}` : websiteName;
  };
  
  return (
    <>
      <Head>
        <title>{createTitle(props.name)}</title> 
      </Head> 

      <div className="page-wrapper">
        {props.children}
      </div>
      
      <style jsx>{`
        .page-wrapper {
          //...
        }
      `}</style>
    </>
  );
}

export default Page;