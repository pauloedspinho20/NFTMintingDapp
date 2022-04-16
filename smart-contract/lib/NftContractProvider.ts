// The name below ("SpadeLabsERC721withERC20") should match the name of your Solidity contract.
// It can be updated using the following command:
// yarn rename-contract NEW_CONTRACT_NAME
// Please DO NOT change it manually!
// import { SpadeLabsERC721 as ContractType } from "../typechain/index";

import { ethers } from "hardhat";
import CollectionConfig from "./../config/CollectionConfig";

const contractType = process.env.CONTRACT_TYPE || 'ERC721'

let contractAddress: string | null;
let contractName: string;

if (contractType === 'ERC721') {
  contractAddress = CollectionConfig.ERC721.contractAddress
  contractName = CollectionConfig.ERC721.contractName
}
else if ( contractType === 'SpadeLabsERC721withERC20') {
  contractAddress = CollectionConfig.ERC721withERC20.contractAddress
  contractName = CollectionConfig.ERC721withERC20.contractName
}
 else {
  contractAddress = CollectionConfig.ERC1155.contractAddress
  contractName = CollectionConfig.ERC1155.contractName
}

export default class NftContractProvider {
  public static async getContract(): Promise<ContractType> {
    // Check configuration
    if (contractAddress === null) {
      throw (
        "\x1b[31merror\x1b[0m " +
        "Please add the contract address to the configuration before running this command."
      );
    }

    if (
      (await ethers.provider.getCode(contractAddress)) === "0x"
    ) {
      throw (
        "\x1b[31merror\x1b[0m " +
        `Can't find a contract deployed to the target address: ${contractAddress}`
      );
    }

    return (await ethers.getContractAt(
      contractName,
      contractAddress
    )) as ContractType;
  }
}

export type NftContractType = ContractType;
