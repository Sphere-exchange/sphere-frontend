import React, { useContext, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { ContractContext } from '../context/ContratContext'
import {
  notificationToast,
  simpleNotificationToast,
} from '../utils/notificationToastify'
import { useAccount } from 'wagmi'
import { shortenAddress } from '../utils/shortenAddress'
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import { InboxIcon } from '@heroicons/react/24/outline'
import copy from 'copy-to-clipboard'
import router from 'next/router'

import { Pagination } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { ConvertFullDateTime } from '../utils/DateTime'
import ModalWebSiteLoading from '../components/ModalWebSiteLoading'
import Loader from '../components/Loader'
import { useStyles } from '../utils/muiStyled'
import { filterImgSrc } from '../utils/filterImg'
type Props = {}

function wallethistory({}: Props) {
  const classes = useStyles()
  const [page, setPage] = React.useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const { address } = useAccount()

  const {
    isLoadingWalletHistory,
    walletHistory,
    loadWalletHistory,
    isLoadingFirstOpenWebsite,
  } = useContext(ContractContext)

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="p-4 sm:p-7 bg-black/80 w-full flex flex-col lg:flex-row justify-start lg:justify-between gap-2">
        <h1 className="text-2xl sm:text-3xl font-semibold flex gap-5">
          <span className="flex  textShadowWhite">Wallet History</span>
        </h1>
        <div className=" flex gap-5">
          <button
            className="Buttonpurple"
            onClick={() => {
              router.push(`/wallet`)
            }}
          >
            Wallet
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-7 flex flex-col w-full justify-start">
        <div className="mb-5 flex items-end justify-between ">
          <span className="text-xl sm:text-2xl font-semibold ">
            Transaction
          </span>
          {/* <button
            className="Buttonpurple"
            onClick={() => {
              loadWalletHistory()
            }}
          >
            Refresh
          </button> */}
        </div>
        <div className="myXscroll ">
          <div className="w-[720px] md:w-auto bg-black/80 textGray rounded-t-lg font-semibold text-[10px]  sm:text-sm grid grid-cols-7   border-b-[1px] border-gray-700 p-3 ">
            <div>Time</div>
            <div>Type</div>
            <div className="col-span-2">Asset</div>
            <div>Amount</div>
            <div className="">From</div>
            <div className="">To</div>
          </div>

          <div className="h-full w-[720px] md:w-auto">
            {isLoadingWalletHistory ? (
              <div className="flex bg-black/80  justify-center items-center py-3 ">
                <Loader />
              </div>
            ) : (
              <>
                {walletHistory.length > 0 ? (
                  walletHistory
                    .slice(7 * (page - 1), page * 7)
                    .map((item, index) => (
                      <div className="bg-black/80 text-[10px] sm:text-xs lg:text-sm xl:text-base items-center font-semibold grid grid-cols-7  p-3 border-b-[1px] border-gray-700 hover:hover:bg-black/10">
                        <div>{ConvertFullDateTime(item.Date)}</div>
                        <div>{item.Type}</div>
                        <div className="flex gap-2 items-center col-span-2">
                          <img
                            src={filterImgSrc(item.addressToken)}
                            alt="picture of token"
                            className="h-5 w-5 sm:h-10 sm:w-10 rounded-full"
                          />
                          <div className=" flex flex-col">
                            <span>{item.symbolToken}</span>
                            <div className="flex">
                              <span className="text-[10px] sm:text-sm textGray">
                                {shortenAddress(item.addressToken)}
                              </span>
                              <div className="flex">
                                <ClipboardDocumentIcon
                                  onClick={() => {
                                    copy(item.addressToken)
                                    simpleNotificationToast(
                                      'Copied to clipboard!'
                                    )
                                  }}
                                  className=" IconHover h-3 w-3 sm:h-4 sm:w-4 "
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>{item.amount}</div>
                        <div className="flex">
                          <span className="text-[10px] sm:text-xs textGray">
                            {shortenAddress(item.from)}
                          </span>
                          <div className="flex">
                            <ClipboardDocumentIcon
                              onClick={() => {
                                copy(item.from)
                                simpleNotificationToast('Copied to clipboard!')
                              }}
                              className=" IconHover h-3 w-3 sm:h-4 sm:w-4 "
                            />
                          </div>
                        </div>
                        <div className="">
                          {item.to == undefined ? (
                            '--'
                          ) : (
                            <div className="flex">
                              <span className="text-[10px] sm:text-xs textGray">
                                {shortenAddress(item.to)}
                              </span>
                              <div className="flex">
                                <ClipboardDocumentIcon
                                  onClick={() => {
                                    copy(item.to!)
                                    simpleNotificationToast(
                                      'Copied to clipboard!'
                                    )
                                  }}
                                  className=" IconHover h-3 w-3 sm:h-4 sm:w-4 "
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col bg-black/80  justify-center items-center py-3 ">
                    <InboxIcon className="text-gray-800 h-32 w-32" />
                    <div className="textGray font-semibold">
                      No Transactions Found
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {!isLoadingWalletHistory && (
          <div className=" flex justify-end mt-5">
            <Pagination
              page={page}
              onChange={handleChange}
              count={Math.ceil(walletHistory.length / 7)}
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

export default wallethistory
