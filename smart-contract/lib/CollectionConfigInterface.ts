import NetworkConfigInterface from "../lib/NetworkConfigInterface";
import MarketplaceConfigInterface from "../lib/MarketplaceConfigInterface";

interface SaleConfig {
  price: number;
  maxMintAmountPerTx: number;
}

export default interface CollectionConfigInterface {
  testnet: NetworkConfigInterface;
  mainnet: NetworkConfigInterface;
  marketplaceConfig: MarketplaceConfigInterface;
  ERC721: {
    contractName: string;
    tokenName: string;
    tokenSymbol: string;
    hiddenMetadataUri: string;
    maxSupply: number;
    whitelistSale: SaleConfig;
    preSale: SaleConfig;
    publicSale: SaleConfig;
    contractAddress: string | null;
    whitelistAddresses: string[];
    marketplaceIdentifier: string;
  };
  ERC1155: {
    contractName: string;
    tokenName: string;
    tokenSymbol:  string;
    hiddenMetadataUri:  string;
    maxSupply: number,
    contractAddress: string | null;
    marketplaceIdentifier: string;
  }
}
