import React, { useContext, useState } from 'react'
import { ContractContext } from '../context/ContratContext'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import router from 'next/router'
import { notificationToast } from '../utils/notificationToastify'
import  Slider  from './Slider'
import { LightTooltip } from '../utils/muiStyled'

type Props = {}

enum LimitMarketStatus {
  Limit,
  Market,
}

function PanelCommand({}: Props) {
  const {
    sendTxLimitOrder,
    sendTxMarketOrder,
    balancesSpotToken0,
    balancesSpotToken1,
    symbolToken0,
    symbolToken1,
    ContractPairOrderAddress,
    ContractToken0Address,
    ContractToken1Address,
    priceToken,
    fee,
    minAmountToken0,
    minAmountToken1,
  } = useContext(ContractContext)

  const [selectlimitMarket, setSelectlimitMarket] = useState<LimitMarketStatus>(
    LimitMarketStatus.Limit
  )

  // Limit
  const [inputBuyPriceTokenLimitOrder, setInputBuyPriceTokenLimitOrder] =
    useState<string>(priceToken)
  const [inputBuyAmountTokenLimitOrder, setInputBuyAmountTokenLimitOrder] =
    useState<string>()
  const [inputBuyTotalTokenLimitOrder, setInputBuyTotalTokenLimitOrder] =
    useState<string>()
  const [buySliderValue, setBuySliderValue] = useState<number>(0)

  const [inputSellPriceTokenLimitOrder, setInputSellPriceTokenLimitOrder] =
    useState<string>(priceToken)
  const [inputSellAmountTokenLimitOrder, setInputSellAmountTokenLimitOrder] =
    useState<string>()
  const [inputSellTotalTokenLimitOrder, setInputSellTotalTokenLimitOrder] =
    useState<string>()
    const [sellSliderValue, setSellSliderValue] = useState<number>(0)

  // Market
   const [inputBuyAmountTokenMarketOrder, setInputBuyAmountTokenMarketOrder] =
     useState<string>()
   const [maximumBuyPriceTokenMarketOrder, setMaximumBuyPriceTokenMarketOrder] =
     useState<string>('0')
   const [buySliderValueMarket, setBuySliderValueMarket] = useState<number>(0)

   const [inputSellAmountTokenMarketOrder, setInputSellAmountTokenMarketOrder] =
     useState<string>()
   const [minimumSellPriceTokenMarketOrder, setMinimumSellPriceTokenMarketOrder] =
     useState<string>('0')
   const [sellSliderValueMarket, setSellSliderValueMarket] = useState<number>(0)

  return (
    <div className=" px-2 py-2 lg:px-5 lg:py-3  h-full ">
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 ">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectlimitMarket(LimitMarketStatus.Limit)}
            className={` 
            ${
              selectlimitMarket === LimitMarketStatus.Limit
                ? 'Buttonselect !py-2'
                : 'ButtonHover  !py-2'
            } `}
          >
            Limit Order
          </button>
          <button
            onClick={() => setSelectlimitMarket(LimitMarketStatus.Market)}
            className={`
            ${
              selectlimitMarket === LimitMarketStatus.Market
                ? 'Buttonselect !py-2'
                : 'ButtonHover  !py-2'
            } `}
          >
            Market Order
          </button>
        </div>
        <div className="flex gap-2 text-[9px] xs:text-xs">
          <div className="bg-white text-black   py-1 px-2 rounded-md font-semibold ">
            trading fee {(fee / 10000) * 100}%
          </div>
          <div className="bg-[#28252e] text-white   py-1 px-2 rounded-md font-semibold ">
            minimum trade {minAmountToken0} {symbolToken0} / {minAmountToken1}{' '}
            {symbolToken1}
          </div>
        </div>
      </div>

      <div className="  mt-2 flex-row flex space-x-10 justify-center  ">
        <div className="flex flex-col gap-3  w-1/2 ">
          <div className="flex flex-row gap-2 text-[10px] xs:text-xs sm:text-base ">
            <span className=" text-gray-400">Balances</span>
            {balancesSpotToken1 ? (
              <span className=" text-white flex flex-row">
                {balancesSpotToken1} {symbolToken1}
              </span>
            ) : (
              '-'
            )}
            <div className=" flex  items-center ">
              <LightTooltip
                title="Deposit or Withdraw"
                arrow
                placement="bottom"
              >
                <PlusCircleIcon
                  onClick={() => router.push(`/wallet`)}
                  className=" IconHover  h-4 w-4"
                />
              </LightTooltip>
            </div>
          </div>
          {selectlimitMarket === LimitMarketStatus.Limit ? (
            <>
              <div className="InputOrder ">
                <span className="w-[50%] sm:w-[30] lg:w-[25%] flex items-center pl-2 mr-1  text-gray-400">
                  Price
                </span>
                <input
                  type="number"
                  value={inputBuyPriceTokenLimitOrder}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setInputBuyPriceTokenLimitOrder(e.target.value)
                    setInputBuyTotalTokenLimitOrder(
                      (
                        Number(e.target.value) *
                        Number(inputBuyAmountTokenLimitOrder)
                      ).toFixed(5)
                    )
                    setBuySliderValue(
                      Math.round(
                        ((Number(e.target.value) *
                          Number(inputBuyAmountTokenLimitOrder)) /
                          Number(balancesSpotToken1)) *
                          100
                      )
                    )
                  }}
                  className="  w-full py-1 pr-2 text-right  bg-transparent outline-none  text-white"
                />
                <span className="flex items-center justify-end mx-1">
                  {symbolToken1}
                </span>
              </div>
              <div className="InputOrder w-full flex ">
                <span className="w-[50%] sm:w-[30] lg:w-[25%] flex items-center pl-2 mr-1  text-gray-400">
                  Amount
                </span>
                <input
                  type="number"
                  value={inputBuyAmountTokenLimitOrder}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setInputBuyAmountTokenLimitOrder(e.target.value)
                    setInputBuyTotalTokenLimitOrder(
                      (
                        Number(e.target.value) *
                        Number(inputBuyPriceTokenLimitOrder)
                      ).toFixed(5)
                    )
                    setBuySliderValue(
                      Math.round(
                        ((Number(e.target.value) *
                          Number(inputBuyPriceTokenLimitOrder)) /
                          Number(balancesSpotToken1)) *
                          100
                      )
                    )
                  }}
                  className="w-full py-1 pr-2 text-right  bg-transparent outline-none  "
                />
                <span className="flex items-center justify-end mx-1">
                  {symbolToken0}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <Slider
                  price={inputBuyPriceTokenLimitOrder}
                  balances={balancesSpotToken1}
                  value={buySliderValue}
                  setAmount={(amount) =>
                    setInputBuyAmountTokenLimitOrder(amount)
                  }
                  setTotal={(total) => setInputBuyTotalTokenLimitOrder(total)}
                  setValue={(value) => setBuySliderValue(value)}
                  isBuy={true}
                ></Slider>
              </div>
              <div className="InputOrder ">
                <span className="w-[50%] sm:w-[30] lg:w-[25%] flex items-center pl-2 mr-1  text-gray-400">
                  Total
                </span>
                <input
                  type="number"
                  value={inputBuyTotalTokenLimitOrder}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setInputBuyTotalTokenLimitOrder(e.target.value)
                    setInputBuyAmountTokenLimitOrder(
                      (
                        Number(e.target.value) /
                        Number(inputBuyPriceTokenLimitOrder)
                      ).toFixed(5)
                    )
                    setBuySliderValue(
                      Math.round(
                        (Number(e.target.value) / Number(balancesSpotToken1)) *
                          100
                      )
                    )
                  }}
                  className="  w-full py-1 pr-2 text-right  bg-transparent outline-none  "
                />
                <span className="flex items-center justify-end mx-1">
                  {symbolToken1}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="InputOrder ">
                <span className="text-[7px] sm:text-xs w-[100px] xs:w-[150px] sm:w-[230px] flex items-center pl-2 mr-1  text-gray-400 ">
                  Maximum Price{' '}
                  <LightTooltip
                    title="Maximum price is the highest price that user will market buy. If you don't care about market price set it to 0"
                    arrow
                    placement="bottom"
                  >
                    <QuestionMarkCircleIcon className=" IconHover h-3 w-3 xs:h-4 xs:w-4" />
                  </LightTooltip>
                </span>
                <input
                  type="number"
                  value={maximumBuyPriceTokenMarketOrder}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setMaximumBuyPriceTokenMarketOrder(e.target.value)
                  }}
                  className="  w-full py-1 pr-2 text-right  bg-transparent outline-none  "
                />
                <span className="flex items-center justify-end mx-1">
                  {symbolToken1}
                </span>
              </div>
              <div className="InputOrder ">
                <span className="w-[50%] sm:w-[30] lg:w-[25%] flex items-center pl-2 mr-1  text-gray-400">
                  Amount
                </span>
                <input
                  type="number"
                  value={inputBuyAmountTokenMarketOrder}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setInputBuyAmountTokenMarketOrder(e.target.value)
                    setBuySliderValueMarket(
                      Math.round(
                        (Number(e.target.value) / Number(balancesSpotToken1)) *
                          100
                      )
                    )
                  }}
                  className="  w-full py-1 pr-2 text-right  bg-transparent outline-none  "
                />
                <span className="flex items-center justify-end mx-1">
                  {symbolToken1}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <Slider
                  setAmount={(amount) =>
                    setInputBuyAmountTokenMarketOrder(amount)
                  }
                  isMarket={true}
                  isBuy={true}
                  value={buySliderValueMarket}
                  balances={balancesSpotToken1}
                  setValue={(value) => setBuySliderValueMarket(value)}
                  // not use
                  price={inputBuyPriceTokenLimitOrder}
                  setTotal={(total) => setInputBuyTotalTokenLimitOrder(total)}
                ></Slider>
              </div>
            </>
          )}
          <button
            onClick={() => {
              if (selectlimitMarket === LimitMarketStatus.Limit) {
                notificationToast(
                  sendTxLimitOrder(
                    0,
                    inputBuyAmountTokenLimitOrder!,
                    inputBuyPriceTokenLimitOrder!
                  )
                )
              } else if (selectlimitMarket === LimitMarketStatus.Market) {
                notificationToast(
                  sendTxMarketOrder(
                    0,
                    inputBuyAmountTokenMarketOrder!,
                    maximumBuyPriceTokenMarketOrder!
                  )
                )
              }
            }}
            className=" w-full  text-xs sm:text-base text-white rounded bg-green-500 py-2 font-semibold hover:opacity-70 transition-all"
          >
            Buy {symbolToken0}
          </button>
        </div>

        <div className="flex flex-col gap-3  w-1/2 ">
          <div className="flex flex-row gap-2  text-[10px] xs:text-xs sm:text-base">
            <span className=" text-gray-400">Balances</span>
            {balancesSpotToken0 ? (
              <span className=" text-white flex flex-row">
                {balancesSpotToken0} {symbolToken0}
              </span>
            ) : (
              '-'
            )}

            <div className=" flex  items-center ">
              <LightTooltip
                title="Deposit or Withdraw"
                arrow
                placement="bottom"
              >
                <PlusCircleIcon
                  onClick={() => router.push(`/wallet`)}
                  className=" IconHover  h-4 w-4"
                />
              </LightTooltip>
            </div>
          </div>

          {selectlimitMarket === LimitMarketStatus.Limit ? (
            <>
              <div className="InputOrder ">
                <span className="w-[50%] sm:w-[30] lg:w-[25%] flex items-center pl-2 mr-1  text-gray-400">
                  Price
                </span>
                <input
                  type="number"
                  required
                  value={inputSellPriceTokenLimitOrder}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setInputSellPriceTokenLimitOrder(e.target.value)
                    setInputSellTotalTokenLimitOrder(
                      (
                        Number(e.target.value) *
                        Number(inputSellAmountTokenLimitOrder)
                      ).toFixed(5)
                    )
                  }}
                  className=" w-full py-1 pr-2 text-right  bg-transparent outline-none  text-white"
                />
                <span className="flex items-center justify-end mx-1">
                  {symbolToken1}
                </span>
              </div>
              <div className="InputOrder ">
                <span className="w-[50%] sm:w-[30] lg:w-[25%] flex items-center pl-2 mr-1  text-gray-400">
                  Amount
                </span>
                <input
                  type="number"
                  required
                  value={inputSellAmountTokenLimitOrder}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setInputSellAmountTokenLimitOrder(e.target.value)
                    setInputSellTotalTokenLimitOrder(
                      (
                        Number(e.target.value) *
                        Number(inputSellPriceTokenLimitOrder)
                      ).toFixed(5)
                    )
                    setSellSliderValue(
                      Math.round(
                        (Number(e.target.value) / Number(balancesSpotToken0)) *
                          100
                      )
                    )
                  }}
                  className=" w-full py-1 pr-2 text-right  bg-transparent outline-none  "
                />
                <span className="flex items-center justify-end mx-1">
                  {symbolToken0}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <Slider
                  price={inputSellPriceTokenLimitOrder}
                  balances={balancesSpotToken0}
                  value={sellSliderValue}
                  setAmount={(amount) =>
                    setInputSellAmountTokenLimitOrder(amount)
                  }
                  setTotal={(total) => setInputSellTotalTokenLimitOrder(total)}
                  setValue={(value) => setSellSliderValue(value)}
                  isSell={true}
                ></Slider>
              </div>
              <div className="InputOrder ">
                <span className="w-[50%] sm:w-[30] lg:w-[25%] flex items-center pl-2 mr-1  text-gray-400">
                  Total
                </span>
                <input
                  type="number"
                  value={inputSellTotalTokenLimitOrder}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setInputSellTotalTokenLimitOrder(e.target.value)
                    setInputSellAmountTokenLimitOrder(
                      (
                        Number(e.target.value) /
                        Number(inputSellPriceTokenLimitOrder)
                      ).toFixed(5)
                    )
                    setSellSliderValue(
                      Math.round(
                        (Number(e.target.value) /
                          Number(inputSellPriceTokenLimitOrder) /
                          Number(balancesSpotToken0)) *
                          100
                      )
                    )
                  }}
                  className="  w-full py-1 pr-2 text-right  bg-transparent outline-none  "
                />
                <span className="flex items-center justify-end mx-1">
                  {symbolToken1}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="InputOrder ">
                <span className="text-[7px] sm:text-xs w-[100px] xs:w-[150px] sm:w-[230px] flex items-center pl-2 mr-1  text-gray-400 ">
                  Minimum Price{' '}
                  <LightTooltip
                    title="Minimum price is the lowest price that user will market sell. If you don't care about market price set it to 0"
                    arrow
                    placement="bottom"
                  >
                    <QuestionMarkCircleIcon className=" IconHover h-3 w-3 xs:h-4 xs:w-4" />
                  </LightTooltip>
                </span>
                <input
                  type="number"
                  value={minimumSellPriceTokenMarketOrder}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setMinimumSellPriceTokenMarketOrder(e.target.value)
                  }}
                  className="  w-full py-1 pr-2 text-right  bg-transparent outline-none  "
                />
                <span className="flex items-center justify-end mx-1">
                  {symbolToken1}
                </span>
              </div>
              <div className="InputOrder ">
                <span className="w-[50%] sm:w-[30] lg:w-[25%] flex items-center pl-2 mr-1  text-gray-400">
                  Amount
                </span>
                <input
                  type="number"
                  required
                  value={inputSellAmountTokenMarketOrder}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setInputSellAmountTokenMarketOrder(e.target.value)
                    setSellSliderValueMarket(
                      Math.round(
                        (Number(e.target.value) / Number(balancesSpotToken0)) *
                          100
                      )
                    )
                  }}
                  className=" w-full py-1 pr-2 text-right  bg-transparent outline-none  "
                />
                <span className="flex items-center justify-end mx-1">
                  {symbolToken0}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <Slider
                  setAmount={(amount) =>
                    setInputSellAmountTokenMarketOrder(amount)
                  }
                  isMarket={true}
                  isSell={true}
                  value={sellSliderValueMarket}
                  balances={balancesSpotToken0}
                  setValue={(value) => setSellSliderValueMarket(value)}
                  // not use
                  price={inputSellPriceTokenLimitOrder}
                  setTotal={(total) => setInputSellTotalTokenLimitOrder(total)}
                ></Slider>
              </div>
            </>
          )}
          <button
            onClick={() => {
              if (selectlimitMarket === LimitMarketStatus.Limit) {
                notificationToast(
                  sendTxLimitOrder(
                    1,
                    inputSellAmountTokenLimitOrder!,
                    inputSellPriceTokenLimitOrder!
                  )
                )
              } else if (selectlimitMarket === LimitMarketStatus.Market) {
                notificationToast(
                  sendTxMarketOrder(
                    1,
                    inputSellAmountTokenMarketOrder!,
                    minimumSellPriceTokenMarketOrder!
                  )
                )
              }
            }}
            className="w-full text-xs sm:text-base text-white rounded bg-red-500 py-2 font-semibold hover:opacity-70 transition-all"
          >
            Sell {symbolToken0}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PanelCommand
