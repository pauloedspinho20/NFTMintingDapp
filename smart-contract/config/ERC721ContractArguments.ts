import { utils } from "ethers";
import CollectionConfig from "./CollectionConfig";

// Update the following array if you change the constructor arguments...
const ERC721Arguments = [
  CollectionConfig.ERC721.tokenName,
  CollectionConfig.ERC721.tokenSymbol,
  utils.parseEther(CollectionConfig.ERC721.whitelistSale.price.toString()),
  CollectionConfig.ERC721.maxSupply,
  CollectionConfig.ERC721.whitelistSale.maxMintAmountPerTx,
  CollectionConfig.ERC721.hiddenMetadataUri,
] as const;

export default ERC721Arguments;
