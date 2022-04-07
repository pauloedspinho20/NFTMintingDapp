import { utils } from 'ethers';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import CollectionConfig from './../config/CollectionConfig';
import NftContractProvider from '../lib/NftContractProvider';

async function main() {

  // const contractType = process.env.CONTRACT_TYPE || 'ERC721'

  // Check configuration
  if (CollectionConfig.ERC721.whitelistAddresses.length < 1) {
    throw '\x1b[31merror\x1b[0m ' + 'The whitelist is empty, please add some addresses to the configuration.';
  }

  // Build the Merkle Tree
  const leafNodes = CollectionConfig.ERC721.whitelistAddresses.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const rootHash = '0x' + merkleTree.getRoot().toString('hex');

  // Attach to deployed contract
  const contract = await NftContractProvider.getContract();

  // Update sale price (if needed)
  const whitelistPrice = utils.parseEther(CollectionConfig.ERC721.whitelistSale.price.toString());
  if (!await (await contract.cost()).eq(whitelistPrice)) {
    console.log(`Updating the token price to ${CollectionConfig.ERC721.whitelistSale.price} ETH...`);

    await (await contract.setCost(whitelistPrice)).wait();
  }

  // Update max amount per TX (if needed)
  if (!await (await contract.maxMintAmountPerTx()).eq(CollectionConfig.ERC721.whitelistSale.maxMintAmountPerTx)) {
    console.log(`Updating the max mint amount per TX to ${CollectionConfig.ERC721.whitelistSale.maxMintAmountPerTx}...`);

    await (await contract.setMaxMintAmountPerTx(CollectionConfig.ERC721.whitelistSale.maxMintAmountPerTx)).wait();
  }

  // Update root hash (if changed)
  if ((await contract.merkleRoot()) !== rootHash) {
    console.log(`Updating the root hash to: ${rootHash}`);

    await (await contract.setMerkleRoot(rootHash)).wait();
  }

  // Enable whitelist sale (if needed)
  if (!await contract.whitelistMintEnabled()) {
    console.log('Enabling whitelist sale...');

    await (await contract.setWhitelistMintEnabled(true)).wait();
  }

  console.log('Whitelist sale has been enabled!');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
