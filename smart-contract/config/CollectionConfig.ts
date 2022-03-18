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
  contractName: "TheSpades",
  tokenName: "TheSpades",
  tokenSymbol: "SPADE",
  hiddenMetadataUri:
    "ipfs://Qmb5Pb2z6CEh89trbBns9wArULxTFQBNeic7vDiqiiD6YA/hidden.json",
  maxSupply: 25,
  whitelistSale: {
    price: 0.01,
    maxMintAmountPerTx: 1,
  },
  preSale: {
    price: 0.02,
    maxMintAmountPerTx: 2,
  },
  publicSale: {
    price: 0.05,
    maxMintAmountPerTx: 5,
  },
  contractAddress: '0x4Cb37d29FE386E7BB2eC1D55AAb19A8c1B9cd61A',
  marketplaceIdentifier: "my-nft-token",
  marketplaceConfig: openSea,
  whitelistAddresses: whitelistAddresses,
};

export default CollectionConfig;
