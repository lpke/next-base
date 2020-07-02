import Head from 'next/head';
import Wrapper from 'layouts/_wrapper';
import 'styles/global.scss';

class App extends React.Component {

  render() {
    let Component = this.props.Component;
    let pageProps = this.props.pageProps;

    return (
      <>

        <Head>
          <title>Website</title>
          {/*<link rel="icon" href="" />*/}
        </Head>

        <Wrapper>
          
          <Component {...pageProps} />

        </Wrapper>

      </>
    );
  }
}

export default App;