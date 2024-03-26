import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ContractContext } from '../context/ContratContext'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { FloatingPoint } from '../utils/UnitInEther'
import { delay } from '../utils/Delay'

type Props = {}

enum ShowOrderBookStatus {
  BS = 'BuySell',
  S = 'Sell',
  B = 'Buy',
}

enum ShowOrderBookOrFee {
  OrderBook = 'OrderBook',
  Fee = 'Fee',
}

function OrderBook({}: Props) {
  const {
    orderBookFee,
    loadingOrderFee,
    loadFeeOrderBook,
    ContractPairOrderAddress,
    loadOrderBook,
    loadingOrderBuy,
    loadingOrderSell,
    isLoadingOrderBookByAddress,
    orderBookBuy,
    orderBookSell,
    symbolToken0,
    symbolToken1,
    priceToken,
  } = useContext(ContractContext)

  const [statusShowOrderBook, setStatusShowOrderBook] =
    useState<ShowOrderBookStatus>(ShowOrderBookStatus.BS)

  const [showOrderBookOrFee, setShowOrderBookOrFee] =
    useState<ShowOrderBookOrFee>(ShowOrderBookOrFee.OrderBook)

  const [isLoadingRefresh, setIsLoadingRefresh] = useState<boolean>(false)

  const getSumAmountALlOrder = useMemo(() => {
    return (
      orderBookBuy.reduce((p, c) => p + Number(c.total), 0) +
      orderBookSell.reduce((p, c) => p + Number(c.total), 0)
    )
  }, [orderBookBuy, orderBookSell])

  const styleWidth = (v: number) => {
    const width = ((v / getSumAmountALlOrder) * 100)*30
    return width >= 100 ? 100 : width
  }

  useEffect(() => {
    loadFeeOrderBook(10)
  }, [ContractPairOrderAddress])

  return (
    <div className=" flex flex-col flex-1 h-full    ">
      <div className="flex flex-row gap-5 px-3 ">
        <button
          onClick={() => setShowOrderBookOrFee(ShowOrderBookOrFee.OrderBook)}
          className={` text-white hover:opacity-80 opacity-50  font-bold mt-3 mb-1 ${
            showOrderBookOrFee === ShowOrderBookOrFee.OrderBook &&
            '!opacity-100'
          }`}
        >
          Orderbook
        </button>
        <button
          onClick={async () => {
            setShowOrderBookOrFee(ShowOrderBookOrFee.Fee)
          }}
          className={` text-white  hover:opacity-80 opacity-50 font-bold mt-3 mb-1 ${
            showOrderBookOrFee === ShowOrderBookOrFee.Fee && '!opacity-100'
          }`}
        >
          Fee
        </button>
      </div>

      {showOrderBookOrFee === ShowOrderBookOrFee.OrderBook ? (
        <>
          <header className="flex justify-between py-3  items-center px-3 ">
            <div className="flex gap-3 ">
              <button
                onClick={() => setStatusShowOrderBook(ShowOrderBookStatus.BS)}
                className={`
              ${
                statusShowOrderBook === ShowOrderBookStatus.BS &&
                '!opacity-100 '
              }
              gap-[2px] flex flex-row opacity-60 hover:opacity-100 border-[1px] border-gray-700 p-1 bg-gray-900  rounded-sm`}
              >
                <div className="flex flex-col gap-[2px]">
                  <div className="w-[6px] h-[5px] bg-red-500" />
                  <div className="w-[6px] h-[5px] bg-green-500" />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="w-[6px] h-[3px] bg-gray-600" />
                  <div className="w-[6px] h-[3px] bg-gray-600" />
                  <div className="w-[6px] h-[3px] bg-gray-600" />
                  {/* <div className="w-[6px] h-[17px] bg-gray-600 " /> */}
                </div>
              </button>

              <button
                onClick={() => setStatusShowOrderBook(ShowOrderBookStatus.B)}
                className={`
              ${
                statusShowOrderBook === ShowOrderBookStatus.B && '!opacity-100 '
              }
              gap-[2px] flex flex-row opacity-60 hover:opacity-100 border-[1px] border-gray-700 p-1 bg-gray-900 rounded-sm`}
              >
                <div className="w-[6px] h-[12px] bg-green-500" />
                <div className="flex flex-col gap-[2px]">
                  <div className="w-[6px] h-[3px] bg-gray-600" />
                  <div className="w-[6px] h-[3px] bg-gray-600" />
                  <div className="w-[6px] h-[3px] bg-gray-600" />
                  {/* <div className="w-[6px] h-[17px] bg-gray-600 " /> */}
                </div>
              </button>

              <button
                onClick={() => setStatusShowOrderBook(ShowOrderBookStatus.S)}
                className={`
              ${
                statusShowOrderBook === ShowOrderBookStatus.S && '!opacity-100 '
              }
              gap-[2px] flex flex-row opacity-60 hover:opacity-100 border-[1px] border-gray-700 p-1 bg-gray-900  rounded-sm`}
              >
                <div className="w-[6px] h-[12px] bg-red-500" />
                <div className="flex flex-col gap-[2px]">
                  <div className="w-[6px] h-[3px] bg-gray-600" />
                  <div className="w-[6px] h-[3px] bg-gray-600" />
                  <div className="w-[6px] h-[3px] bg-gray-600" />
                  {/* <div className="w-[6px] h-[17px] bg-gray-600 " /> */}
                </div>
              </button>
            </div>

            {isLoadingRefresh ? (
              <span className="loader2"></span>
            ) : (
              <ArrowPathIcon
                onClick={async () => {
                  setIsLoadingRefresh(true)
                  await loadOrderBook()
                  setIsLoadingRefresh(false)
                }}
                className="IconHover h-5 w-5"
              />
            )}

            {/* <span className="text-2xl">100</span> */}
          </header>

          <div className="text-[11px] grid grid-cols-3  gap-x-3  pb-5 textGray px-3 ">
            <div className="text-left">Price({symbolToken1})</div>
            <div className="text-right">Amount({symbolToken0})</div>
            <div className="text-right">Total({symbolToken1})</div>
          </div>

          {statusShowOrderBook === ShowOrderBookStatus.B ? null : (
            <div
              className={` 
            ${
              statusShowOrderBook === ShowOrderBookStatus.S
                ? 'h-[84%]'
                : 'h-[44%]'
            } 
          ${isLoadingRefresh && 'opacity-30'}
            text-[11px] myYscroll  flex flex-col-reverse`}
            >
              {orderBookSell.map((x, y) => (
                <div
                  key={`sell_${x.BuyOrSell}_${y}_${x.amount}`}
                  className=" relative  grid grid-cols-3 items-center text-center hover:bg-slate-800 hover:brightness-125 cursor-pointer py-[2px] px-3 "
                >
                  <div className="  z-[1] text-left">{x.price}</div>
                  <div className="  z-[1] text-right">{x.amount}</div>
                  <div className="  z-[1] text-right">{x.total}</div>
                  <div
                    className=" absolute right-0 h-full  z-[0] bg-[#34181D]"
                    style={{
                      width: `${styleWidth(Number(x.total))}%`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          )}

          {statusShowOrderBook === ShowOrderBookStatus.BS && (
            <div className="w-full h-[4%]   px-3 my-2 ">
              <span className="text-green-600 text-base font-bold ">
                {priceToken ? priceToken : '0.00'}{' '}
                <span className="textGray text-xs">${priceToken}</span>
              </span>
            </div>
          )}

          {statusShowOrderBook === ShowOrderBookStatus.S ? null : (
            <div
              className={`
                ${
                  statusShowOrderBook === ShowOrderBookStatus.B
                    ? 'h-[84%]'
                    : 'h-[44%]'
                }  
              ${isLoadingRefresh && 'opacity-30'}
              text-[11px] myYscroll  `}
            >
              {orderBookBuy.map((x, y) => (
                <div
                  key={`buy_${x.BuyOrSell}_${y}_${x.amount}`}
                  className=" relative  grid grid-cols-3 items-center text-center hover:bg-slate-800 hover:brightness-125 cursor-pointer py-[2px] px-3 "
                >
                  <div className=" z-[1] text-left">{x.price}</div>
                  <div className=" z-[1] text-right">{x.amount}</div>
                  <div className=" z-[1] text-right">{x.total}</div>
                  <div
                    className=" absolute right-0 h-full  z-[0] bg-[#122A22]"
                    style={{
                      width: `${styleWidth(Number(x.total))}%`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          )}
          <br />
        </>
      ) : (
        <>
          <header className="py-3 justify-end flex px-3">
            {loadingOrderFee ? (
              <span className="loader2"></span>
            ) : (
              <ArrowPathIcon
                onClick={async () => {
                  await loadFeeOrderBook(10)
                }}
                className="IconHover h-5 w-5"
              />
            )}
          </header>
          <div className="text-[10px] grid grid-cols-4  gap-x-3  pb-5 textGray px-3">
            <div className="text-left col-span-2">Price range</div>
            <div className="text-right">
              APR <span className="text-green-500">BUY</span>
            </div>
            <div className="text-right">
              APR <span className="text-red-500">SELL</span>{' '}
            </div>
          </div>

          <div
            className={`
            ${loadingOrderFee && 'opacity-30'}
              text-[10px] myscroll h-[84%]`}
           >
            {loadingOrderFee ? (
              <div className="flex animate-pulse text-sm   justify-center items-center py-3 ">
                Loading...
              </div>
            ) : (
              <>
                {orderBookFee.map((item) => (
                  <div className="grid grid-cols-4 gap-3 hover:bg-gray-800 transition-all  mb-1 px-3">
                    <div className="text-left col-span-2 ">
                      {item.lowerPrice} - {item.upperPrice}
                    </div>
                    <div className="text-right ">{item.aprBuy} %</div>
                    <div className="text-right ">{item.aprSell} %</div>
                  </div>
                ))}
              </>
            )}
          </div>

          <br />
        </>
      )}
    </div>
  )
}

export default OrderBook
