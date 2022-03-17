import { useEffect, useMemo } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import { useLocation } from 'react-router-dom';

import useBepro, { getAddress } from 'hooks/useBepro';
import useNetworkHash, { getNetworkFromHash } from 'hooks/useNetworkHash';

import useMintConfig, { getMintConfig } from 'hooks/useMintConfig';

import bepro from 'lib/bepro';

import { chains } from 'config';

const getPoolsDefaults = () => ({
  info: {
    averageAPR: { title: 'AVERAGE APR' },
    daysStaked: { title: 'DAYS STAKED' },
    fetched: false,
    initialStakingSupply: { title: 'INITIAL STAKING SUPPLY' },
    openPools: { title: 'OPEN POOLS' },
    remainingStakingSupply: { title: 'REMAINING STAKING SUPPLY' },
    stakingFevrBalance: { title: 'MY STAKING BALANCE' },
    totalDeposited: { title: 'TOTAL DEPOSITED' },
    totalFevrLocked: { title: 'TOTAL LOCKED' },
    totalFevrPaid: { title: 'TOTAL PAID' },
    userFevrBalance: { title: 'MY BALANCE' },
  },
  collections: new Map(),
});

const { getGlobalState, setGlobalState, useGlobalState } = createGlobalState({
  poolsData: getPoolsDefaults(),
});

let latest;
let updateTimeout;

const getPoolIndex = (pool, contractAddress, actualNetwork) => {
  const network = actualNetwork || getNetworkFromHash();
  const poolLowerCaseName = (contractAddress || pool?.contractAddress || pool?.contractAddress)?.toLowerCase();
  const poolProductId = pool?.productId || pool;

  if (!network || !poolLowerCaseName || !poolProductId) {
    return null;
  }

  return `${network}-${poolLowerCaseName}-${poolProductId}`;
};

const getEnabledProducts = async collections => {
  if (!collections) {
    return [];
  }

  const allPools = Object.values(collections).reduce((acc, cur) => [ ...acc, ...cur ], []);
  const enabledPools = [];

  await Promise.all(allPools.map(async pool => {
    if (pool.enabled) {
      const product = await bepro.getCollection(pool);
      if (product) {
        enabledPools.push(product);
      }
    }
  }));

  return enabledPools;
};

const selectCurrentProducts = (collections, products) => products?.filter(
  product => collections.has(getPoolIndex(product, product.contractAddress, product.network)),
);

export const updateContracts = async () => {
  if (updateTimeout) {
    clearTimeout(updateTimeout);
    updateTimeout = null;
  }

  // Trick to ensure only the latest call to this method updates the state, avoiding race
  // conditions.
  const here = {};
  latest = here;

  const poolsData = getGlobalState('poolsData');
  const { info, collections, type } = poolsData;
  if (!collections?.size) {
    return;
  }

  const network = getNetworkFromHash();
  const mintConfig = getMintConfig() || {};
  const stakingPools = mintConfig?.[network];
  const products = await getEnabledProducts(stakingPools?.staking_pools);
  const data = selectCurrentProducts(collections, products);

  const address = getAddress();
  const balanceOfNFTS = address && network === 'bsc' ? await bepro.getBalanceOfNFTS() : 0;

  let balance;
  if (address) {
    if (type === 'lp_tokens') {
      balance = await bepro?.getLpTokenBalance(data[0]?.tokenAddress);
    }
    else {
      balance = await bepro?.getBalance();
    }
  }
  else { balance = 0; }

  // It's safe to discard previous calls to this method.
  if (latest !== here) {
    return;
  }

  const newInfo = { ...info };
  const newPools = new Map([ ...collections ]);

  let averageAPR = 0;
  let initialStakingSupply = 0;
  let totalFevrLocked = 0;
  let stakingFevrBalance = 0;
  let totalFevrPaid = 0;
  let daysStaked = 0;
  const mySubscriptionsDates = [];

  data?.forEach(pool => {
    if (!pool?._id) {
      return;
    }

    pool.totalMaxAmount = Number(pool.totalMaxAmount);
    pool.totalFEVREarned = Number(pool.totalFEVREarned);
    pool.currentAmount = Number(pool.currentAmount);
    pool.balanceOfNFTS = balanceOfNFTS !== null ? Number(balanceOfNFTS) : null;
    const APR = parseInt(pool.APR, 10);
    averageAPR += APR;
    initialStakingSupply += Number(pool.totalMaxAmount);
    totalFevrLocked += Number(pool.currentAmount);
    stakingFevrBalance += Number(pool.myTotalStaked);
    totalFevrPaid += Number(pool.totalFEVREarned);

    if (pool.mySubscriptionsDates.length > 0) {
      for (let i = 0; i < pool.mySubscriptionsDates.length; i++) {
        mySubscriptionsDates.push(pool.mySubscriptionsDates[i]);
      }
    }

    const poolIndex = getPoolIndex(pool);
    const savedPool = collections.get(poolIndex);

    newPools.set(poolIndex, {
      ...savedPool,
      ...pool,

      apr: APR,
      fetched: true,
      operation: savedPool?.mySubscriptions?.length === pool?.mySubscriptions?.length ? savedPool?.operation : null,
    });
  });

  if (mySubscriptionsDates.length > 0) {
    mySubscriptionsDates.sort((a, b) => Date.parse(a) - Date.parse(b)); // Sort by oldest date
    daysStaked = Math.round((new Date() - mySubscriptionsDates[0]) / (1000 * 60 * 60 * 24));
  }

  newInfo.averageAPR.value = `${Math.round(averageAPR / newPools.size * 1000) / 1000}%`;
  newInfo.initialStakingSupply.value = initialStakingSupply;
  newInfo.openPools.value = [ ...newPools.values() ].filter(pool => pool.active).length;
  newInfo.remainingStakingSupply.value = initialStakingSupply - totalFevrLocked;
  newInfo.stakingFevrBalance.value = address ? stakingFevrBalance : 0;
  newInfo.totalFevrLocked.value = totalFevrLocked;
  newInfo.totalFevrPaid.value = totalFevrPaid;
  newInfo.userFevrBalance.value = balance;
  newInfo.totalDeposited.value = totalFevrLocked;
  newInfo.daysStaked.value = daysStaked;

  setGlobalState('poolsData', {
    ...poolsData,
    info: newInfo,
    collections: newPools,
  });

  // Pools info is automatically updated regularly.
  updateTimeout = setTimeout(updateContracts, [ ...newPools.values() ].some(pool => pool.operation) ? 4000 : 60000);
};

const setOperation = (poolId, contractAddress, operation) => {
  const poolsData = getGlobalState('poolsData');
  const { collections } = poolsData;

  const newPools = new Map([ ...collections ]);
  const poolIndex = getPoolIndex(poolId, contractAddress);
  const pool = newPools.get(poolIndex);

  if (pool) {
    pool.operation = operation;
  }

  setGlobalState('poolsData', {
    ...poolsData,
    collections: newPools,
  });

  updateContracts();
};

const getNetworkTotalDepositedValue = products => products
  .filter(product => product?.enabled)
  .reduce((acc, cur) => acc + cur?.currentAmount, 0);

const updateBasePools = async ({ network, type } = {}) => {
  const innerState = getGlobalState('poolsData');
  if (type) {
    if (!innerState.type) {
      setGlobalState('poolsData', {
        ...getGlobalState('poolsData'),
        type,
      });
    }

    if (innerState.type === type && innerState.network === network) {
      return;
    }
  }

  const mintConfig = getMintConfig() || {};
  const stakingPools = mintConfig?.[network];
  if (!stakingPools) {
    return;
  }

  const collections = stakingPools?.staking_pools?.[type || innerState.type];

  if (!collections?.every(pool => innerState.collections.has(getPoolIndex(pool)))) {
    setGlobalState('poolsData', {
      ...getGlobalState('poolsData'),
      network,
      collections: new Map(),
      type: type || innerState.type,
    });

    const products = await getEnabledProducts(stakingPools?.staking_pools);
    const totalDeposited = getNetworkTotalDepositedValue(products);

    const newPools = new Map();
    collections?.forEach(pool => {
      const poolIndex = getPoolIndex(pool);
      if (!newPools.has(poolIndex)) {
        newPools.set(poolIndex, { ...pool });
      }
    });

    setGlobalState('poolsData', {
      ...getGlobalState('poolsData'),
      collections: newPools,
      totalDeposited,
    });

    updateContracts();
  }
};

bepro.on('accountsChanged', updateContracts);
bepro.on('connect', updateContracts);
bepro.on('disconnect', error => {
  // eslint-disable-next-line no-console
  console.error({ error });

  setGlobalState('poolsData', getPoolsDefaults());
  updateContracts();
});
bepro.on('chainChanged', chainId => {
  updateBasePools({
    network: chains.find(chain => chain.chainId === chainId)?.slug,
  });
});

const useContracts = (productId, contractAddress) => {
  const [ poolsData ] = useGlobalState('poolsData');
  const { collections } = poolsData;
  const mintConfig = useMintConfig();

  const { networkActive } = useBepro();
  const { pathname } = useLocation();
  const { network } = useNetworkHash();

  const actualNetwork = networkActive || network;

  const newType = useMemo(
    () => {
      if (pathname === '/flexible') {
        return 'flexible';
      }
      if (pathname === '/lps') {
        return 'lp_tokens';
      }
      return 'locked';
    },
    [ pathname ],
  );

  useEffect(() => {
    if (newType && mintConfig) {
      updateBasePools({
        network: actualNetwork,
        type: newType,
      });
    }
  }, [ actualNetwork, newType, mintConfig ]);

  if (productId && contractAddress) {
    const poolIndex = getPoolIndex(productId, contractAddress, actualNetwork);
    return collections.get(poolIndex) || {};
  }

  return {
    ...poolsData,
    setOperation,
  };
};

export default useContracts;
