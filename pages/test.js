import Page from "layouts/page";
import Link from "next/link";

function TestPage() {
  
  return (
    <>
      <Page name="Test">
        <p>Test page.</p>

        <Link href="/">Home</Link>
      </Page>

      <style jsx>{`
        //...
      `}</style>
    </>
  );
}

export default TestPage;