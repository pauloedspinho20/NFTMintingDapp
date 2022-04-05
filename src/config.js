/* Configuration file */

export const maintenance = false;

export const maintenanceToken = '5ca5930cf489cac1741661174566d0c692e5e0eb51f5ae';

export const maintenanceMessage = '';

export const metamaskLink = 'https://metamask.io/download.html';
export const trustWalletLink = 'https://trustwallet.com/';

export const pageMeta = {
  description: 'TEMPLATE FOR ERC721 NFT MINTING DAPPS',
  image: '/media/share-img.jpg',
  title: process.env.NEXT_PUBLIC_DAPP_NAME || 'NFTMintingDapp',
};

export const socialLinks = [
  {
    label: 'Telegram',
    link: 'https://telegram.com',
    logo: 'telegram',
  },
  {
    label: 'Discord',
    link: 'https://discord.com',
    logo: 'discord',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com',
    logo: 'twitter',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com',
    logo: 'instagram',
  },
];

export const menuLinks = [
  {
    label: 'Mint',
    link: '/mint',
  },
  {
    label: 'Collection',
    link: '/collection',
  },
];

if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') {
  menuLinks.push({
    label: 'Canvas',
    link: '/canvas',
  });
}

export const cookiesBanner = {
  body: 'Cookie Disclaimer. By navigating this site data will be stored in your browser, in order to enhance your browsing experience.',
  options: [
    [ 'essential', 'Essential - Remember some of your incomplete actions, for a smooth experience across sessions.' ],
    [ 'analytics', 'Analytics - Site behavior and interaction, to improve and evolve the platform.' ],
    [ 'marketing', 'Marketing - To track engagement in social campaigns.' ],
  ],
};

export const chains = [
  { // BINANCE SMART CHAIN
    blockExplorerUrls: [ 'https://bscscan.com' ],
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    coin: '$BNB',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: [ process.env.NEXT_PUBLIC_RPC_BSC ],
    slug: 'bsc',
  },
  { // ETHEREUM MAINNET
    blockExplorerUrls: [ 'https://etherscan.com' ],
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    coin: '$ETH',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [ process.env.NEXT_PUBLIC_RPC_ETHEREUM ],
    slug: 'eth',
  },
  { // KOVAN TESTNET
    blockExplorerUrls: [ 'https://kovan.etherscan.com' ],
    chainId: '0x2a',
    chainName: 'Kovan Testnet',
    coin: '$ETH',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [ process.env.NEXT_PUBLIC_RPC_KOVAN ],
    slug: 'kovan',
  },
  { // RINKEBY TESTNET
    blockExplorerUrls: [ 'https://rinkeby.etherscan.com' ],
    chainId: '0x4a',
    chainName: 'Rinkeby Testnet',
    coin: '$ETH',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [ process.env.NEXT_PUBLIC_RPC_RINKEBY ],
    slug: 'rinkeby',
  },
];

export const knownErrors = {};
