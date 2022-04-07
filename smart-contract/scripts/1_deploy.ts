import { ethers } from 'hardhat';
import CollectionConfig from '../config/CollectionConfig';
import { NftContractType } from '../lib/NftContractProvider';
import ERC721ContractArguments from './../config/ERC721ContractArguments';
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
  contractType
  const Contract = contractType === 'ERC721'
    ?  await ethers.getContractFactory(CollectionConfig.ERC721.contractName)
    : await ethers.getContractFactory(CollectionConfig.ERC1155.contractName);

  const contract = contractType === 'ERC721'
  ? await Contract.deploy(...ERC721ContractArguments) as NftContractType
  : await Contract.deploy(...ERC1155ContractArguments) as NftContractType;

  await contract.deployed();

  console.log('Contract deployed to:', contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
