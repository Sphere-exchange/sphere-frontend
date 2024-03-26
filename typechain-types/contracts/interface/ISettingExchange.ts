/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface ISettingExchangeInterface extends utils.Interface {
  functions: {
    "Fee()": FunctionFragment;
    "FeeCollector()": FunctionFragment;
    "allowlistAddressToken1(address)": FunctionFragment;
    "durationPaidFee()": FunctionFragment;
    "isSaveAddressToken(address)": FunctionFragment;
    "minAmountToken0(address)": FunctionFragment;
    "minAmountToken1(address)": FunctionFragment;
    "platformFee()": FunctionFragment;
    "setAddressToken(address)": FunctionFragment;
    "testERC20Token(address)": FunctionFragment;
    "userFee()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "Fee"
      | "FeeCollector"
      | "allowlistAddressToken1"
      | "durationPaidFee"
      | "isSaveAddressToken"
      | "minAmountToken0"
      | "minAmountToken1"
      | "platformFee"
      | "setAddressToken"
      | "testERC20Token"
      | "userFee"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "Fee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "FeeCollector",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowlistAddressToken1",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "durationPaidFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isSaveAddressToken",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "minAmountToken0",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "minAmountToken1",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "platformFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAddressToken",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "testERC20Token",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "userFee", values?: undefined): string;

  decodeFunctionResult(functionFragment: "Fee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "FeeCollector",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allowlistAddressToken1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "durationPaidFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isSaveAddressToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minAmountToken0",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minAmountToken1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "platformFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAddressToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testERC20Token",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userFee", data: BytesLike): Result;

  events: {};
}

export interface ISettingExchange extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISettingExchangeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    Fee(overrides?: CallOverrides): Promise<[BigNumber]>;

    FeeCollector(overrides?: CallOverrides): Promise<[string]>;

    allowlistAddressToken1(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    durationPaidFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    isSaveAddressToken(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    minAmountToken0(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    minAmountToken1(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    platformFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    setAddressToken(
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    testERC20Token(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    userFee(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  Fee(overrides?: CallOverrides): Promise<BigNumber>;

  FeeCollector(overrides?: CallOverrides): Promise<string>;

  allowlistAddressToken1(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  durationPaidFee(overrides?: CallOverrides): Promise<BigNumber>;

  isSaveAddressToken(
    token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  minAmountToken0(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  minAmountToken1(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  platformFee(overrides?: CallOverrides): Promise<BigNumber>;

  setAddressToken(
    token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  testERC20Token(
    token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  userFee(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    Fee(overrides?: CallOverrides): Promise<BigNumber>;

    FeeCollector(overrides?: CallOverrides): Promise<string>;

    allowlistAddressToken1(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    durationPaidFee(overrides?: CallOverrides): Promise<BigNumber>;

    isSaveAddressToken(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    minAmountToken0(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minAmountToken1(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    platformFee(overrides?: CallOverrides): Promise<BigNumber>;

    setAddressToken(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    testERC20Token(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    userFee(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    Fee(overrides?: CallOverrides): Promise<BigNumber>;

    FeeCollector(overrides?: CallOverrides): Promise<BigNumber>;

    allowlistAddressToken1(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    durationPaidFee(overrides?: CallOverrides): Promise<BigNumber>;

    isSaveAddressToken(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minAmountToken0(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minAmountToken1(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    platformFee(overrides?: CallOverrides): Promise<BigNumber>;

    setAddressToken(
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    testERC20Token(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userFee(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    Fee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    FeeCollector(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowlistAddressToken1(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    durationPaidFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isSaveAddressToken(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minAmountToken0(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minAmountToken1(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    platformFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setAddressToken(
      token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    testERC20Token(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
