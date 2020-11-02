import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

function Home() {
  useEffect(() => {
    // runs on first render only
  }, []);

  return (
    <>
      <div className="container">
        <h1>NextJS Base</h1>

        <p>A base structure for NextJS projects.</p>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </>
  );
}

export default Home;
