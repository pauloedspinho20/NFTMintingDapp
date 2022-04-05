import { useEffect } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

import useBepro from 'hooks/useBepro';
import useNetworkHash from 'hooks/useNetworkHash';

import bepro from 'lib/bepro';

import { chains } from 'config';

const getPoolsDefaults = () => ({
  collection: null,
});

const { getGlobalState, setGlobalState, useGlobalState } = createGlobalState({
  collectionData: getPoolsDefaults(),
});

let latest;
let updateTimeout;

export const updateContracts = async () => {
  if (updateTimeout) {
    clearTimeout(updateTimeout);
    updateTimeout = null;
  }

  // Trick to ensure only the latest call to this method updates the state, avoiding race
  // conditions.
  const here = {};
  latest = here;

  const collectionData = getGlobalState('collectionData');

  // It's safe to discard previous calls to this method.
  if (latest !== here) {
    return;
  }

  const collection = await bepro.getCollection();

  setGlobalState('collectionData', {
    ...collectionData,
    collection,
  });

  // Pools info is automatically updated regularly.
  //  updateTimeout = setTimeout(updateContracts, [ ...newPools.values() ].some(pool => pool.operation) ? 4000 : 60000);
};

const setOperation = operation => {
  const collectionData = getGlobalState('collectionData');
  const { collection } = collectionData;

  collection.operation = operation;

  setGlobalState('collectionData', {
    ...collectionData,
    collection,
    operation,
  });

  updateContracts();
};

const updateBasePools = async ({ network }) => {
  setGlobalState('collectionData', {
    ...getGlobalState('collectionData'),
    network,

  });

  updateContracts();
};

bepro.on('accountsChanged', updateContracts);
bepro.on('connect', updateContracts);
bepro.on('disconnect', error => {
  // eslint-disable-next-line no-console
  console.error({ error });

  setGlobalState('collectionData', getPoolsDefaults());
  updateContracts();
});
bepro.on('chainChanged', chainId => {
  updateBasePools({
    network: chains.find(chain => chain.chainId === chainId)?.slug,
  });
});

const useContracts = contractAddress => {
  const [ collectionData ] = useGlobalState('collectionData');
  const { networkActive, getCollection } = useBepro();
  const { network } = useNetworkHash();
  const actualNetwork = networkActive || network;

  useEffect(() => {
    updateBasePools({
      network: actualNetwork,
      collection: getCollection(),
    });
  }, [ actualNetwork, getCollection ]);

  if (contractAddress) {
    return collectionData?.collection || {};
  }

  return {
    ...collectionData,
    setOperation,
  };
};

export default useContracts;
