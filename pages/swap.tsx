import React, { useContext, useEffect, useState } from 'react'
import { Cog6ToothIcon, ArrowDownCircleIcon } from '@heroicons/react/24/solid'
import {
  ChevronDownIcon,
  ClipboardDocumentIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid'
import SVGLoader from '../components/SVGLoader'

import { useAccount, useNetwork } from 'wagmi'
import MySettingModal from '../components/MySettingModal'
import { ContractContext } from '../context/ContratContext'
import { shortenAddress } from '../utils/shortenAddress'
import {
  notificationToast,
  simpleNotificationToast,
} from '../utils/notificationToastify'
import { filterImgSrc, filterAddressToSymbol } from '../utils/filterImg'
import ModalSelectToken from '../components/ModalSelectToken'
import {
  HardCodeTokne0,
  HardCodeSymbol0,
  HardCodeTokne1,
  HardCodeSymbol1,
} from '../utils/valueConst'
import { callBestRateSwap } from '../utils/apiCall'
import Loader from '../components/Loader'

type Props = {}

function swap({}: Props) {
  const {
    loadBalanceOfToken,
    loadAllowanceToken,
    triggerWallet,
    sendTxRouterTradeBoth,
    sendTxRouterTradeDex,
    sendTxRouterTradeExchange,
    loadAllowanceTokenRouter,
    sendTxApproveTokenRouter,
  } = useContext(ContractContext)

  // wagmi
  const { address } = useAccount()
  const { chain } = useNetwork()

  // Modal
  const [showModalEditAddress, setShowModalEditAddress] = useState(false)
  const [showModalSetting, setShowModalSetting] = useState(false)

  // loading
  const [loadingPrice, setLoadingPrice] = useState(false)
  const [loadingIn, setLoadingIn] = useState(false)
  const [loadingOut, setLoadingOut] = useState(false)

  // modal setting swap
  const [slippage, setSlippage] = useState<number>(0.1)
  const [deadline, setDeadline] = useState<number>(20)

  // modal setting Recipient Address
  const [recipientAddress, setRecipientAddress] = useState<string | undefined>(
    address
  )

  //data input
  const [inputIn, setInputIn] = useState<string>('')
  const [inputOut, setInputOut] = useState<string>('')
  // list trade token

  const [modalAddressToken0, setModalaAddressToken0] = useState(HardCodeTokne0)
  const [modalSymbolToken0, setModalSymbolToken0] = useState(HardCodeSymbol0)
  const [isLoading0, setIsLoading0] = useState<boolean>(false)
  const [reqBalanceOfToken0, setReqBalanceOfToken0] = useState<number>(0)
  const [reqAllowanceToken0, setReqAllowanceToken0] = useState<number>(0)
  const [showModalSelectToken0, setShowModalSelectToken0] = useState(false)

  /////////
  const [modalAddressToken1, setModalaAddressToken1] = useState(HardCodeTokne1)
  const [modalSymbolToken1, setModalSymbolToken1] = useState(HardCodeSymbol1)
  const [isLoading1, setIsLoading1] = useState<boolean>(false)
  const [reqBalanceOfToken1, setReqBalanceOfToken1] = useState<number>(0)
  const [reqAllowanceToken1, setReqAllowanceToken1] = useState<number>(0)
  const [showModalSelectToken1, setShowModalSelectToken1] = useState(false)

  const [resultBestRate, setResultBestRate] = useState<TypeResultBestRate>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadBalanceAndAllowanceToken = async () => {
      setIsLoading(true)
      setReqBalanceOfToken0(
        Number(await loadBalanceOfToken(modalAddressToken0))
      )
      setReqBalanceOfToken1(
        Number(await loadBalanceOfToken(modalAddressToken1))
      )
      setIsLoading(false)
    }

    loadBalanceAndAllowanceToken()
  }, [triggerWallet])

  useEffect(() => {
    const loadBalanceAndAllowanceToken = async () => {
      setReqAllowanceToken0(
        Number(await loadAllowanceTokenRouter(modalAddressToken0))
      )
      setReqAllowanceToken1(
        Number(await loadAllowanceTokenRouter(modalAddressToken1))
      )
    }
    loadBalanceAndAllowanceToken()
  }, [modalAddressToken0, modalAddressToken1])

  return (
    <div className="flex mt-5 mb-24 xs:mt-14 p-2 justify-center items-center">
      <div className="relative bg-[#0D111C] px-2 py-3 rounded-3xl border-[1px] border-[#fafafa4d]  w-[375px] xs:w-[450px]">
        <div className="flex flex-row justify-between items-center mb-2 px-2">
          <h1 className="font-bold ">Swap</h1>
          <div
            className="flex flex-row justify-center items-center gap-1 text-xs
            hover:opacity-60 cursor-pointer transition-all bg-violet-600 rounded-2xl py-1 px-3"
            onClick={() => setShowModalSetting(true)}
          >
            <span>{slippage}% slippage</span>
            <Cog6ToothIcon className="h-6 w-6 " />
          </div>
        </div>

        <div
          className={`InputSwap  gap-1 pt-2 pb-3 px-4
        ${loadingIn && 'opacity-50'}
        `}
        >
          <span className="text-gray-500">You pay</span>
          <div className="flex flex-row gap-3">
            <input
              className="text-3xl  w-full   text-left  bg-transparent outline-none  text-white"
              placeholder="0"
              type="number"
              onKeyPress={(event) => {
                if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              onChange={async (e) => {
                setInputIn(e.target.value)
              }}
              onBlur={async (e) => {
                setLoadingPrice(true)
                setLoadingOut(true)
                const result = await callBestRateSwap(
                  Number(inputIn),
                  modalAddressToken0,
                  modalAddressToken1
                )
                if (result) {
                  setInputOut(result.result_amount)
                  setResultBestRate(result)
                }
                setLoadingPrice(false)
                setLoadingOut(false)
              }}
              value={inputIn}
            />
            <div
              className="w-fit cursor-pointer  group flex items-center rounded-md gap-3  px-3 py-2 text-base bg-gray-800 hover:bg-gray-700 text-white  outline-none"
              onClick={() => setShowModalSelectToken0(true)}
            >
              <img
                src={filterImgSrc(modalAddressToken0)}
                alt="picture of token"
                className="h-6 w-h-6 rounded-full"
              />
              <div className=" flex flex-col text-left">
                <span className="textShadowWhite">{modalSymbolToken0}</span>
              </div>
              <ChevronDownIcon
                className={`
                  h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 text-sm text-gray-400">
            <div className="flex flex-row justify-center items-center gap-2">
              <span>Balance</span>
              {isLoading ? <SVGLoader /> : reqBalanceOfToken0}
            </div>
            <span
              onClick={async () => {
                setLoadingPrice(true)
                setLoadingOut(true)
                setInputIn(String(reqBalanceOfToken0))
                const result = await callBestRateSwap(
                  Number(inputIn),
                  modalAddressToken0,
                  modalAddressToken1
                )
                if (result) {
                  setInputOut(result.result_amount)
                  setResultBestRate(result)
                }
                setLoadingPrice(false)
                setLoadingOut(false)
              }}
              className="text-purple-500 cursor-pointer hover:text-purple-700 transition-all"
            >
              Max
            </span>
          </div>
        </div>

        <div
          className="flex justify-center items-center mt-3 mb-3"
          onClick={async () => {
            const tempModalaAddressToken0 = modalAddressToken0
            const tempModalSymbolToken0 = modalSymbolToken0
            const tempReqBalanceOfToken0 = reqBalanceOfToken0
            const tempReqAllowanceToken0 = reqAllowanceToken0
            setModalaAddressToken0(modalAddressToken1)
            setModalSymbolToken0(modalSymbolToken1)
            setReqBalanceOfToken0(reqBalanceOfToken1)
            setReqAllowanceToken0(reqAllowanceToken1)

            setModalaAddressToken1(tempModalaAddressToken0)
            setModalSymbolToken1(tempModalSymbolToken0)
            setReqBalanceOfToken1(tempReqBalanceOfToken0)
            setReqAllowanceToken1(tempReqAllowanceToken0)

            setInputIn('')
            setInputOut('')
          }}
        >
          <ArrowDownCircleIcon className="h-8 w-8 text-white cursor-pointer hover:scale-105 hover:opacity-70 transition-all " />
        </div>

        <div
          className={`InputSwap rounded-b-none gap-1 pt-2 pb-3 px-4
        ${loadingOut && 'opacity-50'}
        `}
        >
          <span className="text-gray-500">You receive</span>
          <div className="flex flex-row gap-3 ">
            <input
              readOnly={true}
              className="text-3xl  w-full cursor-not-allowed   text-left  bg-transparent outline-none  text-white"
              placeholder="0"
              type="number"
              onKeyPress={(event) => {
                event.preventDefault()
              }}
              value={inputOut}
              // onChange={async (e) => {
              //   setLoadingPrice(true)
              //   setLoadingIn(true)
              //   setInputOut(e.target.value)
              //   // const amountIn = await getAmountsIn(
              //   //   e.target.value,
              //   //   addressToken0MainChain,
              //   //   addressToken1MainChain
              //   // )
              //   // setInputIn(amountIn)
              //   setLoadingPrice(false)
              //   setLoadingIn(false)
              // }}
            />
            <div
              className="w-fit cursor-pointer  group flex items-center rounded-md gap-3  px-3 py-2 text-base bg-gray-800 hover:bg-gray-700 text-white  outline-none"
              onClick={() => setShowModalSelectToken1(true)}
            >
              <img
                src={filterImgSrc(modalAddressToken1)}
                alt="picture of token"
                className="h-6 w-h-6 rounded-full"
              />
              <div className=" flex flex-col text-left">
                <span className="textShadowWhite">{modalSymbolToken1}</span>
              </div>
              <ChevronDownIcon
                className={`
                  h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 text-sm text-gray-400">
            <div className="flex flex-row justify-center items-center gap-2">
              <span>Balance</span>
              {isLoading ? <SVGLoader /> : reqBalanceOfToken1}
            </div>
          </div>
        </div>
        <div className="flex flex-row bg-[#121A2A] rounded-b-[15px] mt-[1px] py-2  px-4 items-center gap-2">
          {loadingPrice ? (
            <>
              <SVGLoader />
              <p className="text-white text-xs">Fetching price...</p>
            </>
          ) : (
            <>
              {inputIn == '' || inputOut == '' ? (
                <span className="text-red-600 text-xs">
                  Please input amount
                </span>
              ) : (
                <div className="flex flex-row gap-1">
                  <InformationCircleIcon className="h-4 w-4 text-white  " />
                  <span className="text-xs">
                    1 {modalSymbolToken0} ={' '}
                    {(Number(inputOut) / Number(inputIn)).toFixed(6)}{' '}
                    {modalSymbolToken1}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {reqAllowanceToken0 >= Number(inputIn) ? (
          <button
            onClick={() => {
              if (resultBestRate) {
                if (Number(resultBestRate.result_distribute.orderbook[0]) > 0) {
                  // trade dex and exchange
                  const transformedAmountInPath =
                    resultBestRate.result_distribute.amm
                      .filter((item: any[]) => item[2] > 0)
                      .map((item: any[]) => item[2])
                  const transformedPath = resultBestRate.result_distribute.amm
                    .filter((item: any[]) => item[2] > 0)
                    .map((item: any[]) => [item[0], item[1]])

                  if (transformedAmountInPath.length > 0) {
                    notificationToast(
                      sendTxRouterTradeBoth(
                        modalAddressToken0,
                        modalAddressToken1,
                        resultBestRate.result_distribute.orderbook[0],
                        String(Number(inputOut) * ((100 - slippage) / 100)),
                        address!,
                        transformedAmountInPath,
                        transformedPath
                      )
                    )
                  } else {
                    notificationToast(
                      sendTxRouterTradeExchange(
                        inputIn,
                        modalAddressToken0,
                        modalAddressToken1,
                        String(Number(inputOut) * ((100 - slippage) / 100)),
                        address!
                      )
                    )
                  }
                } else {
                  // trade dex only
                  const transformedAmountInPath =
                    resultBestRate.result_distribute.amm
                      .filter((item: any[]) => item[2] > 0)
                      .map((item: any[]) => item[2])
                  const transformedPath = resultBestRate.result_distribute.amm
                    .filter((item: any[]) => item[2] > 0)
                    .map((item: any[]) => [item[0], item[1]])
                  notificationToast(
                    sendTxRouterTradeDex(
                      modalAddressToken1,
                      String(Number(inputOut) * ((100 - slippage) / 100)),
                      address!,
                      transformedAmountInPath,
                      transformedPath
                    )
                  )
                }
              }
            }}
            disabled={
              loadingPrice || Number(reqBalanceOfToken0) < Number(inputIn)
            }
            className={`mt-2 flex w-full py-3 rounded-2xl  items-center justify-center 
          transition-all   bg-gradient-to-b from-[#8a46ff] to-[#6e38cc] text-white  hover:opacity-60  font-semibold
           ${
             Number(reqBalanceOfToken0) < Number(inputIn) &&
             'cursor-not-allowed'
           }
          `}
          >
            <h1 className="text-xl font-bold">
              {Number(reqBalanceOfToken0) < Number(inputIn)
                ? 'Insufficient user balance'
                : 'Swap'}
            </h1>
          </button>
        ) : (
          <button
            onClick={() => {
              notificationToast(sendTxApproveTokenRouter(modalAddressToken0))
            }}
            className={`mt-2 flex w-full py-3 rounded-2xl  items-center justify-center 
        transition-all   bg-gradient-to-b from-[#8a46ff] to-[#6e38cc] text-white  hover:opacity-60  font-semibold`}
          >
            <h1 className="text-xl font-bold">Approve</h1>
          </button>
        )}

        <div
          className="bg-[#121A2A] flex flex-row mt-2 rounded-lg py-2 px-4 justify-between items-center
         text-gray-300  text-xs"
        >
          <div>
            <p>Minimum received</p>
            <p>Liquidity Provider Fee</p>
          </div>
          <div className="flex flex-col justify-center items-end">
            {loadingPrice ? (
              <div>calculating...</div>
            ) : (
              <p>{(Number(inputOut) * ((100 - slippage) / 100)).toFixed(6)}</p>
            )}

            <p>0.1% fee</p>
          </div>
        </div>

        <div
          className="bg-[#121A2A] flex flex-col mt-2 rounded-lg py-2 px-4 justify-center items-start
         text-gray-300  text-xs"
        >
          <div className="mb-2 font-bold">Router</div>
          {loadingOut ? (
            <div className="ml-5">
              <Loader />
            </div>
          ) : (
            <>
              <div className="mx-2 ml-3 font-bold">AMM DEX</div>
              <div className="ml-5 mb-2">
                {resultBestRate &&
                resultBestRate.result_distribute.amm &&
                resultBestRate.result_distribute.amm.length > 0 ? (
                  resultBestRate.result_distribute.amm
                    .filter((item: any[]) => item[2] > 0)
                    .map((item: any[]) => (
                      <div className="">
                        |_ {item[2]} {filterAddressToSymbol(item[0])} ⇒{' '}
                        {filterAddressToSymbol(item[1])} at Pancakeswap
                      </div>
                    ))
                ) : (
                  <>
                    <div>-</div>
                  </>
                )}
              </div>
              <div className="mx-2 ml-3 font-bold">OrderBook DEX</div>
              <div className="ml-5 mb-2">
                {resultBestRate &&
                resultBestRate.result_distribute.orderbook &&
                resultBestRate.result_distribute.orderbook?.length > 0 ? (
                  resultBestRate.result_distribute.orderbook.map((item) => (
                    <>
                      {item > 0 && (
                        <div className="">
                          |_ {item} {modalSymbolToken0} ⇒ {modalSymbolToken1} at
                          Sphere exchange
                        </div>
                      )}
                    </>
                  ))
                ) : (
                  <>
                    <div>-</div>
                  </>
                )}
              </div>
              <div className="mx-2 ml-3 ">
                {resultBestRate && (
                  <>
                    <div>
                      <span className="font-bold">Received </span>
                      {resultBestRate.result_amount} {modalSymbolToken1}
                    </div>
                    <div>
                      {' '}
                      <span className="font-bold">Time </span>
                      {resultBestRate.total_time} sec
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {showModalSetting && (
        <MySettingModal
          onClose={() => setShowModalSetting(false)}
          setSlippage={setSlippage}
          slippage={slippage}
          setDeadline={setDeadline}
          deadline={deadline}
        />
      )}
      {showModalSelectToken0 && (
        <ModalSelectToken
          onClose={() => setShowModalSelectToken0(false)}
          oppositeAddress={modalAddressToken1}
          setDataAddressToken={(address) => setModalaAddressToken0(address)}
          setDataSymbolToken={(symbol) => setModalSymbolToken0(symbol)}
          setReqAllowanceToken={(allownace) => {}}
          setReqBalanceOfToken={(balance) => setReqBalanceOfToken0(balance)}
          setIsLoading={(isLoading) => setIsLoading0(isLoading)}
          IsDeposit={true}
        />
      )}
      {showModalSelectToken1 && (
        <ModalSelectToken
          onClose={() => setShowModalSelectToken1(false)}
          oppositeAddress={modalAddressToken0}
          setDataAddressToken={(address) => setModalaAddressToken1(address)}
          setDataSymbolToken={(symbol) => setModalSymbolToken1(symbol)}
          setReqAllowanceToken={(allownace) => {}}
          setReqBalanceOfToken={(balance) => setReqBalanceOfToken1(balance)}
          setIsLoading={(isLoading) => setIsLoading1(isLoading)}
          IsDeposit={true}
        />
      )}
    </div>
  )
}

export default swap
