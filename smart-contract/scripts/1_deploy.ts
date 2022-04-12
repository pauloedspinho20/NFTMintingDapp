import { ethers } from 'hardhat';
import CollectionConfig from '../config/CollectionConfig';
import { NftContractType } from '../lib/NftContractProvider';
import ERC721ContractArguments from './../config/ERC721ContractArguments';
import ERC721withERC20ContractArguments from './../config/ERC721withERC20ContractArguments';
import ERC1155ContractArguments from './../config/ERC1155ContractArguments';


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const contractType = process.env.CONTRACT_TYPE || 'ERC721'

  console.log('Deploying contract...');

  // We get the contract to deploy
  let Contract;
  let contract

  if (contractType === 'ERC721') {
    Contract = await ethers.getContractFactory(CollectionConfig.ERC721.contractName)
    contract = await Contract.deploy(...ERC721ContractArguments) as NftContractType
  }
  else if ( contractType === 'ERC721withERC20') {
    Contract = await ethers.getContractFactory(CollectionConfig.ERC721withERC20.contractName)
    contract = await Contract.deploy(...ERC721withERC20ContractArguments) as NftContractType
  }
   else {
    Contract = await ethers.getContractFactory(CollectionConfig.ERC1155.contractName);
    contract = await Contract.deploy(...ERC1155ContractArguments) as NftContractType
  }

  await contract.deployed();

  console.log('Contract deployed to:', contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
