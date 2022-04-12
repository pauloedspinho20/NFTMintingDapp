import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import { ethereumTestnet, ethereumMainnet } from "../lib/Networks";
import { openSea } from "../lib/Marketplaces";
import whitelistAddresses from "../../src/whitelist.json";

const CollectionConfig: CollectionConfigInterface = {
  testnet: ethereumTestnet,
  mainnet: ethereumMainnet,
  marketplaceConfig: openSea,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  ERC721: {
    contractName: "RandomEyes",
    tokenName: "Random Eyes NFTs",
    tokenSymbol: "RE",
    hiddenMetadataUri:
      "https://ipfs.io/ipfs/QmQxutXRTg3EK14FJrtFdtchcJBPsK39XjErDZvQwGQDei/hidden.json",
    maxSupply: 32,
    whitelistSale: {
      price: 0.01,
      maxMintAmountPerTx: 1,
    },
    preSale: {
      price: 0.02,
      maxMintAmountPerTx: 3,
    },
    publicSale: {
      price: 0.05,
      maxMintAmountPerTx: 5,
    },
    contractAddress: '0x3C0faE8B5Ec388Efd95113fD8DcA15580213d4AE',
    marketplaceIdentifier: "my-nft-token",
    whitelistAddresses: whitelistAddresses,

  },
  ERC721withERC20: {
    contractName: "PYENFT",
    tokenName: "PYE",
    tokenSymbol: "PYE",
    hiddenMetadataUri:
      "https://ipfs.io/ipfs/QmQxutXRTg3EK14FJrtFdtchcJBPsK39XjErDZvQwGQDei/hidden.json",
    maxSupply: 1500,
    whitelistSale: {
      price: 0,
      maxMintAmountPerTx: 3,
    },
    preSale: {
      price: 0,
      maxMintAmountPerTx: 3,
    },
    publicSale: {
      price: 0,
      maxMintAmountPerTx: 3,
    },
    erc20: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
    erc20MinimumValue: 30,
    contractAddress: '0x0c5D74565e5Fdb0ab7D8dAb4077A836d086d91F5',
    marketplaceIdentifier: "my-nft-token",
    whitelistAddresses: whitelistAddresses,
  },
  ERC1155: {
    contractName: "MetaParticles",
    tokenName: "MetaParticles NFTs",
    tokenSymbol: "MetaParticle",
    hiddenMetadataUri:
      "https://ipfs.io/ipfs/Qmf7YbHu7krH657ErDRs5xezwXqmb7AHLMCbCLrY1hf25x/{id}.json",
    maxSupply: 10000,
    whitelistSale: {
      price: 0.01,
      maxMintAmountPerTx: 1,
    },
    preSale: {
      price: 0.02,
      maxMintAmountPerTx: 3,
    },
    publicSale: {
      price: 0.05,
      maxMintAmountPerTx: 5,
    },
    contractAddress: '',
    marketplaceIdentifier: "",
    whitelistAddresses: whitelistAddresses,
  }
};

export default CollectionConfig;
