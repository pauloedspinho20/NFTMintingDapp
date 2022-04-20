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
    contractName: "SpadeLabsERC721",
    tokenName: "SpadeLabs",
    tokenSymbol: "SpadeLabs",
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
      price: 0.03,
      maxMintAmountPerTx: 5,
    },
    maxMintAmountPerWallet: 5,
    contractAddress: '0xD4FdbB625b0219b74eB6544F116D90a6780FFE10',
    marketplaceIdentifier: "spadelabs-v2",
    whitelistAddresses: whitelistAddresses,
  },
  ERC721withERC20: {
    contractName: "SpadeLabsERC721withERC20",
    tokenName: "SpadeLabs",
    tokenSymbol: "SpadeLabs",
    hiddenMetadataUri:
    "https://ipfs.io/ipfs/QmQxutXRTg3EK14FJrtFdtchcJBPsK39XjErDZvQwGQDei/hidden.json",
    maxSupply: 1000,
    whitelistSale: {
      price: 0.01,
      maxMintAmountPerTx: 1,
    },
    preSale: {
      price: 0.03,
      maxMintAmountPerTx: 3,
    },
    publicSale: {
      price: 0.03,
      maxMintAmountPerTx: 5,
    },
    maxMintAmountPerWallet: 3,
    erc20: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
    erc20MinimumValue: 30,
    contractAddress: '',
    marketplaceIdentifier: "",
    whitelistAddresses: whitelistAddresses,
  },
  ERC1155: {
    contractName: "ERC1155",
    tokenName: "ERC1155 NFTs",
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
