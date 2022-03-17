import { useEffect, useMemo } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

import useNetworkHash, { getNetworkFromHash, getHashFromNetwork } from 'hooks/useNetworkHash';

import bepro from 'lib/bepro';

const { getGlobalState, setGlobalState, useGlobalState } = createGlobalState({ bepro: { ...bepro } });

export const getAddress = () => getGlobalState('bepro').address;

export const getETHBalance = () => getGlobalState('bepro').ethBalance;

let latest;

export const updateConnection = async () => {
  try {
    // Trick to ensure only the latest call to this method updates the state, avoiding race
    // conditions.
    const here = {};
    latest = here;

    const networkWanted = getNetworkFromHash();

    const [ address, networkActive, ethBalance ] = await Promise.all([
      bepro.getAddress(),
      bepro.getCurrentNetwork(),
      bepro.getETHBalance(),
    ]);

    // It's safe to discard previous calls to this method.
    if (latest !== here) {
      return;
    }

    const state = getGlobalState('bepro');
    if (
      state.address !== address
      || state.networkActive !== networkActive
      || state.networkWanted !== networkWanted
    ) {
      setGlobalState('bepro', {
        ...state,
        address: networkActive === networkWanted ? address : null,
        networkActive,
        networkWanted,
        ethBalance,
      });
    }
  }
  catch (ex) {
    // If this throws we're not connected, it's safe to ignore.
    // eslint-disable-next-line no-console
    console.error(ex);

    setGlobalState('bepro', {
      ...getGlobalState('bepro'),
      address: null,
      networkActive: null,
    });
  }
};

const onNetworkChange = async (...args) => {
  const newNetwork = await bepro.getCurrentNetwork();
  const hash = getHashFromNetwork(newNetwork);
  if (hash) {
    window.location.hash = `#${hash}`;
  }

  updateConnection(...args);
};

// Metamask extension injects the browser object on page initialization if it exists
updateConnection();

bepro.on('accountsChanged', updateConnection);
bepro.on('chainChanged', onNetworkChange);
bepro.on('connect', updateConnection);
bepro.on('networkChanged', onNetworkChange);
bepro.on('disconnect', error => {
  // eslint-disable-next-line no-console
  console.error({ error });

  setGlobalState('bepro', {
    ...getGlobalState('bepro'),
    address: null,
    networkActive: null,
  });
});

const useBepro = () => {
  const { network } = useNetworkHash();
  const [ state ] = useGlobalState('bepro');

  const { web3Connection } = useMemo(() => {
    if (network === 'rinkeby') {
      return {
        web3Connection: process.env.REACT_APP_RPC_RINKEBY,
      };
    }

    return {
      web3Connection: process.env.REACT_APP_RPC_ETHEREUM,
    };
  }, [ network ]);

  // console.log('useBepro 1', network, state, web3Connection);

  useEffect(() => {
    // We can initialize multiple times on many components, our bepro lib knows it should only open
    // one connection.
    // console.log('useBepro 2', web3Connection);

    bepro.setParams({
      web3Connection,
    });
  }, [ web3Connection ]);

  return state;
};
export default useBepro;
