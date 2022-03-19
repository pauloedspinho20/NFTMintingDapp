import { elementType, shape } from 'prop-types';
import Head from 'next/head';

import 'scss/style.scss';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component { ...pageProps } />
  </>
);

MyApp.propTypes = {
  Component: elementType.isRequired,
  pageProps: shape({}),
};

MyApp.defaultProps = {
  pageProps: null,
};

export default MyApp;
