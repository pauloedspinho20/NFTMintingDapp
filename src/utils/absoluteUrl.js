import getBaseUrl from 'utils/getBaseUrl';

const absoluteUrl = url => (url.startsWith('/')
  ? `${getBaseUrl()}${url}`
  : url
);

export default absoluteUrl;
