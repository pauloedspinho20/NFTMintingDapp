// import { useCallback } from 'react';
// import { useRouter } from 'next/router';

const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

const getNetwork = hash => {
  const network = (hash || '').replace(/^#/, '') || 'eth';

  if (network === 'eth') {
    if (env === 'staging' || env === 'development') {
      return 'rinkeby';
    }
  }

  return network;
};

export const getNetworkFromHash = hash => {
  if (hash) {
    return getNetwork(hash);
  }

  if (typeof window === 'undefined') {
    return null;
  }

  return getNetwork(window.location.hash);
};

export const getHashFromNetwork = network => {
  if (![ 'eth', 'rinkeky' ].includes(network)) {
    return null;
  }

  return network;
};

const useNetworkHash = () => {
  const network = getNetwork('');

  return { network };
};

export default useNetworkHash;
