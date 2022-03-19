import { string } from 'prop-types';
import Head from 'next/head';

import useRouter from 'hooks/useRouter';

import absoluteUrl from 'utils/absoluteUrl';

const Metadata = ({
  description, image, title, video,
}) => {
  const { path } = useRouter();

  return (
    <Head>
      <title>{ title }</title>
      <meta property="og:title" content={ title } />
      <meta name="twitter:title" content={ title } />

      <link rel="canonical" href={ absoluteUrl(path) } />
      <meta property="og:url" content={ absoluteUrl(path) } />

      <meta property="og:description" content={ description } />
      <meta name="twitter:description" content={ description } />
      <meta name="description" content={ description } />

      { !!image && <meta property="og:image" content={ absoluteUrl(image) } /> }
      { !!image && <meta name="twitter:image" content={ absoluteUrl(image) } /> }

      { !!video && <meta property="og:video" content={ absoluteUrl(video) } /> }
      { !!video && <meta name="twitter:player:stream" content={ absoluteUrl(video) } /> }

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

Metadata.propTypes = {
  description: string,
  image: string,
  title: string,
  video: string,
};

Metadata.defaultProps = {
  description: '',
  image: '',
  title: '',
  video: '',
};

export default Metadata;
