import { metamaskLink } from 'config';

const connect = async () => {
  if (!window.ethereum) {
    // conversion('metamask');
    window.open(metamaskLink, '_blank');
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

const providerMetamask = {
  // Runs on first load, tries to not be intrusive for users who are not
  autoConnect: () => window.ethereum && connect(),

  connect,

  on: (event, handler) => {
    window.ethereum?.on(event, handler);
  },

  request: params => window.ethereum?.request(params),
};

export default providerMetamask;
