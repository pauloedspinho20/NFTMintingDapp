import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

import EventEmitter from 'events';
import Web3 from 'web3';

import { add as addError } from 'hooks/useErrors';
import { getNetworkFromHash } from 'hooks/useNetworkHash';
import { getStorage } from 'hooks/useStorage';

import providerMetamask from 'lib/provider/metamask';
import providerTrustWallet from 'lib/provider/trustWallet';
import providerWalletConnect from 'lib/provider/walletConnect';

import cookieConsent from 'utils/cookieConsent';

import { chains } from 'config';
import whitelistAddresses from 'whitelist.json';
import Numbers from './utils/Numbers';

// ABIs
const erc721ContractV1Abi = require('lib/abis/ERC721ContractV1.json');

const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

const resolve = {};

let bepro = null;
let web3Provider = null;

const initializeBepro = () => {
  if (typeof window !== 'undefined') {
    web3Provider = null;

    bepro = new Promise(res => {
      resolve.bepro = value => {
        res(value);
        resolve.bepro = null;
      };
    });
  }
};

const closeBepro = async () => {
  if (typeof window !== 'undefined') {
    if (web3Provider?.close) {
      await web3Provider.close();
    }
  }

  web3Provider = null;
  bepro = null;
};

const reInitializeBepro = async () => {
  await closeBepro();
  initializeBepro();
};

initializeBepro();

let params = new Promise(res => {
  resolve.params = res;
});

const eeBepro = new EventEmitter();

// When the connection params change, we need to update the bepro object; it's really not built for
// multi-chain...
eeBepro.on('paramsChanged', async () => {
  const app = await bepro;
  if (app && app.opt.provider) {
    app.start(app.opt.provider);
  }
});

/*
* GET ADDRESS
*/
const getAddress = async () => {
  const app = await bepro;
  return app && app.getAddress();
};

/*
* GET NETWORK
*/
const getNetwork = async () => {
  const app = await bepro;
  return app?.getETHNetwork();
};

/*
* DETECT NETWORK
*/
const getNetworkNameFromId = networkId => {
  switch (networkId) {
    case 1:
      return 'eth';
    case 42:
      return 'kovan';
    case 4:
      return 'rinkeby';
    case 56:
      return 'bsc';
    default:
      return 'unknown';
  }
};

const getCurrentNetwork = async () => {
  const app = await bepro;
  const web3 = await app?.getWeb3();
  if (web3) {
    const networkId = await web3?.eth?.net?.getId(); // TODO: test with walletconnect
    return getNetworkNameFromId(networkId);
  }
  return null;
};

/*
* CHECK IF IS CONNECTED TO WALLET
*/
const isConnected = async () => {
  const address = await getAddress();
  if (!address) {
    return false;
  }

  const networkWanted = getNetworkFromHash();
  const networkActive = await getCurrentNetwork();

  return networkWanted === networkActive;
};

const getWeb3 = async () => {
  // Only return bepro's instance of web3 if it's connected to the network that we want
  if (await isConnected()) {
    const app = await bepro;
    return app.web3;
  }

  const { web3Connection } = await params;
  if (web3Connection) {
    if (web3Connection.toLowerCase().includes('http')) {
      return new Web3(new Web3.providers.HttpProvider(web3Connection));
    }

    return new Web3(new Web3.providers.WebsocketProvider(web3Connection));
  }

  return null;
};

/*
* GET ERC721 CONTRACT
*/
const getERC721Contract = async contractAddress => {
  if (contractAddress) {
    const web3 = await getWeb3();

    if (web3) {
      const jsonInterface = erc721ContractV1Abi;

      const contract = new web3.eth.Contract(
        jsonInterface,
        contractAddress,
      );

      return contract;
    }
  }
  return null;
};

/*
* GET WALLET PROVIDER
*/
const getProvider = wallet => {
  switch (wallet) {
    case 'metamask':
      return providerMetamask;
    case 'trustWallet':
      return providerTrustWallet;
    case 'walletConnect':
      return providerWalletConnect;
    default:
      // No wallet previously connected, we will only attempt to connect via user interaction.
      return null;
  }
};

/*
* APPROVE STAKING CONTRACT
*/
const approveContract = async contractAddress => {
  const web3 = await getWeb3();

  if (web3) {
    const nftContract = await getERC721Contract(contractAddress);
    const address = await getAddress();

    if (address && nftContract) {
      try {
      /*   const gasPrice = await web3.eth.getGasPrice();
        const gas = await nftContract?.methods
          .setApprovalForAll(address, contractAddress)
          .estimateGas({
            from: address,
            gasPrice,
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error('estimateGas error', error);
          }); */

        const result = await nftContract?.methods.setApprovalForAll(
          contractAddress, address,
        ).send({
          from: address,
          /*  gas,
          gasPrice, */
        });

        if (!result) {
          addError('Failed to approve');
        }
        return result;
      }
      catch (ex) {
        // eslint-disable-next-line no-console
        console.error(ex);
        switch (ex.code) {
          case 4001:
            addError('Contract approval cancelled', true);
            break;
          default:
            addError('Failed to approve');
            break;
        }

        return null;
      }
    }
  }

  return null;
};

/*
* GET CONTRACT ADDRESS
*/
const getContractAddress = () => (
  env === 'production'
    ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ETHEREUM
    : process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_RINKEBY
);

const getMerkleTree = merkleTree => {
  if (merkleTree === undefined) {
    const leafNodes = whitelistAddresses.map(addr => keccak256(addr));

    merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  }

  return merkleTree;
};

const getProofForAddress = address => getMerkleTree().getHexProof(keccak256(address));

/* const getRawProofForAddress = address =>
 getProofForAddress(address).toString().replaceAll('\'', '').replaceAll(' ', ''); */

const whitelistContains = async address => (
  getMerkleTree().getLeafIndex(Buffer.from(keccak256(address))) >= 0
);
/*
* GET COLLECTION
*/
const getCollection = async () => {
  const web3 = await getWeb3();

  if (web3) {
    const address = await getAddress();
    const contractAddress = getContractAddress();
    const nftContract = await getERC721Contract(contractAddress);
    // const merkleRoot = await nftContract?.methods.merkleRoot().call();
    const enabled = process.env.NEXT_PUBLIC_COLLECTION_ENABLED === 'true';
    const approved = address ? await nftContract?.methods.isApprovedForAll(address, contractAddress).call() : false;
    const name = await nftContract?.methods.name().call();
    const paused = await nftContract?.methods.paused().call();
    const revealed = await nftContract?.methods.revealed().call();
    const symbol = await nftContract?.methods.symbol().call();
    const balanceOf = address ? Number(await nftContract?.methods.balanceOf(address).call()) : 0;
    const cost = Number(Numbers.fromDecimals(await nftContract?.methods.cost().call(), 18));
    const maxSupply = Number(await nftContract?.methods.maxSupply().call());
    const totalSupply = Number(await nftContract?.methods.totalSupply().call());
    const maxMintAmountPerTx = Number(await nftContract?.methods.maxMintAmountPerTx().call());
    const uriPrefix = await nftContract?.methods.uriPrefix().call();
    const uriSuffix = await nftContract?.methods.uriSuffix().call();
    const hiddenMetadataUri = await nftContract?.methods.hiddenMetadataUri().call();
    const whitelistMintEnabled = await nftContract?.methods.whitelistMintEnabled().call();
    const whitelistClaimed = address ? await nftContract?.methods.whitelistClaimed(address).call() : false;
    const isAddressWhitelisted = address && await whitelistContains(address);
    const userTokensIds = address ? await nftContract?.methods.walletOfOwner(address).call() : false;
    const userTokens = [];

    if (userTokensIds.length > 0 && address) {
      await Promise.all(userTokensIds.map(async tokenId => {
        const getTokenURI = await nftContract?.methods.tokenURI(tokenId).call();
        const tokenURI = (getTokenURI.includes('ipfs://')
          ? getTokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
          : getTokenURI
        );
        if (tokenURI) {
          const url = !revealed ? hiddenMetadataUri : (tokenURI);
          const response = await fetch(url);
          const metadata = await response.json();
          const tokenName = metadata.name;
          const { description, attributes } = metadata;
          const image = (metadata?.image.includes('ipfs://')
            ? metadata?.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
            : metadata?.image
          );

          userTokens.push({
            tokenId, tokenURI, tokenName, description, image, attributes,
          });
        }
      }));
    }

    const collection = {
      approved,
      enabled,
      contractAddress,
      name,
      paused,
      revealed,
      symbol,
      balanceOf,
      cost,
      maxSupply,
      totalSupply,
      maxMintAmountPerTx,
      uriPrefix,
      uriSuffix,
      hiddenMetadataUri,
      whitelistMintEnabled,
      whitelistClaimed,
      isAddressWhitelisted,
      userTokens,
    };

    if (collection) {
      console.log('collection', collection);
      return collection;
    }
  }

  return null;
};

/*
* MINT COLLECTION
*/
const mintCollection = async (value, _mintAmount, contractAddress, whitelistMint) => {
  const web3 = await getWeb3();

  if (web3) {
    const address = await getAddress();
    const nftContract = await getERC721Contract(contractAddress);

    if (address) {
      try {
        const gasPrice = await web3.eth.getGasPrice();

        // WHITELIST MINT
        if (whitelistMint) {
          const merkleProof = await getProofForAddress(address);
          const gas = await nftContract?.methods
            .whitelistMint(_mintAmount, merkleProof)
            .estimateGas({
              from: address,
              gasPrice,
              value: Numbers.toSmartContractDecimals(value, 18),
            })
            .catch(error => {
            // eslint-disable-next-line no-console
              console.error('estimateGas error', error);
            });

          const result = await nftContract?.methods.whitelistMint(
            _mintAmount, merkleProof,
          ).send({
            from: address,
            gas,
            gasPrice,
            value: Numbers.toSmartContractDecimals(value, 18),
          }).on('error', error => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          // eslint-disable-next-line no-console
            console.error('mintCollection error', error);
          });

          if (!result) {
            addError('Failed to mint.');
          }
          return result;
        }

        // NORMAL MINT
        const gas = await nftContract?.methods
          .mint(_mintAmount)
          .estimateGas({
            from: address,
            gasPrice,
            value: Numbers.toSmartContractDecimals(value, 18),
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error('estimateGas error', error);
          });

        const result = await nftContract?.methods.mint(
          _mintAmount,
        ).send({
          from: address,
          gas,
          gasPrice,
          value: Numbers.toSmartContractDecimals(value, 18),
        }).on('error', error => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          // eslint-disable-next-line no-console
          console.error('mintCollection error', error);
        });

        if (!result) {
          addError('Failed to mint.');
        }
        return result;
      }
      catch (ex) {
        // eslint-disable-next-line no-console
        console.error(ex);
        switch (ex.code) {
          case 4001:
            addError('Mint cancelled.', true);
            break;
          default:
            addError('Failed to mint.');
            break;
        }

        return null;
      }
    }
  }

  return null;
};

/*
* TANSFER NFT TO ADDRESS
*/
const safeTransferFrom = async (toAddress, tokenId, contractAddress) => {
  const web3 = await getWeb3();

  if (web3) {
    const address = await getAddress();
    const nftContract = await getERC721Contract(contractAddress);

    console.log('safeTransferFrom', toAddress, tokenId, contractAddress);
    if (address) {
      try {
        const gasPrice = await web3.eth.getGasPrice();

        const gas = await nftContract?.methods
          .safeTransferFrom(
            address, // address
            toAddress, // toAddress,
            tokenId, // tokenId
          ).estimateGas({
            from: address,
            gasPrice,
          }).catch(error => {
            // eslint-disable-next-line no-console
            console.error('safeTransferFrom error', error);
          });

        const result = await nftContract?.methods.safeTransferFrom(
          address, // address
          toAddress, // toAddress,
          tokenId, // tokenId
        ).send({
          from: address,
          gas,
          gasPrice,
        }).on('error', error => { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          // eslint-disable-next-line no-console
          console.error('safeTransferFrom error', error);
        });

        if (!result) {
          addError('Failed to transfer.');
        }
        return result;
      }
      catch (ex) {
        // eslint-disable-next-line no-console
        console.error(ex);
        switch (ex.code) {
          case 4001:
            addError('Transfer cancelled.', true);
            break;
          default:
            addError('Failed to transfer.');
            break;
        }

        return null;
      }
    }
  }

  return null;
};

const switchNetwork = async slugOrId => {
  // Default to using metamask, we don't actually need to connect wallet to do the switch
  const wProvider = web3Provider || window.ethereum;
  const network = chains.find(chain => chain.slug === slugOrId);

  try {
    if (!wProvider) {
      throw new Error('Wallet provider not found');
    }

    if (!network) {
      throw new Error(`Unknown chain '${slugOrId}'`);
    }

    await wProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [ { chainId: network.chainId } ],
    });
  }
  catch (ex) {
    // Wallet does not have this chain, try to add it
    if (ex.code === 4902) {
      try {
        await wProvider.request({
          method: 'wallet_addEthereumChain',
          params: [ {
            blockExplorerUrls: network.blockExplorerUrls,
            chainId: network.chainId,
            chainName: network.chainName,
            nativeCurrency: network.nativeCurrency,
            rpcUrls: network.rpcUrls,
          } ],
        });
      }
      catch (exx) {
        // eslint-disable-next-line no-console
        console.error(exx);
        return false;
      }

      return true;
    }

    // eslint-disable-next-line no-console
    console.error(ex);
    return false;
  }

  return true;
};

/*
* libBepro
*/

const libBepro = {
  getCurrentNetwork,
  approveContract,
  getAddress,
  getNetwork,
  getCollection,
  getWeb3,
  mintCollection,
  safeTransferFrom,
  switchNetwork,

  connect: async (wallet, autoConnect) => {
    if (typeof window === 'undefined') {
      return;
    }

    const walletProvider = getProvider(wallet);

    // Already connected to this wallet, nothing to do.
    if (walletProvider === web3Provider) {
      // On first load, if we're not connecting to anything, make sure nothing is kept waiting on
      // an empty promise.
      if (!web3Provider) {
        resolve.bepro(null);
      }
      return;
    }

    await reInitializeBepro();

    const { web3Connection } = await params;

    let provider;
    try {
      provider = walletProvider && await walletProvider[autoConnect ? 'autoConnect' : 'connect'](web3Connection);
    }
    catch (ex) {
      // eslint-disable-next-line no-console
      console.error(ex);
    }
    if (provider) {
      const { Application } = await import('bepro-js');

      const appParams = { opt: { provider, web3Connection } };
      /*   if (/kovan/.test(web3Connection)) {
        appParams.opt.privateKey = '0x1234567890123456789012345678901234567890123456789012345678901234';
        // bogus key just so bepro doesn't freak out
        appParams.test = true;
      } */

      const app = new Application(appParams);
      if (app) {
        // Internal reference to the wallet provider currently active.
        web3Provider = walletProvider;

        // Our app attaches events to this libBepro, which then proxies to the chosen provider.
        web3Provider.on('accountsChanged', (accounts, ...args) => {
          if (!accounts?.length) {
            (async () => {
              // Simulate a disconnect
              await closeBepro();
              eeBepro.emit('disconnect', ...args);
            })();
          }
          else {
            eeBepro.emit('accountsChanged', accounts, ...args);
          }
        });
        web3Provider.on('chainChanged', (...args) => {
          eeBepro.emit('chainChanged', ...args);
        });
        web3Provider.on('connect', (...args) => {
          eeBepro.emit('connect', ...args);
        });
        web3Provider.on('disconnect', (...args) => {
          (async () => {
            await closeBepro();
            eeBepro.emit('disconnect', ...args);
          })();
        });
        web3Provider.on('message', (...args) => {
          eeBepro.emit('message', ...args);
        });
        web3Provider.on('networkChanged', (...args) => {
          eeBepro.emit('networkChanged', ...args);
        });

        // bepro is initialized, fulfill any waiting promises.
        resolve.bepro(app);

        // Simulate a first connect, since the handler above will only be appended post-connect.
        eeBepro.emit('connect');

        // Save to autoconnect in future visits
        const consent = cookieConsent.read('essential');
        const storage = getStorage(consent);
        storage.set('wallet', wallet);

        return;
      }
    }

    resolve.bepro(null);
  },

  disconnect: async () => {
    if (typeof window === 'undefined') {
      return;
    }

    // User has specifically asked to disconnect, ensure it remains so on future visits
    const consent = cookieConsent.read('essential');
    const storage = getStorage(consent);
    storage.remove('wallet');

    await reInitializeBepro();
    resolve.bepro(null);
    eeBepro.emit('disconnect');
  },

  getETHBalance: async () => {
    const app = await bepro;
    const amount = await app?.getETHBalance();
    return amount ? parseFloat(amount) : 0;
  },

  off: (event, handler) => {
    eeBepro.off(event, handler);
  },

  on: (event, handler) => {
    eeBepro.on(event, handler);
  },

  setParams: newParams => {
    if (newParams.web3Connection) {
      const resolved = { ...newParams };

      // Params that are fetched from config, to be used to initalize contracts and connections.
      // Resolve the existing promise for anything waiting for the initial set of parameters
      resolve.params(resolved);

      // Reset the promise to a new one in case the parameters change
      params = Promise.resolve(resolved);

      eeBepro.emit('paramsChanged', resolved);
    }
  },
};

if (typeof window !== 'undefined') {
  // See if user previously connected a wallet, and attempt to auto-connect to it.
  const consent = cookieConsent.read('essential');
  const storage = getStorage(consent);
  libBepro.connect(storage.get('wallet'), true);
}

export default libBepro;
