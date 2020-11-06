import { useState, useEffect } from "react";

function Home() {
  useEffect(() => {
    // runs on first render only
  }, []);

  // @refresh reset
  return (
    <>
      <div className="container">
        <h1>NextJS Base</h1>

        <p>A base structure for web projects.</p>

      </div>

      <style jsx>{`
        @import "styles/mixins.scss";

        .container {
          @include flex(column);
          width: 100vw;
          height: 100vh;

          h1 {
            margin-top: 0;
            margin-bottom: 26px;
            font-size: 80px;
            text-shadow: 0px 3px 18px rgba(0,0,0,0.1);
          }

          p {
            font-size: 25px;
          }
        }
      `}</style>
    </>
  );
}

export default Home;
