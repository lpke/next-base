import Link from "next/link";

const pageName = "Test Page";
function TestPage() {
  
  return (
    <>
      <p>Test page.</p>

      <Link href="/">Home</Link>

      <style jsx>{`
        //...
      `}</style>
    </>
  );
}

export default TestPage;

export async function getStaticProps(context) {
  return {
    props: { pageName },
  };
}