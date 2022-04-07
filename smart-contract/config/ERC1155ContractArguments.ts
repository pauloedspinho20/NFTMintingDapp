// import { utils } from "ethers";
import CollectionConfig from "./CollectionConfig";

// Update the following array if you change the constructor arguments...
const ERC1155ContractArguments = [
  CollectionConfig.ERC1155.tokenName,
 /*  CollectionConfig.ERC1155.tokenSymbol,
  CollectionConfig.ERC1155.maxSupply,
  CollectionConfig.ERC1155.hiddenMetadataUri, */
] as const;

export default ERC1155ContractArguments;
