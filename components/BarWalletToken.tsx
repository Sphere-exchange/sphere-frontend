import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useContext } from 'react'
import { ContractContext } from '../context/ContratContext'
import copy from 'copy-to-clipboard'  
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import { shortenAddress } from '../utils/shortenAddress'
import { simpleNotificationToast } from '../utils/notificationToastify'
 

interface Props {
  addressToken: string
  symbolToken: string
  pictureToken: string
  setDataAddressToken: (address: string) => void
  setDataSymbolToken: (symbol: string) => void
  setReqBalanceOfToken: (balance: number) => void
  setIsLoading:(isLoading: boolean) => void
  setReqAllowanceToken?: (allownace: number) => void
  IsDeposit?:boolean
  IsTransfer?:boolean
  IsWithdraw?:boolean
}

export default function Example({
  addressToken,
  symbolToken,
  pictureToken,
  setDataAddressToken,
  setDataSymbolToken,
  setReqBalanceOfToken,
  setReqAllowanceToken,
  setIsLoading,
  IsDeposit,
  IsTransfer,
  IsWithdraw,
}: Props) {
  const {
    listAddressToken,
    loadBalanceOfToken,
    loadAllowanceToken,
    loadBalanceSpotToken,
  } = useContext(ContractContext)
  return (
    <div className="z-10 font-semibold">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '!bg-gray-800' : ''}
                group flex items-center rounded-md gap-3  px-3 py-2 text-base bg-gray-900 hover:bg-gray-800 text-white  outline-none`}
            >
              <img
                src={pictureToken}
                alt="picture of token"
                className="h-10 w-10"
              />
              <div className=" flex flex-col text-left">
                <span className="textShadowWhite">{symbolToken}</span>
                <div className="flex gap-1">
                  <span className="text-xs textGray">
                    {shortenAddress(addressToken)}
                  </span>
                  <div className="flex">
                    <ClipboardDocumentIcon
                      onClick={(e) => {
                        copy(addressToken)
                        simpleNotificationToast('Copied to clipboard!')
                        e.preventDefault()
                      }}
                      className=" IconHover h-4 w-4 "
                    />
                  </div>
                </div>
              </div>
              <ChevronDownIcon
                className={`${open ? '' : ''}
                  h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80`}
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
              <Popover.Panel className="absolute left-[34%] z-10 mt-1 max-h-[260px]  w-8/12 -translate-x-1/2 transform   myXscroll bg-gray-900 rounded-xl">
                {({ close }) => (
                  <div>
                    {listAddressToken.map((item) => (
                      <div
                        className="textGray flex items-center gap-2 p-2  border-[1px] border-gray-800 hover:bg-gray-800 cursor-pointer"
                        onClick={async (e) => {
                          close()
                          setIsLoading(true)
                          if (IsDeposit != undefined && IsDeposit) {
                            await Promise.all([
                              setDataAddressToken(item.addressToken),
                              setDataSymbolToken(item.symbolToken),
                              setReqBalanceOfToken(
                                Number(
                                  await loadBalanceOfToken(item.addressToken)
                                )
                              ),
                              setReqAllowanceToken!(
                                Number(
                                  await loadAllowanceToken(item.addressToken)
                                )
                              ),
                            ])
                          }
                          if (IsWithdraw != undefined && IsWithdraw) {
                            await Promise.all([
                              setDataAddressToken(item.addressToken),
                              setDataSymbolToken(item.symbolToken),
                              setReqBalanceOfToken(
                                Number(
                                  await loadBalanceSpotToken(item.addressToken)
                                )
                              ),
                            ])
                          }
                          if (IsTransfer != undefined && IsTransfer) {
                            await Promise.all([
                              setDataAddressToken(item.addressToken),
                              setDataSymbolToken(item.symbolToken),
                              setReqBalanceOfToken(
                                Number(
                                  await loadBalanceSpotToken(item.addressToken)
                                )
                              ),
                            ])
                          }
                          setIsLoading(false)
                        }}
                      >
                        <img
                          src={pictureToken}
                          alt="picture of token"
                          className="h-10 w-10"
                        />
                        <div className=" flex flex-col text-left">
                          <span
                            className={` 
                              ${
                                item.addressToken == addressToken
                                  ? 'textShadowWhite '
                                  : ''
                              } `}
                          >
                            {item.symbolToken}
                          </span>
                          <div className="flex gap-1">
                            <span className="text-xs textGray">
                              {shortenAddress(item.addressToken)}
                            </span>
                            <div className="flex">
                              <ClipboardDocumentIcon
                                onClick={(e) => {
                                  copy(item.addressToken)
                                  simpleNotificationToast(
                                    'Copied to clipboard!'
                                  )
                                  e.preventDefault()
                                }}
                                className=" IconHover h-4 w-4 "
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
