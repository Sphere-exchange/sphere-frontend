/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IFlashLoanCallee,
  IFlashLoanCalleeInterface,
} from "../../../contracts/interface/IFlashLoanCallee";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_token",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amount",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_amountPay",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "IFlashLoanCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IFlashLoanCallee__factory {
  static readonly abi = _abi;
  static createInterface(): IFlashLoanCalleeInterface {
    return new utils.Interface(_abi) as IFlashLoanCalleeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFlashLoanCallee {
    return new Contract(address, _abi, signerOrProvider) as IFlashLoanCallee;
  }
}
