import WalletConnectProvider from '@walletconnect/web3-provider';

let provider;

const connect = async web3Connection => {
  // Create WalletConnect Provider
  provider = new WalletConnectProvider({
    rpc: {
      56: web3Connection,
    },
    chainId: 56,
  });
  provider.networkId = 56;

  try {
    //  Enable session (triggers QR Code modal)
    const accounts = await provider.enable();

    return !!accounts?.length && provider;
  }
  catch (ex) {
    // eslint-disable-next-line
    console.error(ex);

    return null;
  }
};

const close = () => provider.close();

const providerWalletConnect = {
  // WalletConnect snippet always present (imported here), so no need for special considerations on
  // auto connecting on first load.
  autoConnect: connect,

  close,
  connect,

  on: (event, handler) => {
    provider?.on(event, handler);
  },

  request: params => provider?.request(params),
};

export default providerWalletConnect;
