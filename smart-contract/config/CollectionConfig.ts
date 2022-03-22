import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import { ethereumTestnet, ethereumMainnet } from "../lib/Networks";
import { openSea } from "../lib/Marketplaces";
import whitelistAddresses from "../../src/whitelist.json";

const CollectionConfig: CollectionConfigInterface = {
  testnet: ethereumTestnet,
  mainnet: ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: "RandomEyesNFTs",
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
  contractAddress: '0x33AD26E6401b9078365184De9e19b52861AB038E',
  marketplaceIdentifier: "my-nft-token",
  marketplaceConfig: openSea,
  whitelistAddresses: whitelistAddresses,
};

export default CollectionConfig;
