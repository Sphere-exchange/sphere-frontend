import React, { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../context/ContratContext'
import {
  notificationToast,
  simpleNotificationToast,
} from '../utils/notificationToastify'
import { useAccount } from 'wagmi'
import { shortenAddress } from '../utils/shortenAddress'
import { HardCodeTokne0, SymbolToken } from '../utils/valueConst'
import {
  ClipboardDocumentIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import copy from 'copy-to-clipboard'
import { Switch } from '@headlessui/react'
import router from 'next/router'
import ModalShowDeposit from '../components/ModalShowDeposit'
import ModalShowWithdraw from '../components/ModalShowWithdraw'
import ModalShowTransfer from '../components/ModalShowTransfer'

import { Pagination } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import ModalWebSiteLoading from '../components/ModalWebSiteLoading'
import { InboxIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Loader from '../components/Loader'
import { useStyles } from '../utils/muiStyled'
import { filterImgSrc } from '../utils/filterImg'
import { findValueWalletBylistToken } from '../utils/find'
type Props = {}

function wallet({}: Props) {
  const classes = useStyles()
  const [page, setPage] = React.useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const { address } = useAccount()

  const {
    listPairOrder,
    listAddressToken,
    isLoadingListAddressToken,
    loadListAddressToken,
    isLoadingFirstOpenWebsite,
    loadBalanceOfToken,
    loadAllowanceToken,
    loadBalanceSpotToken,
  } = useContext(ContractContext)

  const [enabled, setEnabled] = useState(false)

  const [addressToken, setAddressToken] = useState('')
  const [nameToken, setNameToken] = useState('')
  const [pictureToken, setPictureToken] = useState('')
  const [symbolToken, setSymbolToken] = useState('')
  const [allowanceToken, setAllowanceToken] = useState(0)
  const [balanceOfToken, setBalanceOfToken] = useState(0)

  const [showModalDeposit, setShowModalDeposit] = useState(false)
  const [showModalWithdraw, setShowModalWithdraw] = useState(false)
  const [showModalTransfer, setShowModalTransfer] = useState(false)

  const [eyeHideBalance, setEyeHideBalance] = useState(false)

  const [tempListAddressToken, setTempListAddressToken] =
    useState(listAddressToken)

  useEffect(() => {
    setTempListAddressToken(listAddressToken)
  }, [isLoadingFirstOpenWebsite, listAddressToken])

  useEffect(() => {
    if (enabled) {
      let temp: TypeListAddressToken[] = []
      listAddressToken.map((item, index) => {
        if (Number(item.total) > 0) temp.push(item)
      })
      setTempListAddressToken(temp)
    } else {
      setTempListAddressToken(listAddressToken)
    }
  }, [enabled])

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-4 sm:p-7 bg-black/80 w-full flex flex-col lg:flex-row justify-start lg:justify-between gap-2">
        <h1 className="text-2xl sm:text-3xl font-semibold  flex gap-5">
          <span className="flex  items-end textShadowWhite">
            Wallet Overview
          </span>
        </h1>
        <div className=" flex gap-5">
          <button
            className="Buttonpurple"
            onClick={async () => {
              setAddressToken(HardCodeTokne0)
              // setPictureToken(item.addressToken)
              setSymbolToken(SymbolToken)
              setAllowanceToken(
                Number(await loadBalanceOfToken(HardCodeTokne0))
              )
              setBalanceOfToken(
                Number(await loadAllowanceToken(HardCodeTokne0))
              )
              setShowModalDeposit(true)
            }}
          >
            Deposit
          </button>
          <button
            className="Buttonblackbrown"
            onClick={async () => {
              setAddressToken(HardCodeTokne0)
              // setPictureToken(item.addressToken)
              setSymbolToken(SymbolToken)
              setBalanceOfToken(
                Number(await loadBalanceSpotToken(HardCodeTokne0))
              )
              setShowModalWithdraw(true)
            }}
          >
            Withdraw
          </button>
          <button
            className="Buttonblackbrown"
            onClick={async () => {
              setAddressToken(HardCodeTokne0)
              // setPictureToken(item.addressToken)
              setSymbolToken(SymbolToken)
              setBalanceOfToken(
                Number(await loadBalanceSpotToken(HardCodeTokne0))
              )
              setShowModalTransfer(true)
            }}
          >
            Transfer
          </button>
          <button
            className="Buttonblackbrown"
            onClick={() => {
              router.push(`/wallethistory`)
            }}
          >
            Wallet History
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-7 flex flex-col w-full justify-start">
        <span className="text-xl sm:text-2xl font-semibold flex gap-1">
          Assets Balance
          {eyeHideBalance ? (
            <EyeSlashIcon
              className=" IconHover h-8 w-8"
              onClick={() => setEyeHideBalance(false)}
            />
          ) : (
            <EyeIcon
              className=" IconHover h-8 w-8"
              onClick={() => setEyeHideBalance(true)}
            />
          )}
        </span>
        <div className="flex flex-col my-5">
          <span className="font-bold text-3xl">
            {eyeHideBalance ? '******' : <>
            {findValueWalletBylistToken(listPairOrder,listAddressToken).valueUSD}
            </>}{' '}
            <span className="text-lg font-normal">USD</span>
          </span>
          <span className="text-base textGray">
            {/* {eyeHideBalance ? '***' : '≈ 0.000000'} <span>BTC</span> */}
            {eyeHideBalance ? '***' : <>
            ≈ {findValueWalletBylistToken(listPairOrder,listAddressToken).valueBTC}
            </>} <span>BTC</span>
          </span>
        </div>

        <div className="mb-5 flex gap-10 items-end justify-between">
          <div className=" flex items-center gap-2">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${enabled ? 'bg-gray-700' : 'bg-white '}
            border-2  border-transparent relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full  transition-colors duration-200 ease-in-out focus:outline-none`}
            >
              <span className="sr-only">setting</span>
              <span
                aria-hidden="true"
                className={`${
                  enabled ? 'translate-x-5 bg-white ' : 'translate-x-0 bg-black'
                }
              pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full  shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <span className="font-semibold  text-xs ">Hodl only</span>
          </div>

          <div
            className="w-2/5 xl:w-1/5 xl:p-3 p-2 flex flex-row items-center  bgblackbn border-[1px] border-gray-800
             hoverBar   text-white  rounded-lg"
          >
            <MagnifyingGlassIcon className=" h-6 w-6  " />
            <input
              type="text"
              onChange={(e) => {
                let temp: TypeListAddressToken[] = []
                listAddressToken.map((item) => {
                  if (
                    item.symbolToken
                      .toLocaleLowerCase()
                      .includes(e.target.value.toLocaleLowerCase()) ||
                    item.addressToken.toLocaleLowerCase() ==
                      e.target.value.toLocaleLowerCase()
                  ) {
                    temp.push(item)
                  }
                })
                setTempListAddressToken(temp)
              }}
              className=" text-xs outline-none pl-2  font-semibold bg-transparent  w-full"
              placeholder="Search"
              required
            />
          </div>
          {/* <button
            className="Buttonpurple"
            onClick={() => {
              loadListAddressToken(true)
            }}
          >
            Refresh
          </button> */}
        </div>

        <div className="myXscroll ">
          <div className="w-[720px] md:w-auto bg-black/80 textGray rounded-t-lg font-semibold  text-[10px]  sm:text-sm grid grid-cols-6   border-b-[1px] border-gray-700 p-3 ">
            <div className="col-span-2">Asset</div>
            <div className="">Total</div>
            <div>Available</div>
            <div>In Order</div>
            <div>Action</div>
          </div>

          <div className="h-full w-[720px]  md:w-auto">
            {isLoadingListAddressToken ? (
              <div className="flex bg-black/80  justify-center items-center py-3 ">
                <Loader />
              </div>
            ) : (
              <>
                {tempListAddressToken.length > 0 ? (
                  tempListAddressToken
                    .slice(6 * (page - 1), page * 6)
                    .map((item, index) => (
                      <div className="bg-black/80 text-[10px] sm:text-xs lg:text-sm xl:text-base items-center font-semibold grid grid-cols-6 p-3 border-b-[1px] border-gray-700 hover:hover:bg-black/10">
                        <div className="flex gap-2 items-center col-span-2">
                          <img
                            src={filterImgSrc(item.addressToken)}
                            alt="picture of token"
                            className="h-5 w-5 sm:h-10 sm:w-10 rounded-full"
                          />
                          <div className="flex ">
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
                        </div>
                        <div className="">
                          {eyeHideBalance ? '******' : item.total}
                        </div>
                        <div>
                          {eyeHideBalance ? '******' : item.balanceSpot}
                        </div>
                        <div>
                          {eyeHideBalance ? '******' : item.balanceTrade}
                        </div>
                        <div className="flex gap-2 text-white text-xs xl:text-sm flex-col xl:flex-row">
                          <span
                            className="cursor-pointer hover:textGray transition-all  underline"
                            onClick={() => {
                              setAddressToken(item.addressToken)
                              setNameToken(item.nameToken)
                              // setPictureToken(item.addressToken)
                              setSymbolToken(item.symbolToken)
                              setAllowanceToken(Number(item.allowanceToken))
                              setBalanceOfToken(Number(item.balanceOfToken))
                              setShowModalDeposit(true)
                            }}
                          >
                            Deposit
                          </span>
                          <span
                            className="cursor-pointer hover:textGray transition-all  underline"
                            onClick={() => {
                              setAddressToken(item.addressToken)
                              setNameToken(item.nameToken)
                              // setPictureToken(item.addressToken)
                              setSymbolToken(item.symbolToken)
                              setBalanceOfToken(Number(item.balanceSpot))
                              setShowModalWithdraw(true)
                            }}
                          >
                            Withdraw
                          </span>
                          <span
                            className="cursor-pointer hover:textGray transition-all  underline"
                            onClick={() => {
                              setAddressToken(item.addressToken)
                              setNameToken(item.nameToken)
                              // setPictureToken(item.addressToken)
                              setSymbolToken(item.symbolToken)
                              setBalanceOfToken(Number(item.balanceSpot))
                              setShowModalTransfer(true)
                            }}
                          >
                            Transfer
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col bg-black/80  justify-center items-center py-3 ">
                    <InboxIcon className="text-gray-800 h-20 w-20" />
                    <div className="textGray font-semibold">
                      No Tokens Found
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {!isLoadingListAddressToken && (
          <div className=" flex justify-end mt-5">
            {/* <div>page : {page}</div> */}
            <Pagination
              page={page}
              onChange={handleChange}
              count={Math.ceil(listAddressToken.length / 6)}
              variant="outlined"
              shape="rounded"
              classes={{ ul: classes.newStyles }}
            />
          </div>
        )}
      </div>

      {showModalDeposit && (
        <ModalShowDeposit
          addressToken={addressToken}
          symbolToken={symbolToken}
          allowanceToken={allowanceToken}
          balanceOfToken={balanceOfToken}
          onClose={() => setShowModalDeposit(false)}
        />
      )}
      {showModalWithdraw && (
        <ModalShowWithdraw
          addressToken={addressToken}
          nameToken={nameToken}
          symbolToken={symbolToken}
          balanceSpot={balanceOfToken}
          onClose={() => setShowModalWithdraw(false)}
        />
      )}
      {showModalTransfer && (
        <ModalShowTransfer
          addressToken={addressToken}
          nameToken={nameToken}
          symbolToken={symbolToken}
          balanceSpot={balanceOfToken}
          onClose={() => setShowModalTransfer(false)}
        />
      )}
    </div>
  )
}

export default wallet
