import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const env = process.env.REACT_APP_ENVIRONMENT;

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
  const { hash, pathname, search } = useLocation();
  const { push } = useHistory();

  const network = getNetwork(hash);

  const setHash = useCallback(
    next => push(`${pathname}${search}#${next}`),
    [ pathname, push, search ],
  );

  return { network, setHash };
};

export default useNetworkHash;
