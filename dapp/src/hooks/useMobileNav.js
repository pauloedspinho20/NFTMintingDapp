import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({ mobileNav: null });

const useMobileNav = () => useGlobalState('mobileNav');

export default useMobileNav;
