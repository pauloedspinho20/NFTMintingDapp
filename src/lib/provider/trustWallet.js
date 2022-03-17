import { trustWalletLink } from 'config';
import providerWalletConnect from './walletConnect';

const isIOS = typeof window !== 'undefined'
  && (
    /iPad|iPhone|iPod/.test(window.navigator.platform) || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
  );

const connect = async () => {
  if (!window.ethereum) {
    // conversion('metamask');
    window.open(trustWalletLink, '_blank');
    return null;
  }

  try {
    // This fully connects the site to MetaMask. Can trigger UI for account confirmation, so call
    // only on user action when needed.
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    return !!accounts?.length && window.ethereum;
  }
  catch (ex) {
    // eslint-disable-next-line no-console
    console.error(ex);

    return null;
  }
};

// Because the TrustWallet app does not have a browser on IOS, the behavior of the button becomes the same as
// WalletConnect.
const providerTrustWallet = isIOS
  ? providerWalletConnect
  : {
    // Runs on first load, tries to not be intrusive for users who are not
    autoConnect: () => window.ethereum && connect(),

    connect,

    on: (event, handler) => {
      window.ethereum?.on(event, handler);
    },

    request: params => window.ethereum?.request(params),
  };

export default providerTrustWallet;
