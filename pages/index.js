import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

function Home() {
  useEffect(() => {
    // runs on first render only
  }, []);

  return (
    <>
      <div className="background">
        <div className="container">
          <h1>NextJS Base</h1>

          <p>A base structure for web projects.</p>
        </div>
      </div>

      <style jsx>{`
        @import "styles/mixins.scss";

        .background {
          background: url("images/retro-porche.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0% 50%;
          width: 100vw;
          height: 100vh;
        }

        .container {
          @include flex(column);
          background: rgba(0,0,0,0.72);
          width: 100%;
          height: 100%;

          h1 {
            margin-top: 0;
            font-size: 80px;
            text-shadow: 0px 0px 10px rgba(0,0,0,0.3);
          }

          p {
            color: var(--light-text);
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}

export default Home;
