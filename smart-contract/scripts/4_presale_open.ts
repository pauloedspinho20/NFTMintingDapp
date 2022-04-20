import { utils } from 'ethers';
import CollectionConfig from './../config/CollectionConfig';
import NftContractProvider from '../lib/NftContractProvider';

async function main() {
  // Attach to deployed contract
  const contract = await NftContractProvider.getContract();
  const contractType = process.env.CONTRACT_TYPE || 'ERC721'
  let collectionConfig

  if (contractType === 'ERC721') {
    collectionConfig = CollectionConfig.ERC721
  }
  else if ( contractType === 'ERC721withERC20') {
    collectionConfig = CollectionConfig.ERC721withERC20
  }
   else {
    collectionConfig = CollectionConfig.ERC1155
  }

  // Update sale price (if needed)
  const preSalePrice = utils.parseEther(collectionConfig.preSale.price.toString());
  if (!await (await contract.cost()).eq(preSalePrice)) {
    console.log(`Updating the token price to ${collectionConfig.preSale.price} ETH...`);

    await (await contract.setCost(preSalePrice)).wait();
  }

  // Update max amount per TX (if needed)
  if (!await (await contract.maxMintAmountPerTx()).eq(collectionConfig.preSale.maxMintAmountPerTx)) {
    console.log(`Updating the max mint amount per TX to ${collectionConfig.preSale.maxMintAmountPerTx}...`);

    await (await contract.setMaxMintAmountPerTx(collectionConfig.preSale.maxMintAmountPerTx)).wait();
  }

  // Unpause the contract (if needed)
  if (await contract.paused()) {
    console.log('Unpausing the contract...');

    await (await contract.setPaused(false)).wait();
  }

  console.log('Pre-sale is now open!');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
