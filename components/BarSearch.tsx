import React, { useContext, Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  InboxIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import { ContractContext } from '../context/ContratContext'
import { shortenAddress } from '../utils/shortenAddress'
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import copy from 'copy-to-clipboard'
import { simpleNotificationToast } from '../utils/notificationToastify'
import { Pagination } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { numberWithCommas } from '../utils/FormatNumberComma'
import router from 'next/router'
import { useStyles } from '../utils/muiStyled'
import { filterImgSrc } from '../utils/filterImg'

export default function Example() {
  const classes = useStyles()
  const [page, setPage] = React.useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const {
    priceToken,
    symbolToken0,
    symbolToken1,
    ContractPairOrderAddress,
    ContractToken0Address,
    ContractToken1Address,
    listPairOrder,
    setContractPairOrderAddress,
    setContractToken0Address,
    setContractToken1Address,
    triggerLoadPairTrade,
    setTriggerLoadPairTrade,
  } = useContext(ContractContext)

  const [tempListPairOrder, setTempListPairOrder] = useState(listPairOrder)

  useEffect(() => {
    setTempListPairOrder(listPairOrder)
  }, [listPairOrder])
  return (
    <div className="z-10 w-full">
      <Popover className="relative ">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                group bg flex items-center w-full justify-between rounded-md  px-2 xs:px-5 text-white outline-none transition-all`}
            >
              <div className="font-bold w-full gap-2 xs:gap-3 flex items-center pr-3">
                <Image
                  src={filterImgSrc(ContractToken0Address)}
                  alt="me"
                  width="80"
                  height="80"
                  className="xs:h-8 xs:w-8 h-0 w-0 rounded-full"
                />

                <div className="flex text-base sm:text-lg  ">
                  <h1>{symbolToken0}-</h1>
                  <h1>{symbolToken1}</h1>
                </div>
                <div className=" flex flex-col w-full ">
                  <span className="font-light text-[11px] sm:text-xs text-gray-500  flex items-center">
                    {symbolToken0}: {shortenAddress(ContractToken0Address)}
                    <ClipboardDocumentIcon
                      onClick={(e) => {
                        copy(ContractToken0Address)
                        simpleNotificationToast('Copied to clipboard!')
                        e.preventDefault()
                      }}
                      className=" IconHover h-2 w-2 xs:h-3 xs:w-3"
                    />
                  </span>
                  <span className="font-light text-[11px] sm:text-xs text-gray-500 flex items-center">
                    {symbolToken1}: {shortenAddress(ContractToken1Address)}
                    <ClipboardDocumentIcon
                      onClick={(e) => {
                        copy(ContractToken1Address)
                        simpleNotificationToast('Copied to clipboard!')
                        e.preventDefault()
                      }}
                      className=" IconHover h-2 w-2 xs:h-3 xs:w-3"
                    />
                  </span>
                </div>
              </div>
              <ChevronDownIcon
                className={`${open ? 'opacity-70' : ''}
                   h-5 w-5 `}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-[70%] xs:left-[60%] z-10 mt-4 w-[380px]  -translate-x-1/2 transform ">
                {({ close }) => (
                  <div className="bg-gray-800 border-[1px] border-gray-700 text-white overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-5 ">
                    <div
                      className="w-full py-2 px-2 flex flex-row items-center  bgblackbn border-[1px] border-gray-800
            hoverBar   text-white  rounded-lg mb-2"
                    >
                      <MagnifyingGlassIcon className=" h-4 w-4  " />
                      <input
                        type="text"
                        onChange={(e) => {
                          let temp: TypeListPairOrder[] = []
                          listPairOrder.map((item) => {
                            let namePair =
                              item.symbolToken0 + '-' + item.symbolToken1
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
                    <div className="text-white bg-black/80 rounded-t-lg font-semibold text-xs grid grid-cols-2 gap-3   border-b-[1px] border-gray-700 p-2">
                      <div className="text-left ">Pairs</div>
                      <div className="text-right">Last Price</div>
                    </div>
                    <>
                      {tempListPairOrder.length > 0 ? (
                        tempListPairOrder
                          .slice(6 * (page - 1), page * 6)
                          .map((item) => (
                            <div
                              className="bg-black/80 textGray items-center  text-xs grid grid-cols-2 gap-3   border-b-[1px] border-gray-700 p-2 
                          hover:bg-black/40 cursor-pointer"
                              onClick={async () => {
                                if (
                                  item.addressContractPair !=
                                  ContractPairOrderAddress
                                ) {
                                  await Promise.all([
                                    setContractPairOrderAddress(
                                      item.addressContractPair
                                    ),
                                    setContractToken0Address(
                                      item.addressToken0
                                    ),
                                    setContractToken1Address(
                                      item.addressToken1
                                    ),
                                    setTriggerLoadPairTrade(
                                      !triggerLoadPairTrade
                                    ),
                                  ])
                                }
                                close()
                              }}
                            >
                              <div className="font-bold  gap-3 flex items-center  ">
                                <div className=" flex flex-col ">
                                  <h1
                                    className={`text-xs font-semibold mb-1
                            ${
                              item.addressContractPair ==
                              ContractPairOrderAddress
                                ? 'textShadowWhite '
                                : ''
                            } `}
                                  >
                                    {item.symbolToken0}-{item.symbolToken1}
                                  </h1>
                                  <span className="font-light text-[10px] text-gray-500  flex  items-center ">
                                    {item.symbolToken0} :{' '}
                                    {shortenAddress(item.addressToken0)}
                                    <ClipboardDocumentIcon
                                      onClick={() => {
                                        copy(item.addressToken0)
                                        simpleNotificationToast(
                                          'Copied to clipboard!'
                                        )
                                      }}
                                      className=" IconHover h-3 w-3"
                                    />
                                  </span>
                                  <span className="font-light text-[10px] text-gray-500 flex items-center">
                                    {item.symbolToken1} :{' '}
                                    {shortenAddress(item.addressToken1)}
                                    <ClipboardDocumentIcon
                                      onClick={() => {
                                        copy(item.addressToken1)
                                        simpleNotificationToast(
                                          'Copied to clipboard!'
                                        )
                                      }}
                                      className=" IconHover h-3 w-3"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                {numberWithCommas(item.price)}{' '}
                                {item.symbolToken1}
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="flex flex-col bg-black/80  justify-center items-center py-3 ">
                          <div className="text-xs textGray font-semibold">
                            No Pairs Found
                          </div>
                        </div>
                      )}
                    </>

                    <div className="flex justify-end mt-2">
                      <Pagination
                        page={page}
                        onChange={handleChange}
                        count={Math.ceil(listPairOrder.length / 6)}
                        variant="outlined"
                        shape="rounded"
                        classes={{ ul: classes.newStyles }}
                      />
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
