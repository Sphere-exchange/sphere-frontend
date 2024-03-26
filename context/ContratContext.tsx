import React, { createContext, useEffect, useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import artifactPair from '../artifacts/contracts/Pair.sol/Pair.json'
import artifactToken from '../artifacts/contracts/Token.sol/Token.json'
import artifactFaucet from '../artifacts/contracts/Faucet.sol/Faucet.json'
import artifactFactoryPair from '../artifacts/contracts/FactoryPair.sol/FactoryPair.json'
import artifactMainValueWallet from '../artifacts/contracts/MainValueWallet.sol/MainValueWallet.json'
import artifactSettingExchangefrom from '../artifacts/contracts/SettingExchange.sol/SettingExchange.json'
import artifactFeeController from '../artifacts/contracts/FeeController.sol/FeeController.json'
import artifactChat from '../artifacts/contracts/Chat.sol/Chat.json'
import artifactRouter from '../artifacts/contracts/Router.sol/Router.json'
import {
  Pair,
  Pair__factory,
  Token,
  Token__factory,
  Faucet,
  Faucet__factory,
  FactoryPair,
  FactoryPair__factory,
  MainValueWallet,
  MainValueWallet__factory,
  SettingExchange,
  SettingExchange__factory,
  FeeController,
  FeeController__factory,
  Chat,
  Chat__factory,
  Router,
  Router__factory,
} from '../typechain-types'

import {
  ContractFaucet,
  ContractFactoryPair,
  ContractMainValueWallet,
  ContractSettingExchange,
  ContractFeeController,
  ContractChat,
  ContractRouter,
} from '../utils/Address'
import {
  toEtherandFixFloatingPoint,
  toWei,
  toEther,
  toEtherFloatingPoint,
} from '../utils/UnitInEther'
import { MainChainID, RPCNETWORK } from '../utils/valueConst'
import { useAccount, useNetwork } from 'wagmi'
import {
  queryPairs,
  queryTokens,
  queryWalletHistorys,
  queryHistoryOrders,
  queryHistoryMarkets,
} from '../utils/graphQuery'
import { fitterSumOrderPrice, getARP } from '../utils/calculate'

interface IContract {
  loadingOrderSell: boolean
  loadingOrderBuy: boolean
  loadOrderBook: () => Promise<void>
  orderBookSell: Order[]
  orderBookBuy: Order[]
  priceToken: string
  sendTxMarketOrder: (
    side: number,
    _amount: number | string,
    _minimumPrice: number | string
  ) => Promise<string | void>
  balancesSpotToken0: string
  balancesSpotToken1: string
  sendTxLimitOrder: (
    side: number,
    amount: number | string,
    price: number | string
  ) => Promise<string | void>
  isLoadingOrderBookByAddress: boolean
  orderBookByAddress: Order[]
  sendTxCancelOrder: (
    side: number,
    id: number | string
  ) => Promise<string | void>
  marketEvent: TypeOrderMarket[]
  isLoadingMarketEvent: boolean
  loadHistoryMarketOrder: () => Promise<void>
  historyOrderEvent: TypeOrderHistory[]
  // sumMarketEvent:EventMarketOrder[]
  sendTxDeposit: (
    amount: number | string,
    addressToken: string
  ) => Promise<string | void>
  sendTxWithdraw: (
    amount: number | string,
    addressToken: string
  ) => Promise<string | void>
  tradingViewList: TypesTradingViewOriginal[]
  loadHistoryByAddress: () => Promise<void>
  timeUnLockFaucet: number
  sendTxFaucet: () => Promise<string | void>
  setContractPairOrderAddress: (address: string) => void
  setContractToken0Address: (address: string) => void
  setContractToken1Address: (address: string) => void
  symbolToken0: string
  symbolToken1: string
  checkFactoryPair: (
    addressToken0: string,
    addressToken1: string
  ) => Promise<string | void>
  sendTxCreatePair: (
    addressToken0: string,
    addressToken1: string
  ) => Promise<string | void>
  listPairOrder: TypeListPairOrder[]
  isLoadingListFactoryPairAddress: boolean
  ContractPairOrderAddress: string
  ContractToken0Address: string
  ContractToken1Address: string
  loadListFactoryPairAddress: () => Promise<void>
  listAddressToken: TypeListAddressToken[]
  isLoadingListAddressToken: boolean
  loadListAddressToken: (showLoading: boolean) => Promise<void>
  sendTxApproveToken: (addressToken: string) => Promise<string | void>
  sendTxApproveTokenRouter: (addressToken: string) => Promise<string | void>
  triggerWallet: boolean
  loadBalanceOfToken: (addressToken: string) => Promise<string | void>
  loadAllowanceToken: (addressToken: string) => Promise<string | void>
  loadBalanceSpotToken: (addressToken: string) => Promise<string | void>
  sendTxTransfer: (
    _amount: number | string,
    addressToken: string,
    to: string
  ) => Promise<string | void>
  isLoadingWalletHistory: boolean
  walletHistory: TypeWalletHistory[]
  loadWalletHistory: () => Promise<void>
  isLoadingFirstOpenWebsite: boolean
  isLoadingPairTrade: boolean
  triggerLoadPairTrade: boolean
  setTriggerLoadPairTrade: (b: boolean) => void
  loadPriceToken: () => Promise<void>
  loadBalances: () => Promise<void>
  fee: number
  minAmountToken0: string
  minAmountToken1: string
  allowlistAddressToken1: TypeListAllowlistAddressToken1[]
  sendTxChat: (msg: string) => Promise<string | void>
  loadChat: (showLoading: boolean) => Promise<void>
  dataChat: TypeChatHistory[]
  isLoadingChat: boolean
  loadFeeAPRInformationByPrice: (
    pair: string,
    price?: string
  ) => Promise<{
    resultFee: [boolean, string]
    price: string
    resultPriceRange: {
      upperTickPrice: string
      lowerTickPrice: string
    }
    resultFeeData: {
      earnedBuy: string
      rewardRateBuy: number
      finishAtBuy: number
      totalSupplyBuy: number
      earnedSell: string
      rewardRateSell: number
      finishAtSell: number
      totalSupplySell: number
    }
  } | void>

  loadFeeAPRInformationByTickFeeID: (
    pair: string,
    tickFeeID: string | BigNumber
  ) => Promise<{
    resultFee: [boolean, string | BigNumber]
    price: string
    resultPriceRange: {
      upperTickPrice: string
      lowerTickPrice: string
    }
    resultFeeData: {
      earnedBuy: string
      rewardRateBuy: number
      finishAtBuy: number
      totalSupplyBuy: number
      earnedSell: string
      rewardRateSell: number
      finishAtSell: number
      totalSupplySell: number
    }
  } | void>
  orderBookFee: OrderFee[]
  loadingOrderFee: boolean
  loadFeeOrderBook: (sizeLoad: number) => Promise<void>
  sendTxClaimFee: (
    addressPair: string,
    side: number,
    tickFeeID: string
  ) => Promise<string | void>
  sendTxRouterTradeBoth: (
    srcToken: string,
    dstToken: string,
    amountIn: string,
    amountOutMin: string,
    to: string,
    amountInPath: any[],
    path: any[][]
  ) => Promise<string | void>
  sendTxRouterTradeDex: (
    dstToken: string,
    amountOutMin: string,
    to: string,
    amountIn: any[],
    path: any[][]
  ) => Promise<string | void>
  loadAllowanceTokenRouter: (
    addressToken: string
  ) => Promise<string | undefined | void>
  sendTxRouterTradeExchange: (
    amountIn: string,
    srcToken: string,
    dstToken: string,
    amountOutMin: string,
    to: string
  ) => Promise<string | void>
}

export const ContractContext = createContext<IContract>({
  loadingOrderSell: false,
  loadingOrderBuy: false,
  loadOrderBook: async () => {},
  orderBookSell: [],
  orderBookBuy: [],
  priceToken: '0',
  sendTxMarketOrder: async () => {},
  balancesSpotToken0: '',
  balancesSpotToken1: '',
  sendTxLimitOrder: async () => {},
  isLoadingOrderBookByAddress: false,
  orderBookByAddress: [],
  sendTxCancelOrder: async () => {},
  marketEvent: [],
  isLoadingMarketEvent: false,
  loadHistoryMarketOrder: async () => {},
  historyOrderEvent: [],
  // sumMarketEvent: [],
  sendTxDeposit: async () => {},
  sendTxWithdraw: async () => {},
  tradingViewList: [],
  loadHistoryByAddress: async () => {},
  timeUnLockFaucet: 0,
  sendTxFaucet: async () => {},
  setContractPairOrderAddress: () => {},
  setContractToken0Address: () => {},
  setContractToken1Address: () => {},
  symbolToken0: '',
  symbolToken1: '',
  checkFactoryPair: async () => {},
  sendTxCreatePair: async () => {},
  listPairOrder: [],
  isLoadingListFactoryPairAddress: true,
  ContractPairOrderAddress: '',
  ContractToken0Address: '',
  ContractToken1Address: '',
  loadListFactoryPairAddress: async () => {},
  listAddressToken: [],
  isLoadingListAddressToken: false,
  loadListAddressToken: async () => {},
  sendTxApproveToken: async () => {},
  sendTxApproveTokenRouter: async () => {},
  triggerWallet: false,
  loadBalanceOfToken: async () => {},
  loadAllowanceToken: async () => {},
  loadBalanceSpotToken: async () => {},
  sendTxTransfer: async () => {},
  isLoadingWalletHistory: false,
  walletHistory: [],
  loadWalletHistory: async () => {},
  isLoadingFirstOpenWebsite: false,
  isLoadingPairTrade: false,
  setTriggerLoadPairTrade: async () => {},
  triggerLoadPairTrade: false,
  loadPriceToken: async () => {},
  loadBalances: async () => {},
  fee: 0,
  minAmountToken0: '',
  minAmountToken1: '',
  allowlistAddressToken1: [],
  sendTxChat: async () => {},
  loadChat: async () => {},
  dataChat: [],
  isLoadingChat: false,
  loadFeeAPRInformationByPrice: async () => {},
  loadFeeAPRInformationByTickFeeID: async () => {},
  orderBookFee: [],
  loadingOrderFee: false,
  loadFeeOrderBook: async () => {},
  sendTxClaimFee: async () => {},
  sendTxRouterTradeBoth: async () => {},
  sendTxRouterTradeDex: async () => {},
  sendTxRouterTradeExchange: async () => {},
  loadAllowanceTokenRouter: async () => {},
})

interface ChildrenProps {
  children: React.ReactNode
}

export const ContractProvider = ({ children }: ChildrenProps) => {
  const { chain, chains } = useNetwork()
  let providerWindow: ethers.providers.Web3Provider
  let providerRPC: ethers.providers.JsonRpcProvider
  providerRPC = new ethers.providers.JsonRpcProvider(RPCNETWORK)

  if (typeof window !== 'undefined') {
    try {
      providerWindow = new ethers.providers.Web3Provider(window.ethereum as any)
    } catch (error) {}
  }

  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms))

  const [initialLoading, setInitialLoading] = useState(true)

  // contract address
  const [ContractPairOrderAddress, setContractPairOrderAddress] = useState('')
  const [ContractToken0Address, setContractToken0Address] = useState('')
  const [ContractToken1Address, setContractToken1Address] = useState('')

  const getPairOrderContractDynamic = (address: string) => {
    const pairordercontract = new ethers.Contract(
      address,
      artifactPair.abi,
      providerRPC
    ) as Pair

    return pairordercontract
  }
  const getPairOrderContract = () => {
    const pairordercontract = new ethers.Contract(
      ContractPairOrderAddress,
      artifactPair.abi,
      providerRPC
    ) as Pair

    return pairordercontract
  }
  const getPairOrderContractSigner = () => {
    const signer = providerWindow.getSigner()
    const pairordercontract = new ethers.Contract(
      ContractPairOrderAddress,
      artifactPair.abi,
      signer
    ) as Pair

    return pairordercontract
  }
  const getTokenContract = (tokenAddress: string) => {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      artifactToken.abi,
      providerRPC
    ) as Token

    return tokenContract
  }
  const getTokenContractSigner = (tokenAddress: string) => {
    const signer = providerWindow.getSigner()
    const tokenContract = new ethers.Contract(
      tokenAddress,
      artifactToken.abi,
      signer
    ) as Token

    return tokenContract
  }

  const getFaucetContract = () => {
    const faucetContract = new ethers.Contract(
      ContractFaucet,
      artifactFaucet.abi,
      providerRPC
    ) as Faucet

    return faucetContract
  }
  const getFaucetContractSigner = () => {
    const signer = providerWindow.getSigner()
    const faucetContract = new ethers.Contract(
      ContractFaucet,
      artifactFaucet.abi,
      signer
    ) as Faucet

    return faucetContract
  }
  const getFactoryPairContract = () => {
    const factoryPairContract = new ethers.Contract(
      ContractFactoryPair,
      artifactFactoryPair.abi,
      providerRPC
    ) as FactoryPair

    return factoryPairContract
  }
  const getFactoryPairContractSigner = () => {
    const signer = providerWindow.getSigner()
    const factoryPairContract = new ethers.Contract(
      ContractFactoryPair,
      artifactFactoryPair.abi,
      signer
    ) as FactoryPair

    return factoryPairContract
  }
  const getMainValueWalletContract = () => {
    const mainValueWalletContract = new ethers.Contract(
      ContractMainValueWallet,
      artifactMainValueWallet.abi,
      providerRPC
    ) as MainValueWallet

    return mainValueWalletContract
  }
  const getMainValueWalletContractSigner = () => {
    const signer = providerWindow.getSigner()
    const mainValueWalletContract = new ethers.Contract(
      ContractMainValueWallet,
      artifactMainValueWallet.abi,
      signer
    ) as MainValueWallet

    return mainValueWalletContract
  }

  const getSettingExchangeContract = () => {
    const settingExchangeContract = new ethers.Contract(
      ContractSettingExchange,
      artifactSettingExchangefrom.abi,
      providerRPC
    ) as SettingExchange

    return settingExchangeContract
  }

  const getChatContract = () => {
    const chatContract = new ethers.Contract(
      ContractChat,
      artifactChat.abi,
      providerRPC
    ) as Chat

    return chatContract
  }

  const getChatContractSigner = () => {
    const signer = providerWindow.getSigner()
    const chatContract = new ethers.Contract(
      ContractChat,
      artifactChat.abi,
      signer
    ) as Chat

    return chatContract
  }

  const getFeeControllerContract = () => {
    const feeControllerContract = new ethers.Contract(
      ContractFeeController,
      artifactFeeController.abi,
      providerRPC
    ) as FeeController

    return feeControllerContract
  }

  const getFeeControllerContractSigner = () => {
    const signer = providerWindow.getSigner()
    const feeControllerContract = new ethers.Contract(
      ContractFeeController,
      artifactFeeController.abi,
      signer
    ) as FeeController

    return feeControllerContract
  }

  const getRouterContractSigner = () => {
    const signer = providerWindow.getSigner()
    const routerrContract = new ethers.Contract(
      ContractRouter,
      artifactRouter.abi,
      signer
    ) as Router

    return routerrContract
  }

  // order sell
  const [orderBookSell, setOrderBookSell] = useState<Order[]>([])
  const [loadingOrderSell, setLoadingOrderSell] = useState(false)

  // order buy
  const [orderBookBuy, setOrderBookBuy] = useState<Order[]>([])
  const [loadingOrderBuy, setLoadingOrderBuy] = useState(false)

  // fee order
  const [orderBookFee, setOrderBookFee] = useState<OrderFee[]>([])
  const [loadingOrderFee, setLoadingOrderFee] = useState(false)

  // price
  const [priceToken, setPriceToken] = useState<string>('')

  // setting exchange
  const [fee, setFee] = useState<number>(0)
  const [minAmountToken0, setMinAmountToken0] = useState<string>('')
  const [minAmountToken1, setMinAmountToken1] = useState<string>('')
  const [allowlistAddressToken1, setAllowlistAddressToken1] = useState<
    TypeListAllowlistAddressToken1[]
  >([])

  // balances
  const [balancesSpotToken0, setBalancesSpotToken0] = useState<string>('')
  const [balancesSpotToken1, setBalancesSpotToken1] = useState<string>('')

  // order by address
  const [orderBookByAddress, setOrderBookByAddress] = useState<Order[]>([])
  const [isLoadingOrderBookByAddress, setIsLoadingOrderBookByAddress] =
    useState(true)

  // Market order
  const [marketEvent, setMarketEvent] = useState<TypeOrderMarket[]>([])

  // Loading Market order
  const [isLoadingMarketEvent, setIsLoadingMarketEvent] = useState(false)

  // History order
  const [historyOrderEvent, setHistoryOrderEvent] = useState<
    TypeOrderHistory[]
  >([])

  // tradingView
  const [tradingViewList, setTradingViewList] = useState<
    TypesTradingViewOriginal[]
  >([])

  // Time Faucet
  const [timeUnLockFaucet, setTimeUnLockFaucet] = useState<number>(0)

  //Metadata token
  const [symbolToken0, setSymbolToken0] = useState('')
  const [symbolToken1, setSymbolToken1] = useState('')

  // Data List PairOrder
  const [listPairOrder, setListPairOrder] = useState<TypeListPairOrder[]>([])

  // Loading  List PairOrder
  const [isLoadingListFactoryPairAddress, setIsLoadingListFactoryPairAddress] =
    useState(false)

  // Data List AddressToken
  const [listAddressToken, setListAddressToken] = useState<
    TypeListAddressToken[]
  >([])

  // Loading List AddressToken
  const [isLoadingListAddressToken, setIsLoadingListAddressToken] =
    useState(false)

  // Data trigger Wallet
  const [triggerWallet, setTriggerWallet] = useState(false)

  // Data  WalletHistory
  const [walletHistory, setWalletHistory] = useState<TypeWalletHistory[]>([])

  // Loading List AddressToken
  const [isLoadingWalletHistory, setIsLoadingWalletHistory] = useState(false)

  // Loading first open website
  const [isLoadingFirstOpenWebsite, setIsLoadingFirstOpenWebsite] =
    useState(false)

  // Loading pair trade
  const [isLoadingPairTrade, setIsLoadingPairTrade] = useState(false)

  // Data trigger load pair trade
  const [triggerLoadPairTrade, setTriggerLoadPairTrade] = useState(false)

  // Data  Chat
  const [dataChat, setDataChat] = useState<TypeChatHistory[]>([])

  // Loading Chat
  const [isLoadingChat, setIsLoadingChat] = useState(false)

  // when first open website
  useEffect(() => {
    if (!window.ethereum) console.log('Please install metamask')
    const loadInit = async () => {
      setIsLoadingFirstOpenWebsite(true)
      await Promise.all([
        loadListFactoryPairAddress(),
        loadListAddressToken(true),
        loadWalletHistory(),
        loadListAllowlistAddressToken1(),
        addlistenerMarketEvents(),
        loadTimeFaucet(),
        loadChat(true),
      ])
      // await delay(1000)
      setIsLoadingFirstOpenWebsite(false)
    }
    loadInit()
    setInitialLoading(false)
  }, [])

  // when trade
  useEffect(() => {
    if (!window.ethereum) console.log('Please install metamask')
    const loadInit = async () => {
      setIsLoadingPairTrade(true)
      await Promise.all([
        loadPriceToken(),
        loadBalances(),
        loadFeeAndMinAmountTrade(),
        loadMetaDataToken(),
        loadOrderBook(),

        loadHistoryByAddress(),
        loadHistoryMarketOrder(),

        // loadFeeOrderBook(2),

        addlistenerMarketEvents(),
      ])
      // await delay(1000)
      setIsLoadingPairTrade(false)
    }

    loadInit()
    setInitialLoading(false)
  }, [triggerLoadPairTrade])

  const sendTxDeposit = async (
    _amount: number | string,
    addressToken: string
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const amount = toWei(_amount)
      const contract = getMainValueWalletContractSigner()

      const transactionHash = await contract.deposit(amount, addressToken)

      await transactionHash.wait()

      loadListAddressToken(false)
      setTriggerWallet(!triggerWallet)
      return transactionHash.hash
    } catch (error: any) {
      throw new Error(error.reason)
      // throw new Error(error.error.data.message)
    }
  }
  const sendTxApproveToken = async (addressToken: string) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const token = getTokenContractSigner(addressToken)
      const transactionHashApprove = await token.approve(
        ContractMainValueWallet,
        ethers.constants.MaxUint256
      )
      await transactionHashApprove.wait()
      setTriggerWallet(!triggerWallet)
      return transactionHashApprove.hash
    } catch (error: any) {
      throw new Error(error.reason)
      // throw new Error(error.error.data.message)
    }
  }
  const sendTxApproveTokenRouter = async (addressToken: string) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const token = getTokenContractSigner(addressToken)
      const transactionHashApprove = await token.approve(
        ContractRouter,
        ethers.constants.MaxUint256
      )
      await transactionHashApprove.wait()
      setTriggerWallet(!triggerWallet)
      return transactionHashApprove.hash
    } catch (error: any) {
      throw new Error(error.reason)
      // throw new Error(error.error.data.message)
    }
  }
  const sendTxWithdraw = async (
    _amount: number | string,
    addressToken: string
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const amount = toWei(_amount)
      const contract = getMainValueWalletContractSigner()
      const transactionHash = await contract.withdraw(amount, addressToken)

      await transactionHash.wait()

      loadListAddressToken(false)
      setTriggerWallet(!triggerWallet)
      return transactionHash.hash
    } catch (error: any) {
      throw new Error(error.reason)
    }
  }

  const sendTxTransfer = async (
    _amount: number | string,
    addressToken: string,
    to: string
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const amount = toWei(_amount)
      const contract = getMainValueWalletContractSigner()

      const transactionHash = await contract.transferBetweenAccounts(
        amount,
        addressToken,
        to
      )

      await transactionHash.wait()

      loadListAddressToken(false)
      setTriggerWallet(!triggerWallet)
      return transactionHash.hash
    } catch (error: any) {
      console.log(error)
      throw new Error(error.reason)
    }
  }

  const sendTxFaucet = async () => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const contract = getFaucetContractSigner()
      const transactionHash = await contract.getFaucet()

      await transactionHash.wait()
      loadTimeFaucet()
      loadListAddressToken(false)
      return transactionHash.hash
    } catch (error: any) {
      console.log(error)
      throw new Error(error.reason)
    }
  }

  const sendTxClaimFee = async (
    addressPair: string,
    side: number,
    tickFeeID: string
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const contract = getFeeControllerContractSigner()
      const transactionHash = await contract.claimFee(
        addressPair,
        side,
        tickFeeID
      )

      await transactionHash.wait()
      loadListAddressToken(false)
      return transactionHash.hash
    } catch (error: any) {
      console.log(error)
      throw new Error(error.reason)
    }
  }

  const sendTxMarketOrder = async (
    side: number,
    _amount: number | string,
    _minimumPrice: number | string
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const contract = getPairOrderContractSigner()
      const amount = toWei(_amount)
      let minimumPrice
      if (_minimumPrice != undefined || _minimumPrice != '') {
        minimumPrice = toWei(_minimumPrice)
      } else {
        minimumPrice = 0
      }
      const transactionHash = await contract.createMarketOrder(
        side,
        amount,
        minimumPrice
      )

      await transactionHash.wait()

      loadPriceToken()
      loadOrderBook()
      loadBalances()
      loadHistoryByAddress()
      loadHistoryMarketOrder()

      return transactionHash.hash
    } catch (error: any) {
      throw new Error(error.reason)
    }
  }

  const sendTxLimitOrder = async (
    side: number,
    _amount: number | string,
    _price: number | string
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const amount = toWei(_amount)
      const price = toWei(_price)
      const contractPairOrder = getPairOrderContractSigner()
      const contractFeeController = getFeeControllerContract()

      let lengthToFind = 100

      let startIndex = toWei(0)
      let prevNodeID
      while (true) {
        prevNodeID = await contractPairOrder._findIndex(
          price,
          side,
          startIndex,
          lengthToFind
        )
        if (prevNodeID[0] == true) {
          break
        }
        startIndex = prevNodeID[1]
      }
      let tickFeeID = await contractFeeController.findTickFeeByPrice(
        ContractPairOrderAddress,
        price
      )
      // if false -> set = true

      const transactionHash = await contractPairOrder.createLimitOrder(
        side,
        amount,
        price,
        prevNodeID[1],
        tickFeeID[1],
        !tickFeeID[0]
      )

      await transactionHash.wait()

      loadPriceToken()
      loadHistoryMarketOrder()
      loadOrderBook()
      loadBalances()
      loadHistoryByAddress()

      return transactionHash.hash
    } catch (error: any) {
      console.log(error)
      console.log(error.reason)
      throw new Error(error.reason)
    }
  }

  const sendTxCancelOrder = async (side: number, id: number | string) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const contract = getPairOrderContractSigner()

      let lengthToFind = 100

      let startIndex = toWei(0)
      let prevNodeID
      while (true) {
        prevNodeID = await contract._findPrevOrder(
          side,
          startIndex,
          id,
          lengthToFind
        )
        if (prevNodeID[0] == true) {
          break
        }
        startIndex = prevNodeID[1]
      }

      const transactionHash = await contract.removeOrder(
        side,
        id,
        prevNodeID[1],
        false
      )

      await transactionHash.wait()

      loadPriceToken()
      loadHistoryMarketOrder()
      loadOrderBook()
      loadBalances()
      loadHistoryByAddress()

      return transactionHash.hash
    } catch (error: any) {
      throw new Error(error.reason)
    }
  }

  const sendTxCreatePair = async (
    addressToken0: string,
    addressToken1: string
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      const contract = getFactoryPairContractSigner()
      const transactionHash = await contract.createPair(
        addressToken0,
        addressToken1
      )

      await transactionHash.wait()

      loadListFactoryPairAddress()
      loadListAddressToken(false)

      return transactionHash.hash
    } catch (error: any) {
      throw new Error(error.reason)
    }
  }

  const sendTxChat = async (msg: string) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()

      const contract = getChatContractSigner()

      const transactionHash = await contract.chat(msg)

      await transactionHash.wait()

      loadChat(false)
      return transactionHash.hash
    } catch (error: any) {
      throw new Error(error.reason)
    }
  }

  // address dstToken,
  // uint256 amountOutMin,
  // address payable to,
  // uint256[] memory amountIn,
  // address[][] memory path

  const sendTxRouterTradeDex = async (
    dstToken: string,
    amountOutMin: string,
    to: string,
    amountIn: any[],
    path: any[][]
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()

      const contract = getRouterContractSigner()
      const amountInWei = amountIn.map((item) => toWei(item))
      const transactionHash = await contract.trade(
        dstToken,
        toWei(amountOutMin),
        to,
        amountInWei,
        path
      )

      await transactionHash.wait()
      setTriggerWallet(!triggerWallet)
      return transactionHash.hash
    } catch (error: any) {
      throw new Error(error.reason)
    }
  }

  // function tradeExchange(
  //   uint256 amountIn,
  //   address srcToken,
  //   address dstToken,
  //   uint256 amountOutMin,
  //   address payable to

  const sendTxRouterTradeExchange = async (
    amountIn: string,
    srcToken: string,
    dstToken: string,
    amountOutMin: string,
    to: string
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()

      const contract = getRouterContractSigner()
      const transactionHash = await contract.tradeExchange(
        toWei(amountIn),
        srcToken,
        dstToken,
        toWei(amountOutMin),
        to
      )

      await transactionHash.wait()
      setTriggerWallet(!triggerWallet)
      return transactionHash.hash
    } catch (error: any) {
      throw new Error(error.reason)
    }
  }

  const sendTxRouterTradeBoth = async (
    srcToken: string,
    dstToken: string,
    amountIn: string,
    amountOutMin: string,
    to: string,
    amountInPath: any[],
    path: any[][]
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (chain!.id != MainChainID) throw new Error()
      console.log('come')
      const contract = getRouterContractSigner()
      const amountInWei = amountInPath.map((item) => toWei(item))
      console.log('amountIn', amountIn)
      console.log('amountOutMin', amountOutMin)
      console.log('amountInWei', amountInWei)
      console.log('path', path)
      // const transactionHash = await contract.tradeBoth(srcToken,dstToken,toWei(amountIn),toWei(amountOutMin),to,amountInPath,path)
      const transactionHash = await contract.tradeBoth(
        srcToken,
        dstToken,
        toWei(amountIn),
        toWei(amountOutMin),
        to,
        amountInWei,
        path
      )

      await transactionHash.wait()
      setTriggerWallet(!triggerWallet)
      return transactionHash.hash
    } catch (error: any) {
      throw new Error(error.reason)
    }
  }

  const checkFactoryPair = async (
    addressToken0: string,
    addressToken1: string
  ) => {
    try {
      if (!window.ethereum) console.log('Please install metamask')
      const contract = getFactoryPairContract()
      const result = await contract.getPair(addressToken0, addressToken1)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  const loadBalanceOfToken = async (addressToken: string) => {
    try {
      if (!window.ethereum) console.log('Please install metamask')
      const contractToken = getTokenContract(addressToken)
      const accounts = await window!.ethereum!.request({
        method: 'eth_accounts',
      })
      const result = await contractToken.balanceOf(accounts[0])
      return toEtherandFixFloatingPoint(result)
    } catch (error) {
      console.log(error)
    }
  }

  const loadBalanceSpotToken = async (addressToken: string) => {
    try {
      if (!window.ethereum) console.log('Please install metamask')
      const contractMainValueWallet = getMainValueWalletContract()
      const accounts = await window!.ethereum!.request({
        method: 'eth_accounts',
      })
      const result = await contractMainValueWallet.balancesSpot(
        accounts[0],
        addressToken
      )
      return toEtherandFixFloatingPoint(result)
    } catch (error) {
      console.log(error)
    }
  }

  const loadAllowanceToken = async (addressToken: string) => {
    try {
      if (!window.ethereum) console.log('Please install metamask')
      const contractToken = getTokenContract(addressToken)
      const accounts = await window!.ethereum!.request({
        method: 'eth_accounts',
      })
      const result = await contractToken.allowance(
        accounts[0],
        ContractMainValueWallet
      )
      return toEtherandFixFloatingPoint(result)
    } catch (error) {
      console.log(error)
    }
  }

  const loadAllowanceTokenRouter = async (addressToken: string) => {
    try {
      if (!window.ethereum) console.log('Please install metamask')
      const contractToken = getTokenContract(addressToken)
      const accounts = await window!.ethereum!.request({
        method: 'eth_accounts',
      })
      const result = await contractToken.allowance(accounts[0], ContractRouter)
      return toEtherandFixFloatingPoint(result)
    } catch (error) {
      console.log(error)
    }
  }

  const loadListFactoryPairAddress = async () => {
    try {
      if (!window.ethereum) console.log('Please install metamask')
      setIsLoadingListFactoryPairAddress(true)
      setListPairOrder([])
      const result = (await queryPairs()).pairs
      let dataListPairOrderTemp: TypeListPairOrder[] = []

      result.map((data, index) => {
        const struct: TypeListPairOrder = {
          addressContractPair: data.id,
          addressToken0: data.token0.id,
          addressToken1: data.token1.id,
          symbolToken0: data.token0.symbol,
          symbolToken1: data.token1.symbol,
          price: data.price,
          totalSuplly: toEtherandFixFloatingPoint(BigNumber.from('0')),
          totalVolumeToken0: Number(data.totalVolumeToken0).toFixed(2),
          totalVolumeToken1: Number(data.totalVolumeToken0).toFixed(2),
          change24H: Number(data.change24H).toFixed(2),
          high24H: Number(data.high24H).toFixed(2),
          low24H: Number(data.low24H).toFixed(2),
          volumeToken024H: Number(data.volumeToken024H).toFixed(2),
          volumeToken124H: Number(data.volumeToken124H).toFixed(2),
        }
        dataListPairOrderTemp.push(struct)
      })
      setListPairOrder(dataListPairOrderTemp)
      setIsLoadingListFactoryPairAddress(false)
    } catch (error) {
      setIsLoadingListFactoryPairAddress(false)
      console.log(error)
    }
  }

  const loadListAddressToken = async (showLoading: boolean) => {
    try {
      if (!window.ethereum) console.log('Please install metamask')
      if (showLoading) {
        setIsLoadingListAddressToken(true)
        setListAddressToken([])
      }

      const contractMainValueWallet = getMainValueWalletContract()

      const accounts = await window!.ethereum!.request({
        method: 'eth_accounts',
      })

      const listAddressToken = (await queryTokens()).tokens
      let dataListAddressTokenTemp: TypeListAddressToken[] = []
      await Promise.all(
        listAddressToken.map(async (data, index) => {
          const contractToken = getTokenContract(data.id)
          const [
            dataAllowanceToken,
            dataBalancesSpotUser,
            dataBalancesTradeUser,
            dataBalanceOfToken,
          ] = await Promise.all([
            contractToken.allowance(accounts[0], ContractMainValueWallet),
            contractMainValueWallet.balancesSpot(accounts[0], data.id),
            contractMainValueWallet.balancesTrade(accounts[0], data.id),
            contractToken.balanceOf(accounts[0]),
          ])

          const struct: TypeListAddressToken = {
            addressToken: data.id,
            symbolToken: data.symbol.toUpperCase(),
            nameToken: data.name,
            balanceSpot: toEtherFloatingPoint(dataBalancesSpotUser, 6),
            balanceTrade: toEtherFloatingPoint(dataBalancesTradeUser, 6),
            total: toEtherFloatingPoint(
              dataBalancesSpotUser.add(dataBalancesTradeUser),
              6
            ),
            allowanceToken: toEtherFloatingPoint(dataAllowanceToken, 6),
            balanceOfToken: toEtherFloatingPoint(dataBalanceOfToken, 6),
          }
          dataListAddressTokenTemp.push(struct)
        })
      )
      dataListAddressTokenTemp.sort((a, b) =>
        a.symbolToken.localeCompare(b.symbolToken)
      )
      setListAddressToken(dataListAddressTokenTemp)
      setIsLoadingListAddressToken(false)
    } catch (error) {
      setIsLoadingListAddressToken(false)
      console.log(error)
    }
  }

  const loadListAllowlistAddressToken1 = async () => {
    try {
      if (!window.ethereum) console.log('Please install metamask')
      const contract = getSettingExchangeContract()
      const length = (
        await contract.allAllowlistAddressToken1Length()
      ).toNumber()
      const Fixlength = 30
      let listAllowlistAddressToken1: string[] = []
      let tempAllowlistAddressToken1 = Array(length)
        .fill(0)
        .map((n, i) => n + i)
      await Promise.all(
        tempAllowlistAddressToken1.map(async (item, index) => {
          listAllowlistAddressToken1.push(
            await contract.allAllowlistAddressToken1(item)
          )
        })
      )
      let dataListAllowlistAddressToken1Temp: TypeListAllowlistAddressToken1[] =
        []
      await Promise.all(
        listAllowlistAddressToken1.map(async (address, index) => {
          const contractToken = getTokenContract(address)
          const [dataSymbolToken] = await Promise.all([contractToken.symbol()])

          const struct: TypeListAllowlistAddressToken1 = {
            addressToken: address,
            symbolToken: dataSymbolToken,
          }
          dataListAllowlistAddressToken1Temp.push(struct)
        })
      )
      dataListAllowlistAddressToken1Temp.sort((a, b) =>
        a.symbolToken.localeCompare(b.symbolToken)
      )
      setAllowlistAddressToken1(dataListAllowlistAddressToken1Temp)
    } catch (error) {
      console.log(error)
    }
  }

  const loadWalletHistory = async () => {
    try {
      //TypeWalletHistory
      if (!window.ethereum) console.log('Please install metamask')

      setIsLoadingWalletHistory(true)
      setWalletHistory([])

      const accounts = await window!.ethereum!.request({
        method: 'eth_accounts',
      })

      const listWalletHistory = (await queryWalletHistorys(accounts[0]))
        .historyWallets
      let dataListWalletHistory: TypeWalletHistory[] = []
      await Promise.all(
        listWalletHistory.map(async (item, index) => {
          const struct: TypeWalletHistory = {
            Date: item.transaction.timestamp,
            Type: item.action,
            addressToken: item.token.id,
            symbolToken: item.token.symbol,
            nameToken: item.token.name,
            amount: toEtherandFixFloatingPoint(item.amount),
            from: item.from.id,
            to: item.to?.id,
          }
          dataListWalletHistory.push(struct)
        })
      )
      // dataListWalletHistory.sort((a, b) => b.Date - a.Date)
      setWalletHistory(dataListWalletHistory)
      setIsLoadingWalletHistory(false)
    } catch (error) {
      setIsLoadingWalletHistory(false)
      console.log(error)
    }
  }

  const loadTimeFaucet = async () => {
    try {
      if (!window.ethereum) console.log('Please install metamask')
      const accounts = await window!.ethereum!.request({
        method: 'eth_accounts',
      })
      const contract = getFaucetContract()
      const time = await contract.timeFaucet(accounts[0])
      setTimeUnLockFaucet(time.toNumber())
    } catch (error) {
      console.log(error)
    }
  }

  const loadMetaDataToken = async () => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      setSymbolToken0('')
      setSymbolToken1('')
      const token0 = getTokenContract(ContractToken0Address)
      const token1 = getTokenContract(ContractToken1Address)
      const [dataMetaDataToken0, dataMetaDataToken1] = await Promise.all([
        token0.symbol(),
        token1.symbol(),
      ])

      setSymbolToken0(dataMetaDataToken0.toUpperCase())
      setSymbolToken1(dataMetaDataToken1.toUpperCase())
    } catch (error) {
      console.log(error)
    }
  }

  const loadPriceToken = async () => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      const contract = getPairOrderContract()

      const dataPriceToken = await contract.price()

      setPriceToken(toEtherandFixFloatingPoint(dataPriceToken))
    } catch (error) {
      console.log(error)
    }
  }

  const loadBalances = async () => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      const contract = getMainValueWalletContract()
      const accounts = await window!.ethereum!.request({
        method: 'eth_accounts',
      })

      const [dataBalancesSpotToken0, dataBalancesSpotToken1] =
        await Promise.all([
          contract.balancesSpot(accounts[0], ContractToken0Address),
          contract.balancesSpot(accounts[0], ContractToken1Address),
        ])
      setBalancesSpotToken0(toEtherFloatingPoint(dataBalancesSpotToken0, 6))
      setBalancesSpotToken1(toEtherFloatingPoint(dataBalancesSpotToken1, 6))
    } catch (error) {
      console.log(error)
    }
  }

  const loadFeeAndMinAmountTrade = async () => {
    try {
      if (!window.ethereum) console.log('Please install metamask')
      const contract = getSettingExchangeContract()

      const [dataFee, dataMinAmountToken0, dataMinAmountToken1] =
        await Promise.all([
          contract.Fee(),
          contract.minAmountToken0(ContractPairOrderAddress),
          contract.minAmountToken1(ContractPairOrderAddress),
        ])
      setFee(dataFee.toNumber())
      setMinAmountToken0(toEther(dataMinAmountToken0))
      setMinAmountToken1(toEther(dataMinAmountToken1))
    } catch (error) {
      console.log(error)
    }
  }

  const loadOrderBook = async () => {
    if (!window.ethereum) console.log('Please install metamask')

    setLoadingOrderBuy(true)
    setLoadingOrderSell(true)
    setIsLoadingOrderBookByAddress(true)
    try {
      // setOrderBookBuy([])
      // setOrderBookSell([])
      let address = ethers.constants.AddressZero
      if (window.ethereum) {
        address = (
          await window!.ethereum!.request({ method: 'eth_accounts' })
        )[0]
      }
      const contract = getPairOrderContractDynamic(ContractPairOrderAddress)

      const findOrder = async (side: number) => {
        const listSize = await contract.listSize(side)
        let lastNode =
          '115792089237316195423570985008687907853269984665640564039457584007913129639935'
        let maxFindLength = listSize.toNumber()
        let lengthToFind = 100
        let startIndex = toWei(0)
        let dataOrder: [Pair.OrderStructOutput[], ethers.BigNumber] = [
          [],
          toWei(0),
        ]
        let listTempOrder: Pair.OrderStructOutput[] = []
        while (true) {
          if (lengthToFind > maxFindLength) lengthToFind = maxFindLength
          dataOrder = await contract.getOrderBook(
            side,
            startIndex,
            lengthToFind
          )
          startIndex = dataOrder[1]
          maxFindLength -= lengthToFind
          listTempOrder = [...listTempOrder, ...dataOrder[0]]
          if (dataOrder[1].toString() == lastNode) {
            break
          }
        }
        return listTempOrder
      }

      const [dataOrderSell, dataOrderBuy] = await Promise.all([
        findOrder(1),
        findOrder(0),
      ])

      // console.log(dataOrderSell.toString())
      // console.log(dataOrderBuy.toString())

      let tempDataOrderBuy: Order[] = []
      let tempDataOrderSell: Order[] = []
      let tempDataOrderByAddress: Order[] = []
      await Promise.all(
        dataOrderBuy.map((order) => {
          const structOrder: Order = {
            id: order.id.toNumber(),
            addressTrader: order.trader,
            BuyOrSell: order.isBuy,
            createdDate: order.createdDate.toString(),
            addressToken: order.token.toString(),
            amount: toEtherandFixFloatingPoint(order.amount.sub(order.filled)),
            price: toEtherandFixFloatingPoint(order.price),
            total: (
              Number(toEther(order.amount.sub(order.filled))) *
              Number(toEther(order.price))
            ).toFixed(4),
            filled: toEtherFloatingPoint(order.filled, 4),
          }
          tempDataOrderBuy.push(structOrder)
          if (order.trader.toLocaleLowerCase() === address)
            tempDataOrderByAddress.push(structOrder)
        })
      )
      await Promise.all(
        dataOrderSell.map((order) => {
          const structOrder: Order = {
            id: order.id.toNumber(),
            addressTrader: order.trader.toString(),
            BuyOrSell: order.isBuy,
            createdDate: order.createdDate.toString(),
            addressToken: order.token.toString(),
            amount: toEtherandFixFloatingPoint(order.amount.sub(order.filled)),
            price: toEtherandFixFloatingPoint(order.price),
            total: (
              Number(toEther(order.amount.sub(order.filled))) *
              Number(toEther(order.price))
            ).toFixed(4),
            filled: toEtherandFixFloatingPoint(order.filled),
          }
          tempDataOrderSell.push(structOrder)
          if (order.trader.toLocaleLowerCase() === address)
            tempDataOrderByAddress.push(structOrder)
        })
      )
      tempDataOrderByAddress.sort(
        (a, b) => Number(b.createdDate) - Number(a.createdDate)
      )

      setOrderBookBuy(fitterSumOrderPrice(tempDataOrderBuy, 4))
      setOrderBookSell(fitterSumOrderPrice(tempDataOrderSell, 4))
      setOrderBookByAddress(tempDataOrderByAddress)

      setLoadingOrderBuy(false)
      setLoadingOrderSell(false)
      setIsLoadingOrderBookByAddress(false)
    } catch (error) {
      setLoadingOrderBuy(false)
      setLoadingOrderSell(false)
      setIsLoadingOrderBookByAddress(false)

      console.log(error)
    }
  }

  const loadHistoryByAddress = async () => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      const accounts = await window!.ethereum!.request({
        method: 'eth_accounts',
      })

      const listOrderHistoryByAddress = (await queryHistoryOrders(accounts[0]))
        .historyOrders

      let dataListOrderHistoryByAddressTemp: TypeOrderHistory[] = []

      listOrderHistoryByAddress.map(async (item, index) => {
        const struct: TypeOrderHistory = {
          Type: item.type,
          date: item.date,
          isBuy: item.isBuy,
          price: toEtherFloatingPoint(item.price, 6),
          amount: toEtherFloatingPoint(item.amount, 6),
          Action: item.action,
          executed: toEtherFloatingPoint(item.executed, 6),
        }
        dataListOrderHistoryByAddressTemp.push(struct)
      })
      // dataListOrderHistoryByAddressTemp.sort((a, b) => b.date - a.date)

      setHistoryOrderEvent(dataListOrderHistoryByAddressTemp)
    } catch (error) {
      console.log(error)
    }
  }
  const loadHistoryMarketOrder = async () => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      setTradingViewList([])
      setIsLoadingMarketEvent(true)

      let listOrderHistoryMarketOrder = (
        await queryHistoryMarkets(ContractPairOrderAddress)
      ).historyMarkets
      let dataListMarketOrderTemp: TypeOrderMarket[] = []
      let tradingViewTemp: TypesTradingViewOriginal[] = []

      listOrderHistoryMarketOrder.map(async (item, index) => {
        const struct: TypeOrderMarket = {
          isBuy: item.isBuy,
          amount:
            item.isBuy == 0
              ? (
                  Number(toEther(item.amount)) / Number(toEther(item.price))
                ).toFixed(6)
              : toEtherFloatingPoint(item.amount, 6),
          price: toEtherandFixFloatingPoint(item.price),
          date: item.date,
        }
        dataListMarketOrderTemp.push(struct)

        const dataTradingView: TypesTradingViewOriginal = {
          BuyOrSell: item.isBuy,
          price: Number(ethers.utils.formatEther(item.price)),
          time: item.date,
        }
        tradingViewTemp.push(dataTradingView)
      })
      // dataListMarketOrderTemp.sort((a, b) => b.sortIndex - a.sortIndex)
      // tradingViewTemp.sort((a, b) => a.sortIndex - b.sortIndex)
      setMarketEvent(dataListMarketOrderTemp)

      setTradingViewList(tradingViewTemp)
      setIsLoadingMarketEvent(false)
    } catch (error) {
      setIsLoadingMarketEvent(false)
      console.log(error)
    }
  }

  const loadChat = async (showLoading: boolean) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      if (showLoading) {
        setIsLoadingChat(true)
        setDataChat([])
      }
      const contract = getChatContract()
      const listChat = await contract.getLatestMessageChat(100)
      let dataListChatTemp: TypeChatHistory[] = []
      listChat.map(async (item, index) => {
        const struct: TypeChatHistory = {
          msg: item.messageData,
          user: item.sender,
          date: item.time.toNumber(),
        }
        dataListChatTemp.push(struct)
      })
      dataListChatTemp.sort((a, b) => a.date - b.date)
      setDataChat(dataListChatTemp)
      setIsLoadingChat(false)
    } catch (error) {
      setIsLoadingChat(false)
      console.log(error)
    }
  }

  const loadFeeOrderBook = async (sizeLoad: number) => {
    if (!window.ethereum) console.log('Please install metamask')

    setLoadingOrderFee(true)

    try {
      setOrderBookFee([])
      const contractFeeController = getFeeControllerContract()
      const contractPairOrder = getPairOrderContract()
      let price = toEtherandFixFloatingPoint(await contractPairOrder.price())
      let resultFindTickFeeByPrice =
        await contractFeeController.findTickFeeByPrice(
          ContractPairOrderAddress,
          toWei(price)
        )
      let resultFee = [
        resultFindTickFeeByPrice[0],
        resultFindTickFeeByPrice[1],
      ] as [boolean, BigNumber]

      let listUp = Array.from({ length: sizeLoad }, (_, index) =>
        resultFindTickFeeByPrice[1].add(BigNumber.from(index)).toString()
      )
      let listDown = Array.from({ length: sizeLoad }, (_, index) =>
        resultFindTickFeeByPrice[1].sub(BigNumber.from(index)).sub(1).toString()
      )

      let allList = [...listUp, ...listDown]

      let dataListFeeInfoTemp: OrderFee[] = []
      await Promise.all(
        allList.map(async (tickFeeID) => {
          const resultTickFeeByID = await contractFeeController.infoTickFee(
            ContractPairOrderAddress,
            tickFeeID
          )
          if (
            !resultTickFeeByID.lowerTickPrice.eq(0) &&
            !resultTickFeeByID.upperTickPrice.eq(0)
          ) {
            const [infoFeeBuy, infoFeeSell] = await Promise.all([
              contractFeeController.infoFee(
                ContractPairOrderAddress,
                0,
                tickFeeID
              ),
              contractFeeController.infoFee(
                ContractPairOrderAddress,
                1,
                tickFeeID
              ),
            ])

            const structOrder: OrderFee = {
              tickFeeID: tickFeeID,
              upperPrice: toEtherFloatingPoint(
                resultTickFeeByID.upperTickPrice,
                2
              ),
              lowerPrice: toEtherFloatingPoint(
                resultTickFeeByID.lowerTickPrice,
                2
              ),
              aprBuy: getARP(
                Number(toEther(infoFeeBuy.rewardRate)),
                Number(toEther(infoFeeBuy.totalSupply)),
                Number(price),
                1,
                infoFeeBuy.finishAt.toNumber()
              ),
              aprSell: getARP(
                Number(toEther(infoFeeSell.rewardRate)),
                Number(toEther(infoFeeSell.totalSupply)),
                1,
                Number(price),
                infoFeeSell.finishAt.toNumber()
              ),
            }

            dataListFeeInfoTemp.push(structOrder)
          }
        })
      )
      dataListFeeInfoTemp.sort(
        (a, b) => Number(a.upperPrice) - Number(b.upperPrice)
      )
      setOrderBookFee(dataListFeeInfoTemp)

      setLoadingOrderFee(false)
    } catch (error) {
      setLoadingOrderFee(false)
      console.log(error)
    }
  }

  const loadFeeAPRInformationByPrice = async (pair: string, price?: string) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      const contractFeeController = getFeeControllerContract()
      const pairOrder = getPairOrderContractDynamic(pair)
      if (price == undefined) {
        price = toEtherandFixFloatingPoint(await pairOrder.price())
      }
      let resultFindTickFeeByPrice =
        await contractFeeController.findTickFeeByPrice(pair, toWei(price))
      let resultFee = [
        resultFindTickFeeByPrice[0],
        resultFindTickFeeByPrice[1].toString(),
      ] as [boolean, string]
      let resultPriceRange = {
        upperTickPrice: '0',
        lowerTickPrice: '0',
      }
      let resultFeeData = {
        earnedBuy: '0',
        rewardRateBuy: 0,
        finishAtBuy: 0,
        totalSupplyBuy: 0,
        earnedSell: '0',
        rewardRateSell: 0,
        finishAtSell: 0,
        totalSupplySell: 0,
      }
      if (resultFee[0]) {
        let result = await contractFeeController.infoTickFee(pair, resultFee[1])
        resultPriceRange = {
          upperTickPrice: toEtherandFixFloatingPoint(result.upperTickPrice),
          lowerTickPrice: toEtherandFixFloatingPoint(result.lowerTickPrice),
        }

        let accounts = ethers.constants.AddressZero
        try {
          accounts = (
            await window!.ethereum!.request({
              method: 'eth_accounts',
            })
          )[0]

          const [infoFeeBuy, infoFeeSell, earnedBuy, earnedSell] =
            await Promise.all([
              contractFeeController.infoFee(pair, 0, resultFee[1]),
              contractFeeController.infoFee(pair, 1, resultFee[1]),
              contractFeeController.earned(accounts, pair, 0, resultFee[1]),
              contractFeeController.earned(accounts, pair, 1, resultFee[1]),
            ])

          resultFeeData = {
            earnedBuy: toEtherFloatingPoint(earnedBuy, 6),
            rewardRateBuy: Number(toEther(infoFeeBuy.rewardRate)),
            finishAtBuy: infoFeeBuy.finishAt.toNumber(),
            totalSupplyBuy: Number(toEther(infoFeeBuy.totalSupply)),
            earnedSell: toEtherFloatingPoint(earnedSell, 6),
            rewardRateSell: Number(toEther(infoFeeSell.rewardRate)),
            finishAtSell: infoFeeSell.finishAt.toNumber(),
            totalSupplySell: Number(toEther(infoFeeSell.totalSupply)),
          }

          price = toEtherandFixFloatingPoint(await pairOrder.price())
        } catch (error) {
          console.log(error)
        }
      }

      return { resultFee, price, resultPriceRange, resultFeeData }
    } catch (error) {
      console.log(error)
    }
  }

  const loadFeeAPRInformationByTickFeeID = async (
    pair: string,
    tickFeeID: string | BigNumber
  ) => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      const contractFeeController = getFeeControllerContract()
      let resultFeeData = {
        earnedBuy: '0',
        rewardRateBuy: 0,
        finishAtBuy: 0,
        totalSupplyBuy: 0,
        earnedSell: '0',
        rewardRateSell: 0,
        finishAtSell: 0,
        totalSupplySell: 0,
      }
      let resultFee = [false, '0'] as [boolean, string | BigNumber]
      let result = await contractFeeController.infoTickFee(pair, tickFeeID)
      let resultPriceRange = {
        upperTickPrice: toEtherandFixFloatingPoint(result.upperTickPrice),
        lowerTickPrice: toEtherandFixFloatingPoint(result.lowerTickPrice),
      }
      if (
        resultPriceRange.upperTickPrice != '0.0000' &&
        resultPriceRange.lowerTickPrice != '0.0000'
      ) {
        resultFee[0] = true
        resultFee[1] = tickFeeID

        let accounts = ethers.constants.AddressZero
        try {
          accounts = (
            await window!.ethereum!.request({ method: 'eth_accounts' })
          )[0]
          const [infoFeeBuy, infoFeeSell, earnedBuy, earnedSell] =
            await Promise.all([
              contractFeeController.infoFee(pair, 0, resultFee[1]),
              contractFeeController.infoFee(pair, 1, resultFee[1]),
              contractFeeController.earned(accounts, pair, 0, resultFee[1]),
              contractFeeController.earned(accounts, pair, 1, resultFee[1]),
            ])

          resultFeeData = {
            earnedBuy: toEtherFloatingPoint(earnedBuy, 6),
            rewardRateBuy: Number(toEther(infoFeeBuy.rewardRate)),
            finishAtBuy: infoFeeBuy.finishAt.toNumber(),
            totalSupplyBuy: Number(toEther(infoFeeBuy.totalSupply)),
            earnedSell: toEtherFloatingPoint(earnedSell, 6),
            rewardRateSell: Number(toEther(infoFeeSell.rewardRate)),
            finishAtSell: infoFeeSell.finishAt.toNumber(),
            totalSupplySell: Number(toEther(infoFeeSell.totalSupply)),
          }
        } catch (error) {
          console.log(error)
        }
      }
      const pairOrder = getPairOrderContractDynamic(pair)
      let price = toEtherandFixFloatingPoint(await pairOrder.price())

      return { resultFee, price, resultPriceRange, resultFeeData }
    } catch (error) {
      console.log(error)
    }
  }

  const addlistenerMarketEvents = async () => {
    if (!window.ethereum) console.log('Please install metamask')
    try {
      const contract = getPairOrderContract()

      contract.on('CreateLimitOrder', async () => {
        loadOrderBook()
      })
      contract.on('RemoveOrder', async () => {
        loadOrderBook()
      })

      contract.on('SumMarketOrder', async () => {
        loadPriceToken()
        loadHistoryMarketOrder()
        loadOrderBook()
        loadBalances()
        loadHistoryByAddress()
      })

      if (window.ethereum != undefined) {
        //@ts-ignore
        window.ethereum.on('accountsChanged', () => {
          console.log('accountsChanged')
          window.location.reload()
        })
        interface ConnectInfo {
          chainId: string
        }

        //@ts-ignore
        window.ethereum.on('chainChanged', (_chainId) => {
          window.location.reload()
        })
      }
    } catch (error) {}
  }

  return (
    <ContractContext.Provider
      value={{
        loadingOrderSell,
        loadingOrderBuy,
        loadOrderBook,
        orderBookSell,
        orderBookBuy,
        priceToken,
        sendTxMarketOrder,
        balancesSpotToken0,
        balancesSpotToken1,
        sendTxLimitOrder,
        isLoadingOrderBookByAddress,
        orderBookByAddress,
        sendTxCancelOrder,
        marketEvent,
        isLoadingMarketEvent,
        loadHistoryMarketOrder,
        historyOrderEvent,
        // sumMarketEvent,
        sendTxDeposit,
        sendTxWithdraw,
        tradingViewList,
        loadHistoryByAddress,
        timeUnLockFaucet,
        sendTxFaucet,

        setContractPairOrderAddress,
        setContractToken0Address,
        setContractToken1Address,

        symbolToken0,
        symbolToken1,

        checkFactoryPair,
        loadListFactoryPairAddress,
        sendTxCreatePair,
        listPairOrder,
        isLoadingListFactoryPairAddress,

        ContractPairOrderAddress,
        ContractToken0Address,
        ContractToken1Address,

        listAddressToken,
        isLoadingListAddressToken,
        loadListAddressToken,

        sendTxApproveToken,
        sendTxApproveTokenRouter,

        triggerWallet,
        loadBalanceOfToken,
        loadAllowanceToken,
        loadBalanceSpotToken,

        sendTxTransfer,

        isLoadingWalletHistory,
        walletHistory,
        loadWalletHistory,

        isLoadingFirstOpenWebsite,
        isLoadingPairTrade,
        setTriggerLoadPairTrade,
        triggerLoadPairTrade,

        loadPriceToken,
        loadBalances,

        fee,
        minAmountToken0,
        minAmountToken1,
        allowlistAddressToken1,

        sendTxChat,
        loadChat,
        dataChat,
        isLoadingChat,

        loadFeeAPRInformationByPrice,
        loadFeeAPRInformationByTickFeeID,

        orderBookFee,
        loadingOrderFee,
        loadFeeOrderBook,
        sendTxClaimFee,

        sendTxRouterTradeBoth,
        sendTxRouterTradeDex,
        sendTxRouterTradeExchange,
        loadAllowanceTokenRouter,
      }}
    >
      {!initialLoading && children}
    </ContractContext.Provider>
  )
}
