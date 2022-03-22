import {
  Html, Head, Main, NextScript,
} from 'next/document';

import getBaseUrl from 'utils/getBaseUrl';

// We shouldn't have any logic here, if we ever want to change the lang attribute (i.e. site
// becomes multilang), we'll need to find another way, possibly through getInitialProps();
// see https://nextjs.org/docs/advanced-features/custom-document

const Document = () => (
  <Html lang="en">
    <Head>
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href={ `${getBaseUrl()}/favicon.ico` } />
      <link rel="apple-touch-icon" sizes="180x180" href={ `${getBaseUrl()}/apple-touch-icon.png` } />
      <link rel="icon" type="image/png" sizes="32x32" href={ `${getBaseUrl()}/favicon-32x32.png` } />
      <link rel="icon" type="image/png" sizes="16x16" href={ `${getBaseUrl()}/favicon-16x16.png` } />
      <link rel="manifest" href={ `${getBaseUrl()}/manifest.json` } />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
