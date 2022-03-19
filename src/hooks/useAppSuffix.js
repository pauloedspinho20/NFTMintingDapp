import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({ appSuffix: null });

const useAppSuffix = () => useGlobalState('appSuffix');

export default useAppSuffix;
