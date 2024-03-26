type Props = {}

import React, { useState, useContext, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ContractContext } from '../context/ContratContext'
import {
  notificationToast,
  simpleNotificationToast,
} from '../utils/notificationToastify'

import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'
import { shortenAddress } from '../utils/shortenAddress'
import copy from 'copy-to-clipboard'
import {
  ChevronDownIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/20/solid'
import ModalSelectTokenNoBalance from '../components/ModalSelectTokenNoBalance'
import { BigNumber, ethers } from 'ethers'
import Loader from '../components/Loader'
import { queryDatasPair } from '../utils/graphQuery'
import { getARP } from '../utils/calculate'
import { filterImgSrc } from '../utils/filterImg'

function fee({}: Props) {
  const {
    checkFactoryPair,
    loadFeeAPRInformationByPrice,
    loadFeeAPRInformationByTickFeeID,
    sendTxClaimFee,
  } = useContext(ContractContext)
  const { address, isConnected } = useAccount()

  const [inputPrice, setInputPrice] = useState('0')

  const [modalAddressBaseToken, setModalaAddressBaseToken] = useState(
    ethers.constants.AddressZero
  )
  const [modalSymbolBaseToken, setModalSymbolBaseToken] =
    useState('Select Token')
  const [modalAddressQuoteToken, setModalaAddressQuoteToken] = useState(
    ethers.constants.AddressZero
  )
  const [modalSymbolQuoteToken, setModalSymbolQuoteToken] =
    useState('Select Token')

  const [showModalSelectBaseToken, setShowModalSelectBaseToken] =
    useState(false)
  const [showModalSelectQuoteToken, setShowModalSelectQuoteToken] =
    useState(false)

  const [loadingPair, setloadingPair] = useState(false)
  const [loadingPriceRangeAPR, setLoadingPriceRangeAPR] = useState(false)

  const [showSelectPriceRange, setShowSelectPriceRange] = useState(false)
  const [showFeeInfo, setShowFeeInfo] = useState(false)

  const [currentPrice, setCurrentPrice] = useState('0')
  const [minPrice, setMinPrice] = useState('0')
  const [maxPrice, setMaxPrice] = useState('0')
  const [currentTickFeeID, setCurrentTickFeeID] = useState('0')
  const [aprBuy, setAPRBuy] = useState('0')
  const [aprSell, setAPRSell] = useState('0')
  const [earnBuy, seteEarnBuy] = useState('0')
  const [earnSell, seteEarnSell] = useState('0')
  const [haveInFoFee, setHaveInFoFee] = useState(false)

  const [isAdd, setIsAdd] = useState(false)
  const [isExistPair, setIsExistPair] = useState(true)
  const [pair, setPair] = useState(ethers.constants.AddressZero)
  const [extendPrice, setExtendPrice] = useState('0')
  useEffect(() => {
    async function checkPair() {
      if (
        modalAddressBaseToken != ethers.constants.AddressZero &&
        modalAddressQuoteToken != ethers.constants.AddressZero
      ) {
        setloadingPair(true)
        const isExistPair = await checkFactoryPair(
          modalAddressBaseToken,
          modalAddressQuoteToken
        )
        if (isExistPair != ethers.constants.AddressZero && isExistPair) {
          const dataPair = (
            await queryDatasPair(isExistPair.toLocaleLowerCase())
          ).pair
          if (dataPair) {
            setModalaAddressBaseToken(dataPair.token0.id)
            setModalSymbolBaseToken(dataPair.token0.symbol)
            setModalaAddressQuoteToken(dataPair.token1.id)
            setModalSymbolQuoteToken(dataPair.token1.symbol)
          }
          setPair(isExistPair)
          const resultFeeInfo = await loadFeeAPRInformationByPrice(isExistPair)
          if (resultFeeInfo) {
            setHaveInFoFee(resultFeeInfo.resultFee[0])
            setCurrentTickFeeID(resultFeeInfo.resultFee[1])
            setCurrentPrice(resultFeeInfo.price)
            setMinPrice(resultFeeInfo.resultPriceRange.lowerTickPrice)
            setMaxPrice(resultFeeInfo.resultPriceRange.upperTickPrice)
            seteEarnBuy(resultFeeInfo.resultFeeData.earnedBuy)
            seteEarnSell(resultFeeInfo.resultFeeData.earnedSell)
            setAPRBuy(
              getARP(
                resultFeeInfo.resultFeeData.rewardRateBuy,
                resultFeeInfo.resultFeeData.totalSupplyBuy,
                Number(resultFeeInfo.price),
                1,
                resultFeeInfo.resultFeeData.finishAtBuy
              )
            )
            setAPRSell(
              getARP(
                resultFeeInfo.resultFeeData.rewardRateSell,
                resultFeeInfo.resultFeeData.totalSupplySell,
                1,
                Number(resultFeeInfo.price),
                resultFeeInfo.resultFeeData.finishAtSell
              )
            )
          }
          setShowSelectPriceRange(true)
          setShowFeeInfo(true)
        }else{
          setIsExistPair(false)
        }
        setloadingPair(false)
      }
    }
    checkPair()
  }, [modalAddressBaseToken, modalAddressQuoteToken])

  return (
    <div className="flex flex-1 justify-center items-center mt-3 xs:mt-10">
      <div className="flex flex-col gap-5 w-[95vw] sm:w-[80vw] md:w-[70vw] xl:w-[60vw] 2xl:w-[40vw]">
        <span className="text-2xl sm:text-3xl  font-semibold textShadowWhite">
          Fee information
        </span>

        <div className="flex flex-col blue-glassmorphism p-5  gap-10 text-sm lg:text-base">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col  pb-4">
              <div className="font-semibold text-xl mb-4">Select pair</div>
              <div className="flex flex-row gap-6 text-sm w-full">
                <div className="flex flex-col gap-2 ">
                  <span className="font-semibold">Base token</span>
                  <div
                    className="w-fit cursor-pointer  group flex items-center rounded-md gap-3  px-3 py-2 text-base bgblackbn hover:bg-gray-800 text-white  outline-none"
                    onClick={() => setShowModalSelectBaseToken(true)}
                  >
                    <img
                      src={filterImgSrc(modalAddressBaseToken)}
                      alt="picture of token"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className=" flex flex-col text-left">
                      <span className="textShadowWhite">
                        {modalSymbolBaseToken.toLocaleUpperCase()}
                      </span>
                      <div className="flex gap-1">
                        <span className="text-xs textGray">
                          {shortenAddress(modalAddressBaseToken)}
                        </span>
                        <div className="flex">
                          <ClipboardDocumentIcon
                            onClick={(e) => {
                              copy(modalAddressBaseToken)
                              simpleNotificationToast('Copied to clipboard!')
                              e.preventDefault()
                            }}
                            className=" IconHover h-4 w-4 "
                          />
                        </div>
                      </div>
                    </div>
                    <ChevronDownIcon
                      className={`
                  h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 ">
                  <span className="font-semibold">Quote token</span>

                  <div
                    className="w-fit cursor-pointer  group flex items-center rounded-md gap-3  px-3 py-2 text-base bgblackbn hover:bg-gray-800 text-white  outline-none"
                    onClick={() => setShowModalSelectQuoteToken(true)}
                  >
                    <img
                      src={filterImgSrc(modalAddressQuoteToken)}
                      alt="picture of token"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className=" flex flex-col text-left">
                      <span className="textShadowWhite">
                        {modalSymbolQuoteToken.toLocaleUpperCase()}
                      </span>
                      <div className="flex gap-1">
                        <span className="text-xs textGray">
                          {shortenAddress(modalAddressQuoteToken)}
                        </span>
                        <div className="flex">
                          <ClipboardDocumentIcon
                            onClick={(e) => {
                              copy(modalAddressQuoteToken)
                              simpleNotificationToast('Copied to clipboard!')
                              e.preventDefault()
                            }}
                            className=" IconHover h-4 w-4 "
                          />
                        </div>
                      </div>
                    </div>
                    <ChevronDownIcon
                      className={`
                  h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
            {loadingPair ? (
              <div className="flex bg-black/80  justify-center items-center py-3 ">
                <Loader />
              </div>
            ) : (
              <>
              {
                isExistPair ? (
                  <>

                  {showSelectPriceRange && (
                    <div className="flex flex-col  border-t-[1px] border-gray-600 py-4">
                      <div className="font-semibold text-xl mb-4">
                        Select price range
                      </div>
                      <div className="flex flex-row justify-center">
                        <div className="rounded-lg p-2 mb-4">
                          Current price: {currentPrice}
                        </div>
                        <div className="rounded-lg  bgblackbn p-2 mb-4">
                          {modalSymbolBaseToken}/{modalSymbolQuoteToken}
                        </div>
                      </div>
                      <div className="flex justify-evenly items-center">
                        <MinusCircleIcon
                          onClick={async () => {
                            setIsAdd(false)
                            setLoadingPriceRangeAPR(true)
                            let tempTickFeeID =
                              BigNumber.from(currentTickFeeID).sub(1)
                            const resultFeeInfo =
                              await loadFeeAPRInformationByTickFeeID(
                                pair,
                                tempTickFeeID
                              )
                            if (resultFeeInfo) {
                              if (resultFeeInfo.resultFee[0]) {
                                setCurrentTickFeeID(
                                  resultFeeInfo.resultFee[1].toString()
                                )
                                setMinPrice(
                                  resultFeeInfo.resultPriceRange.lowerTickPrice
                                )
                                setMaxPrice(
                                  resultFeeInfo.resultPriceRange.upperTickPrice
                                )
                                setAPRBuy(
                                  getARP(
                                    resultFeeInfo.resultFeeData.rewardRateBuy,
                                    resultFeeInfo.resultFeeData.totalSupplyBuy,
                                    Number(resultFeeInfo.price),
                                    1,
                                    resultFeeInfo.resultFeeData.finishAtBuy
                                  )
                                )
                                setAPRSell(
                                  getARP(
                                    resultFeeInfo.resultFeeData.rewardRateSell,
                                    resultFeeInfo.resultFeeData.totalSupplySell,
                                    1,
                                    Number(resultFeeInfo.price),
                                    resultFeeInfo.resultFeeData.finishAtSell
                                  )
                                )
                                seteEarnBuy(resultFeeInfo.resultFeeData.earnedBuy)
                                seteEarnSell(
                                  resultFeeInfo.resultFeeData.earnedSell
                                )
                              } else {
                                setExtendPrice(minPrice)
                              }
                              setHaveInFoFee(resultFeeInfo.resultFee[0])
                            }
                            setLoadingPriceRangeAPR(false)
                          }}
                          className=" IconHover h-4 w-4 sm:h-8 sm:w-8 "
                        />
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col items-center rounded-lg bgblackbn p-4">
                            {loadingPriceRangeAPR ? (
                              <div className="flex animate-pulse text-sm   justify-center items-center py-3 ">
                                Loading...
                              </div>
                            ) : (
                              <>
                                {haveInFoFee ? (
                                  <div className=" flex flex-row gap-2">
                                    <div className="flex flex-col items-center">
                                      <div className="textGray">Min price</div>
                                      <div>{minPrice}</div>
                                    </div>
                                    <div className="flex flex-col items-end justify-end ">
                                      <div>-</div>
                                    </div>
  
                                    <div className="flex flex-col items-center">
                                      <div className="textGray">Max price</div>
                                      <div>{maxPrice}</div>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    At price{' '}
                                    {isAdd
                                      ? `above ${extendPrice} `
                                      : `lower ${extendPrice}`}{' '}
                                    , no one has create yet
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <PlusCircleIcon
                          onClick={async () => {
                            setIsAdd(true)
                            setLoadingPriceRangeAPR(true)
                            let tempTickFeeID =
                              BigNumber.from(currentTickFeeID).add(1)
                            const resultFeeInfo =
                              await loadFeeAPRInformationByTickFeeID(
                                pair,
                                tempTickFeeID
                              )
                            if (resultFeeInfo) {
                              setHaveInFoFee(resultFeeInfo.resultFee[0])
  
                              if (resultFeeInfo.resultFee[0]) {
                                setCurrentTickFeeID(
                                  resultFeeInfo.resultFee[1].toString()
                                )
                                setMinPrice(
                                  resultFeeInfo.resultPriceRange.lowerTickPrice
                                )
                                setMaxPrice(
                                  resultFeeInfo.resultPriceRange.upperTickPrice
                                )
                                setAPRBuy(
                                  getARP(
                                    resultFeeInfo.resultFeeData.rewardRateBuy,
                                    resultFeeInfo.resultFeeData.totalSupplyBuy,
                                    Number(resultFeeInfo.price),
                                    1,
                                    resultFeeInfo.resultFeeData.finishAtBuy
                                  )
                                )
                                setAPRSell(
                                  getARP(
                                    resultFeeInfo.resultFeeData.rewardRateSell,
                                    resultFeeInfo.resultFeeData.totalSupplySell,
                                    1,
                                    Number(resultFeeInfo.price),
                                    resultFeeInfo.resultFeeData.finishAtSell
                                  )
                                )
                                seteEarnBuy(resultFeeInfo.resultFeeData.earnedBuy)
                                seteEarnSell(
                                  resultFeeInfo.resultFeeData.earnedSell
                                )
                              } else {
                                setExtendPrice(maxPrice)
                              }
                            }
                            setLoadingPriceRangeAPR(false)
                          }}
                          className=" IconHover h-4 w-4 sm:h-8 sm:w-8 "
                        />
                      </div>
  
                      <div className="flex flex-col items-center mt-4 gap-2">
                        <div className="text-sm">
                          Input your price ({modalSymbolBaseToken}/
                          {modalSymbolQuoteToken})
                        </div>
  
                        <div className="flex flex-row gap-2">
                          <input
                            type="text"
                            onKeyPress={(event) => {
                              if (!/^.[0-9]*$/.test(event.key)) {
                                event.preventDefault()
                              }
                            }}
                            onChange={(e) => {
                              setInputPrice(e.target.value)
                            }}
                            className=" text-xs lg:text-sm outline-none pl-4  px-3 py-2 font-semibold bgblackbn border-[1px] border-gray-800
                    hover:border-gray-600    text-white  rounded-lg block w-full"
                            placeholder="0.0"
                            required
                          />
                          <div className=" flex justify-center  ">
                            <button
                              onClick={async () => {
                                setLoadingPriceRangeAPR(true)
                                const resultFeeInfo =
                                  await loadFeeAPRInformationByPrice(
                                    pair,
                                    inputPrice
                                  )
                                if (resultFeeInfo) {
                                  setHaveInFoFee(resultFeeInfo.resultFee[0])
                                  if (resultFeeInfo.resultFee[0]) {
                                    setCurrentTickFeeID(
                                      resultFeeInfo.resultFee[1].toString()
                                    )
                                    setMinPrice(
                                      resultFeeInfo.resultPriceRange
                                        .lowerTickPrice
                                    )
                                    setMaxPrice(
                                      resultFeeInfo.resultPriceRange
                                        .upperTickPrice
                                    )
                                    setAPRBuy(
                                      getARP(
                                        resultFeeInfo.resultFeeData.rewardRateBuy,
                                        resultFeeInfo.resultFeeData
                                          .totalSupplyBuy,
                                        Number(resultFeeInfo.price),
                                        1,
                                        resultFeeInfo.resultFeeData.finishAtBuy
                                      )
                                    )
                                    setAPRSell(
                                      getARP(
                                        resultFeeInfo.resultFeeData
                                          .rewardRateSell,
                                        resultFeeInfo.resultFeeData
                                          .totalSupplySell,
                                        1,
                                        Number(resultFeeInfo.price),
                                        resultFeeInfo.resultFeeData.finishAtSell
                                      )
                                    )
                                    seteEarnBuy(
                                      resultFeeInfo.resultFeeData.earnedBuy
                                    )
                                    seteEarnSell(
                                      resultFeeInfo.resultFeeData.earnedSell
                                    )
                                  } else {
                                    if (
                                      parseFloat(inputPrice) >
                                      parseFloat(maxPrice)
                                    ) {
                                      setIsAdd(true)
                                      setExtendPrice(inputPrice)
                                    }
                                    if (
                                      parseFloat(inputPrice) <
                                      parseFloat(minPrice)
                                    ) {
                                      setIsAdd(false)
                                      setExtendPrice(inputPrice)
                                    }
                                  }
                                }
                                setLoadingPriceRangeAPR(false)
                              }}
                              className="Buttonpurple  !px-2 !py-0 "
                            >
                              Find
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  </>
                ): <div className="flex bg-black/80  justify-center items-center py-3 ">
                 <p>Pair you're looking for doesn't exist </p>
              </div>
              }
      
                {showSelectPriceRange && showFeeInfo && (
                  <div className="flex flex-col  border-t-[1px] border-gray-600   py-4">
                    <div className="font-semibold text-xl mb-4">
                      Fee information
                    </div>
                    <div className="flex flex-row justify-evenly items-center rounded-lg bgblackbn p-4">
                      {loadingPriceRangeAPR ? (
                        <div className="flex animate-pulse text-sm   justify-center items-center py-3 ">
                          Loading...
                        </div>
                      ) : (
                        <>
                          {haveInFoFee ? (
                            <div className=" flex flex-col gap-2 items-center justify-center">
                              <div className="flex flex-col items-center">
                                <div className="textGray">Price range</div>
                                <div>
                                  {minPrice} - {maxPrice}
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-10">
                                <div className="flex flex-col items-center">
                                  <div className="textGray">
                                    Side{' '}
                                    <span className="text-green-400 font-bold">
                                      BUY{' '}
                                    </span>
                                    APR
                                  </div>
                                  <div>{aprBuy} %</div>
                                  <div className="textGray mt-2">
                                    Claimable fees
                                  </div>
                                  <div>
                                    {earnBuy} {modalSymbolBaseToken}
                                  </div>
                                  <button
                                    onClick={() => {
                                      notificationToast(
                                        sendTxClaimFee(
                                          pair,
                                          0,
                                          currentTickFeeID
                                        )
                                      )
                                    }}
                                    className="Buttonpurple px-2 py-1  mt-2"
                                  >
                                    Claim
                                  </button>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className="textGray">
                                    Side{' '}
                                    <span className="text-red-400 font-bold">
                                      SELL{' '}
                                    </span>
                                    APR
                                  </div>
                                  <div>{aprSell} %</div>
                                  <div className="textGray mt-2">
                                    Claimable fees
                                  </div>
                                  <div>
                                    {earnSell} {modalSymbolQuoteToken}
                                  </div>
                                  <button
                                    onClick={() => {
                                      notificationToast(
                                        sendTxClaimFee(
                                          pair,
                                          1,
                                          currentTickFeeID
                                        )
                                      )
                                    }}
                                    className="Buttonpurple px-2 py-1 mt-2"
                                  >
                                    Claim
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              At price{' '}
                              {isAdd
                                ? `above ${extendPrice} `
                                : `lower ${extendPrice}`}{' '}
                              , no one has create yet
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showModalSelectBaseToken && (
        <ModalSelectTokenNoBalance
          onClose={() => setShowModalSelectBaseToken(false)}
          oppositeAddress={modalAddressQuoteToken}
          setDataAddressToken={(address) => setModalaAddressBaseToken(address)}
          setDataSymbolToken={(symbol) => setModalSymbolBaseToken(symbol)}
        />
      )}
      {showModalSelectQuoteToken && (
        <ModalSelectTokenNoBalance
          onClose={() => setShowModalSelectQuoteToken(false)}
          oppositeAddress={modalAddressBaseToken}
          setDataAddressToken={(address) => setModalaAddressQuoteToken(address)}
          setDataSymbolToken={(symbol) => setModalSymbolQuoteToken(symbol)}
        />
      )}
    </div>
  )
}
export default fee
