import { utils } from "ethers";
import CollectionConfig from "./CollectionConfig";

// Update the following array if you change the constructor arguments...
const ERC721withERC20ContractArguments = [
  CollectionConfig.ERC721withERC20.tokenName,
  CollectionConfig.ERC721withERC20.tokenSymbol,
  utils.parseEther(CollectionConfig.ERC721withERC20.whitelistSale.price.toString()),
  CollectionConfig.ERC721withERC20.maxSupply,
  CollectionConfig.ERC721withERC20.whitelistSale.maxMintAmountPerTx,
  CollectionConfig.ERC721withERC20.maxMintAmountPerWallet,
  CollectionConfig.ERC721withERC20.hiddenMetadataUri,
  CollectionConfig.ERC721withERC20.erc20,
  utils.parseEther(CollectionConfig.ERC721withERC20.erc20MinimumValue.toString())
] as const;

export default ERC721withERC20ContractArguments;
