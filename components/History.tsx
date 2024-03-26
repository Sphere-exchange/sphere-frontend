import React, { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../context/ContratContext'
import ModalDelOrder from '../components/ModalDelOrder'
import { useAccount } from 'wagmi'
import {
  PencilSquareIcon,
  ArrowPathIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import {
  CheckCircleIcon,
  InboxIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline'
import { ethers } from 'ethers'
import { ConvertFullDateTime } from '../utils/DateTime'
import { toEtherandFixFloatingPoint } from '../utils/UnitInEther'
import { notificationToast } from '../utils/notificationToastify'
import { delay } from '../utils/Delay'
import { Fee } from '../utils/valueConst'
import { Pagination } from '@mui/material'
import { useStyles, LightTooltip } from '../utils/muiStyled'
type Props = {}

enum ShowOrderStatus {
  OpenOrder,
  OrderHistory,
}

const History = (props: Props) => {
  const classes = useStyles()
  const [page, setPage] = React.useState(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const { address, isConnected } = useAccount()

  const {
    isLoadingOrderBookByAddress,
    orderBookByAddress,
    sendTxCancelOrder,
    loadOrderBook,
    loadHistoryByAddress,
    historyOrderEvent,
    symbolToken0,
    symbolToken1,
  } = useContext(ContractContext)

  // for update modal
  const [sideBuyOrSell, setSideBuyOrSell] = useState<number>(-1)
  const [idUpdate, setIdUpdate] = useState<number>(-1)
  const [showDelModal, setShowDelModal] = useState(false)
  const [isLoadingRefreshOpenOrders, setIsLoadingRefreshOpenOrders] =
    useState(false)
  const [isLoadingRefreshOrderHistory, setIsLoadingRefreshOrderHistory] =
    useState(false)

  const [selectShowOrder, setSelectShowOrder] = useState<ShowOrderStatus>(
    ShowOrderStatus.OpenOrder
  )
  return (
    <div className="px-1 py-2 lg:p-5  h-full ">
      <div className="flex flex-row items-center gap-5 mb-2">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setPage(1)
              setSelectShowOrder(ShowOrderStatus.OpenOrder)
            }}
            className={`
            ${
              selectShowOrder === ShowOrderStatus.OrderHistory
                ? 'ButtonHover !py-2'
                : 'Buttonselect  !py-2'
            } `}
          >
            Open Orders({orderBookByAddress.length})
          </button>
          <button
            onClick={() => {
              setPage(1)
              setSelectShowOrder(ShowOrderStatus.OrderHistory)
            }}
            className={`
            ${
              selectShowOrder === ShowOrderStatus.OrderHistory
                ? 'Buttonselect !py-2'
                : 'ButtonHover !py-2'
            } `}
          >
            Order History
          </button>
        </div>

        {isLoadingRefreshOpenOrders || isLoadingRefreshOrderHistory ? (
          <span className="loader2"></span>
        ) : (
          <ArrowPathIcon
            onClick={async () => {
              if (selectShowOrder === ShowOrderStatus.OpenOrder) {
                setIsLoadingRefreshOpenOrders(true)
                await loadOrderBook()
              } else {
                setIsLoadingRefreshOrderHistory(true)
                await loadHistoryByAddress()
              }
              await delay(1000)
              setIsLoadingRefreshOpenOrders(false)
              setIsLoadingRefreshOrderHistory(false)
            }}
            className="IconHover h-5 w-5"
          />
        )}
      </div>

      <div className="h-full flex flex-col justify-between myXscroll text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm">
        {selectShowOrder === ShowOrderStatus.OpenOrder ? (
          <>
            <div className="w-[750px] md:w-auto  text-[10px] xs:text-xs md:text-sm grid grid-cols-12 border-b-[1px] border-gray-700 px-0 py-1 xs:p-3">
              <div className="col-span-2">Date</div>
              <div>Pair</div>
              <div>Type</div>
              <div>Side</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Filled/Order</div>
              <div className="col-span-2">Total</div>
              <div>Action</div>
            </div>

            <div
              className={`w-[750px] md:w-auto  h-full
            ${isLoadingRefreshOpenOrders && 'opacity-30'}
            `}
            >
              {orderBookByAddress.length > 0 ? (
                orderBookByAddress
                  .slice(6 * (page - 1), page * 6)
                  .map((item) => (
                    <div
                      className={` grid  grid-cols-12  border-b-[1px] border-gray-700 px-0 py-1 xs:p-3 hover:bg-gray-800 transition-all 
                     ${
                       item.BuyOrSell === 0
                         ? 'border-l-2 border-l-green-600'
                         : 'border-l-2 border-l-red-600'
                     }
                            `}
                    >
                      <div className="col-span-2 ml-1 xs:ml-0">
                        {ConvertFullDateTime(Number(item.createdDate))}
                      </div>
                      <div>
                        {' '}
                        {symbolToken0}-{symbolToken1}
                      </div>
                      <div className="pl-1">Limit</div>
                      <div
                        className={`${
                          item.BuyOrSell === 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }  `}
                      >
                        {item.BuyOrSell === 0 ? 'Buy' : 'Sell'}
                      </div>
                      <div className="flex flex-row gap-1 col-span-2">
                        {item.price} {symbolToken1}
                      </div>
                      <div className="flex flex-row  gap-1 col-span-2">
                        {item.filled}/{(Number(item.amount)+Number(item.filled)).toFixed(4)} {symbolToken0}
                      </div>
                      <div className="flex flex-row  gap-1 col-span-2">
                        {item.total}{' '}
                        {symbolToken1}
                      </div>
                      <div className="pl-2 flex">
                        {/* <LightTooltip title="Update" arrow placement="bottom">
                          <PencilSquareIcon
                            onClick={() => {
                              setIdUpdate(item.id)
                              setSideBuyOrSell(item.BuyOrSell)
                              setShowUpdateModal(true)
                            }}
                            className="IconHover h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 "
                          />
                        </LightTooltip> */}
                        <LightTooltip title="Delete" arrow placement="bottom">
                          <TrashIcon
                            onClick={() => {
                              setIdUpdate(item.id)
                              setSideBuyOrSell(item.BuyOrSell)
                              setShowDelModal(true)
                            }}
                            className="IconHover  h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 "
                          />
                        </LightTooltip>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col   justify-center items-center py-5 ">
                  <div className="textGray font-semibold">No Orders Found</div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-[1700px] 3xl:w-auto text-[10px] xs:text-xs md:text-sm grid grid-cols-12 border-b-[1px] border-gray-700 px-0 py-1 xs:p-3 ">
              <div className="col-span-2">Date</div>
              <div>Pair</div>
              <div>Type</div>
              <div>Side</div>
              <div className="col-span-1">Price</div>
              <div className="col-span-1">Avg. Price</div>
              <div className="col-span-1">Executed</div>
              <div className="col-span-1">Amount</div>
              <div className="col-span-1">Total</div>
              <div className="col-span-1">Fee</div>
              <div className="">Action</div>
            </div>
            <div
              className={`w-[1700px] 3xl:w-auto  max-h-full 
            ${isLoadingRefreshOrderHistory && 'opacity-30'}
            `}
            >
              {historyOrderEvent.length > 0 ? (
                historyOrderEvent
                  .slice(6 * (page - 1), page * 6)
                  .map((item) => (
                    <div
                      className={` grid grid-cols-12 border-b-[1px] border-gray-700  px-0 py-1 xs:p-3 hover:bg-gray-800 transition-all 
                ${
                  item.isBuy === 0
                    ? ' border-l-2 border-l-green-600'
                    : ' border-l-2 border-l-red-600'
                } 
                `}
                    >
                      <div className="col-span-2 ml-1 xs:ml-0">
                        {ConvertFullDateTime(item.date)}
                      </div>
                      <div>
                        {' '}
                        {symbolToken0}-{symbolToken1}
                      </div>
                      <div>{item.Type}</div>
                      <div
                        className={`${
                          item.isBuy === 0 ? 'text-green-500' : 'text-red-500'
                        } `}
                      >
                        {item.isBuy === 0 ? 'Buy' : 'Sell'}
                      </div>
                      <div className="col-span-1">
                        {item.Type === 'Market' ? (
                          `Market`
                        ) : (
                          <>
                            <span>
                              {item.price}{' '}
                              <span className="textGray">{symbolToken1}</span>
                            </span>
                          </>
                        )}
                      </div>
                      <div className="col-span-1">
                        <span>
                          {item.Action === 'Canceled' ? (
                            '-'
                          ) : (
                            <>
                              {item.price}{' '}
                              <span className="textGray">{symbolToken1}</span>
                            </>
                          )}
                        </span>
                      </div>
                      <div className="col-span-1">
                        {item.Action === 'Canceled' ? (
                          '-'
                        ) : (
                          <>
                            {item.Type === 'Market' ? (
                              item.isBuy === 1 ? (
                                <>
                                  {item.executed}{' '}
                                  <span className="textGray">
                                    {symbolToken0}
                                  </span>
                                </>
                              ) : (
                                <span>
                                  {(
                                    Number(item.executed) / Number(item.price)
                                  ).toFixed(6)}{' '}
                                  <span className="textGray">
                                    {symbolToken0}
                                  </span>
                                </span>
                              )
                            ) : (
                              <>
                                {item.executed}{' '}
                                <span className="textGray">{symbolToken0}</span>
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <div className="col-span-1">
                        {item.Type === 'Market' ? (
                          item.isBuy === 1 ? (
                            <>
                              <span>
                                {item.executed}{' '}
                                <span className="textGray">{symbolToken0}</span>
                              </span>
                            </>
                          ) : (
                            <>
                              <span>
                                {(
                                  Number(item.executed) / Number(item.price)
                                ).toFixed(6)}{' '}
                                <span className="textGray">{symbolToken0}</span>
                              </span>
                            </>
                          )
                        ) : (
                          <>
                            <span>
                              {item.amount}{' '}
                              <span className="textGray">{symbolToken0}</span>
                            </span>
                          </>
                        )}
                      </div>
                      <div className="col-span-1">
                        {item.Action === 'Canceled' ? (
                          '-'
                        ) : (
                          <>
                            {item.Type === 'Market' ? (
                              item.isBuy === 1 ? (
                                <span>
                                  {(
                                    Number(item.price) * Number(item.executed)
                                  ).toFixed(6)}{' '}
                                  <span className="textGray">
                                    {symbolToken1}
                                  </span>
                                </span>
                              ) : (
                                <span>
                                  {(
                                    Number(item.price) *
                                    (Number(item.executed) / Number(item.price))
                                  ).toFixed(6)}{' '}
                                  <span className="textGray">
                                    {symbolToken1}
                                  </span>
                                </span>
                              )
                            ) : (
                              <span>
                                {(
                                  Number(item.price) * Number(item.amount)
                                ).toFixed(6)}{' '}
                                <span className="textGray">{symbolToken1}</span>
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      <div className="col-span-1">
                        {item.Action === 'Canceled' ? (
                          '-'
                        ) : (
                          <>
                            {item.Type === 'Market' ? (
                              item.isBuy === 1 ? (
                                <span>
                                  {(
                                    Number(item.price) *
                                    Number(item.executed) *
                                    (Fee / 100)
                                  ).toFixed(6)}{' '}
                                  <span className="textGray">
                                    {symbolToken1}
                                  </span>
                                </span>
                              ) : (
                                <span>
                                  {(
                                    (Number(item.executed) /
                                      Number(item.price)) *
                                    (Fee / 100)
                                  ).toFixed(6)}{' '}
                                  <span className="textGray">
                                    {symbolToken0}
                                  </span>
                                </span>
                              )
                            ) : (
                              <>
                                {item.isBuy === 0 ? (
                                  <span>
                                    {(
                                      Number(item.executed) *
                                      (Fee / 100)
                                    ).toFixed(6)}{' '}
                                    <span className="textGray">
                                      {symbolToken0}
                                    </span>
                                  </span>
                                ) : (
                                  <span>
                                    {(
                                      Number(item.price) *
                                      Number(item.executed) *
                                      (Fee / 100)
                                    ).toFixed(6)}{' '}
                                    <span className="textGray">
                                      {symbolToken1}
                                    </span>
                                  </span>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <div className="">
                        {item.Action === 'Filled' && (
                          <div className="flex gap-1">
                            <CheckCircleIcon className="text-green-600  h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 " />
                            <span>{item.Action}</span>
                          </div>
                        )}
                        {item.Action === 'Canceled' && (
                          <div className="flex gap-1">
                            <MinusCircleIcon className="textGray  h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 " />
                            <span>{item.Action}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col   justify-center items-center py-5 ">
                  <div className="textGray font-semibold">
                    No Orders History Found
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className=" flex justify-end mt-3">
        {/* <div>page : {page}</div> */}
        <Pagination
          page={page}
          onChange={handleChange}
          count={
            selectShowOrder == ShowOrderStatus.OpenOrder
              ? Math.ceil(orderBookByAddress.length / 6)
              : Math.ceil(historyOrderEvent.length / 6)
          }
          variant="outlined"
          shape="rounded"
          classes={{ ul: classes.newStyles }}
        />
      </div>
      {showDelModal && (
        <ModalDelOrder
          id={idUpdate}
          side={sideBuyOrSell}
          onClose={() => setShowDelModal(false)}
        />
      )}
    </div>
  )
}

export default History
