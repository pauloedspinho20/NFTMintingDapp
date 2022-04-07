import { utils } from 'ethers';
import CollectionConfig from './../config/CollectionConfig';
import NftContractProvider from '../lib/NftContractProvider';

async function main() {
  // Attach to deployed contract
  const contract = await NftContractProvider.getContract();

  // Update sale price (if needed)
  const publicSalePrice = utils.parseEther(CollectionConfig.ERC721.publicSale.price.toString());
  if (!await (await contract.cost()).eq(publicSalePrice)) {
    console.log(`Updating the token price to ${CollectionConfig.ERC721.publicSale.price} ETH...`);

    await (await contract.setCost(publicSalePrice)).wait();
  }

  // Update max amount per TX (if needed)
  if (!await (await contract.maxMintAmountPerTx()).eq(CollectionConfig.ERC721.publicSale.maxMintAmountPerTx)) {
    console.log(`Updating the max mint amount per TX to ${CollectionConfig.ERC721.publicSale.maxMintAmountPerTx}...`);

    await (await contract.setMaxMintAmountPerTx(CollectionConfig.ERC721.publicSale.maxMintAmountPerTx)).wait();
  }

  // Unpause the contract (if needed)
  if (await contract.paused()) {
    console.log('Unpausing the contract...');

    await (await contract.setPaused(false)).wait();
  }

  console.log('Public sale is now open!');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
