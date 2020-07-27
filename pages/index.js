import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function Home() {

  useEffect(() => {
    // runs on first render only
  }, []);

  return (
    <>

      <h1>NextJS Base</h1>
      
      <style jsx>{`
        //...
      `}</style>

    </>
  );
}

export default Home;