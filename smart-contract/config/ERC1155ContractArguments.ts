import { utils } from "ethers";
import CollectionConfig from "./CollectionConfig";

// Update the following array if you change the constructor arguments...
const ERC1155ContractArguments = [
  utils.parseEther(CollectionConfig.ERC1155.whitelistSale.price.toString()),
  CollectionConfig.ERC1155.maxSupply,
  CollectionConfig.ERC1155.whitelistSale.maxMintAmountPerTx,
  CollectionConfig.ERC1155.hiddenMetadataUri,
] as const;

export default ERC1155ContractArguments;
