import Link from "next/link";

const pageName = "Home Page";
function Home() {
  return (
    <>
      <div className="container">
        <h1>NextJS Base</h1>

        <p>A base structure for web projects.</p>

        <Link href="/test">Test Page</Link>
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
            text-shadow: 0px 3px 18 px rgba(0, 0, 0, 0.1);
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

export async function getStaticProps(context) {
  return {
    props: { pageName },
  };
}