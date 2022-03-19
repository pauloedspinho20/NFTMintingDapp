import { createGlobalState } from 'react-hooks-global-state';

const initialState = { mintConfig: null };
const { getGlobalState, setGlobalState, useGlobalState } = createGlobalState(initialState);

// We should hardly refetch anything, but let's allow other components to do it if they need to
export const updateMintConfig = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  const mintConfig = (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production')
    ? await import('lib/api/localConfigProduction.json')
    : await import('lib/api/localConfigStagingMint.json');

  setGlobalState('mintConfig', mintConfig);
};

export const getMintConfig = () => getGlobalState('mintConfig');

// First fetch of config
updateMintConfig();

const useMintConfig = () => {
  const [ mintConfig ] = useGlobalState('mintConfig');

  return mintConfig || {};
};

export default useMintConfig;
