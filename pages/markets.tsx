import React, { useContext, useEffect, useState } from 'react'
import router from 'next/router'
import { ContractContext } from '../context/ContratContext'
import { numberWithCommas } from '../utils/FormatNumberComma'
import { shortenAddress } from '../utils/shortenAddress'
import { simpleNotificationToast } from '../utils/notificationToastify'
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import copy from 'copy-to-clipboard'
import Image from 'next/image'

import { Pagination } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { useStyles } from '../utils/muiStyled'
import {
  InboxIcon,
  QuestionMarkCircleIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline'
import Loader from '../components/Loader'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { findCHGByPair, findPriceByPair, findVOLByPair } from '../utils/find'
import { filterImgSrc } from '../utils/filterImg'
type Props = {}

const markets = (props: Props) => {
  const classes = useStyles()
  const [page, setPage] = React.useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const {
    listPairOrder,
    isLoadingListFactoryPairAddress,
    loadListFactoryPairAddress,
    isLoadingFirstOpenWebsite,
  } = useContext(ContractContext)

  const [tempListPairOrder, setTempListPairOrder] = useState(listPairOrder)

  useEffect(() => {
    setTempListPairOrder(listPairOrder)
  }, [isLoadingFirstOpenWebsite, listPairOrder])

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full justify-center items-center py-1 px-2 sm:px-4 sm:py-2  bg-[#8845FC]">
        <div className="text-white flex text-xs lg:text-sm justify-center items-center gap-3">
          <MegaphoneIcon className=" h-12 w-12 sm:h-8 sm:w-8" />
          <p className="truncate font-bold">
            This project is currently under development phase. Use at your own
            risk.
          </p>
        </div>
      </div>
      <div className="p-4 sm:p-7 bgblackbn w-full flex flex-col ">
        <h1 className="text-2xl sm:text-3xl font-semibold  flex gap-5">
          <div className="flex items-center justify-center gap-2">
            <span className="flex textShadowWhite">Markets Overview</span>
          </div>
        </h1>

        <div className="myXscroll ">
          <div className="flex  flex-col lg:flex-row gap-3 mt-5 justify-center items-center  ">
            <div className="flex flex-col p-5 bg-[#1F2937] text-white rounded-xl gap-5   lg:w-auto md:w-2/5 w-3/5 ">
              <div className="flex flex-row gap-14 items-center justify-center ">
                <div className="flex felx-row items-center justify-center gap-2">
                  <Image
                    src="/token/btc.png"
                    alt="token"
                    width="60"
                    height="60"
                    className="h-10 w-10 "
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold ">Bitcoin</h1>
                    <h1 className="text-sm textGray">BTC-USDT</h1>
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold text-xl ">
                    ${findPriceByPair(listPairOrder, 'BTC-USDT')}
                  </h1>
                </div>
              </div>
              <div className="flex flex-row gap-3  items-center ">
                <div className="text-xs bg-gray-700 rounded-md p-[2px]">
                  CHG
                </div>
                <div className="">{findCHGByPair(listPairOrder, 'BTC-USDT')}</div>
                <div className="text-xs bg-gray-700 rounded-md p-[2px]">
                  VOL
                </div>
                <div className="">${findVOLByPair(listPairOrder, 'BTC-USDT')}</div>
              </div>
            </div>
            <div className="flex flex-col p-5 bg-[#1F2937] text-white rounded-xl gap-5     lg:w-auto md:w-2/5 w-3/5 ">
              <div className="flex flex-row gap-14 items-center justify-center ">
                <div className="flex felx-row items-center justify-center gap-2">
                  <Image
                    src="/token/eth.png"
                    alt="token"
                    width="60"
                    height="60"
                    className="h-10 w-10 "
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold ">Ethereum</h1>
                    <h1 className="text-sm textGray">ETH-USDT</h1>
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold text-xl ">
                    ${findPriceByPair(listPairOrder, 'ETH-USDT')}
                  </h1>
                </div>
              </div>
              <div className="flex flex-row gap-3  items-center ">
                <div className="text-xs bg-gray-700 rounded-md p-[2px]">
                  CHG
                </div>
                <div className="">{findCHGByPair(listPairOrder, 'ETH-USDT')}</div>
                <div className="text-xs bg-gray-700 rounded-md p-[2px]">
                  VOL
                </div>
                <div className="">${findVOLByPair(listPairOrder, 'ETH-USDT')}</div>
              </div>
            </div>
            <div className="flex flex-col p-5 bg-[#1F2937] text-white rounded-xl gap-5    lg:w-auto md:w-2/5 w-3/5 ">
              <div className="flex flex-row gap-14 items-center justify-center ">
                <div className="flex felx-row items-center justify-center gap-2">
                  <Image
                    src="/icon.jpg"
                    alt="token"
                    width="60"
                    height="60"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold ">Sphere</h1>
                    <h1 className="text-sm textGray">SPHERE-USDT</h1>
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold text-xl ">
                    ${findPriceByPair(listPairOrder, 'SPHERE-USDT')}
                  </h1>
                </div>
              </div>
              <div className="flex flex-row gap-3  items-center ">
                <div className="text-xs bg-gray-700 rounded-md p-[2px]">
                  CHG
                </div>
                <div className="">{findCHGByPair(listPairOrder, 'SPHERE-USDT')}</div>
                <div className="text-xs bg-gray-700 rounded-md p-[2px]">
                  VOL
                </div>
                <div className="">${findVOLByPair(listPairOrder, 'SPHERE-USDT')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  h-[30px] bgblackbn">
        <div className=" bgmainbn rounded-t-[60px]  w-full h-[30px]" />
      </div>

      <div className="p-4 sm:p-7 flex flex-col w-full justify-start">
        <div className="flex flex-row items-center justify-between mb-5">
          <div className="flex gap-5  items-center">
            <span className="flex gap-1 Buttonselect  cursor-default py-2 max-w-fit items-center">
               BNB Testnet
              <img src="/bnb.png" alt="" className="lg:w-6 lg:h-6 w-4 h-4" />
            </span>
            <span className="flex Buttonselect  cursor-default py-2 max-w-fit   items-center">
              ALL Pairs({tempListPairOrder.length})
            </span>
          </div>
          <div
            className="w-2/5 xl:w-1/5 xl:p-3 p-2 flex flex-row items-center  bgblackbn border-[1px] border-gray-800
            hoverBar   text-white  rounded-lg"
          >
            <MagnifyingGlassIcon className=" h-6 w-6  " />
            <input
              type="text"
              onChange={(e) => {
                let temp: TypeListPairOrder[] = []
                listPairOrder.map((item) => {
                  let namePair = item.symbolToken0 + '-' + item.symbolToken1
                  if (
                    namePair
                      .toLocaleLowerCase()
                      .includes(e.target.value.toLocaleLowerCase()) ||
                    item.addressContractPair.toLocaleLowerCase() ==
                      e.target.value.toLocaleLowerCase() ||
                    item.addressToken0.toLocaleLowerCase() ==
                      e.target.value.toLocaleLowerCase() ||
                    item.addressToken1.toLocaleLowerCase() ==
                      e.target.value.toLocaleLowerCase()
                  ) {
                    temp.push(item)
                  }
                })
                setTempListPairOrder(temp)
              }}
              className=" text-xs outline-none pl-2  font-semibold bg-transparent w-full"
              placeholder="Search"
              required
            />
          </div>
        </div>

        <div className="myXscroll ">
          <div className="w-[720px] md:w-auto bgblackbn rounded-t-lg font-semibold text-sm grid grid-cols-12  border-b-[1px] border-gray-700 p-3 ">
            <div className="col-span-4">Trading Pairs</div>
            <div className="text-left  col-span-2 lg:col-span-3 ">Price</div>
            <div className="text-right col-span-2 ">24h Change</div>
            <div className="text-right col-span-2">24h Volume</div>
            <div className="text-right col-span-2 lg:col-span-1"></div>
          </div>

          <div className="h-full w-[720px] md:w-auto">
            {isLoadingListFactoryPairAddress ? (
              <div className="bg-black/80  p-3  overflow-hidden">
                <Loader />
              </div>
            ) : (
              <>
                {tempListPairOrder.length > 0 ? (
                  tempListPairOrder
                    .slice(6 * (page - 1), page * 6)
                    .map((item, index) => (
                      <div className="text-xs md:text-sm lg:text-base bgblackbn items-center font-semibold grid grid-cols-12 p-3 border-b-[1px]   border-gray-700 hover:bg-gray-800">
                        <div className=" flex flex-row gap-5 items-center col-span-4">
                          <Image
                            src={filterImgSrc(item.addressToken0)}
                            alt="me"
                            width="60"
                            height="20"
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                          />
                          <div className="flex flex-col">
                            <h1>
                              {item.symbolToken0}-{item.symbolToken1}
                            </h1>

                            <span className="font-light  text-[11px] sm:text-xs text-gray-500 flex ">
                              {item.symbolToken0}:{' '}
                              {shortenAddress(item.addressToken0)}
                              <ClipboardDocumentIcon
                                onClick={() => {
                                  copy(item.addressToken0)
                                  simpleNotificationToast(
                                    'Copied to clipboard!'
                                  )
                                }}
                                className=" IconHover h-4 sm:w-4 "
                              />
                            </span>
                            <span className="font-light  text-[11px] sm:text-xs text-gray-500 flex">
                              {item.symbolToken1}:{' '}
                              {shortenAddress(item.addressToken1)}
                              <ClipboardDocumentIcon
                                onClick={() => {
                                  copy(item.addressToken1)
                                  simpleNotificationToast(
                                    'Copied to clipboard!'
                                  )
                                }}
                                className=" IconHover h-4 sm:w-4 "
                              />
                            </span>
                            <span className="font-light  text-[11px] sm:text-xs text-gray-500 flex">
                              Pair: {shortenAddress(item.addressContractPair)}
                              <ClipboardDocumentIcon
                                onClick={() => {
                                  copy(item.addressContractPair)
                                  simpleNotificationToast(
                                    'Copied to clipboard!'
                                  )
                                }}
                                className=" IconHover h-4 sm:w-4 "
                              />
                            </span>
                          </div>
                        </div>
                        <div className="text-left col-span-2 lg:col-span-3">
                          {numberWithCommas(item.price)} {item.symbolToken1}
                        </div>
                        <div className="text-right    col-span-2">{item.change24H} %</div>
                        <div className="text-right  col-span-2">{item.volumeToken124H} USD</div>
                        <div className="justify-center flex col-span-2 lg:col-span-1">
                          <button
                            className="Buttonpurple w-fit"
                            onClick={() => {
                              router.push(
                                `/trade/tradepair?contractaddress=${item.addressContractPair}&addresstoken0=${item.addressToken0}&addresstoken1=${item.addressToken1}`
                              )
                            }}
                          >
                            Trade
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col bg-black/80  justify-center items-center py-3 ">
                    <InboxIcon className="text-gray-800 h-20 w-20" />
                    <div className="textGray font-semibold">No Pairs Found</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {!isLoadingListFactoryPairAddress && (
          <div className=" flex mt-5 justify-end ">
            {/* <div>page : {page}</div> */}
            <Pagination
              page={page}
              onChange={handleChange}
              count={Math.ceil(tempListPairOrder.length / 6)}
              variant="outlined"
              shape="rounded"
              classes={{ ul: classes.newStyles }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default markets
