import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useContext } from 'react'
import { ContractContext } from '../context/ContratContext'
import copy from 'copy-to-clipboard'
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import { shortenAddress } from '../utils/shortenAddress'
import { simpleNotificationToast } from '../utils/notificationToastify'
import { filterImgSrc } from '../utils/filterImg'

interface Props {
  addressToken: string
  symbolToken: string
  setDataModalaAddressToken: (address: string) => void
  setDataModalSymbolToken: (symbol: string) => void
}

export default function Example({
  addressToken,
  symbolToken,
  setDataModalaAddressToken,
  setDataModalSymbolToken,
}: Props) {
  const { allowlistAddressToken1 } = useContext(ContractContext)
  return (
    <div className="z-10 font-semibold">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                 ${open ? '!bg-gray-800' : ''}
                group flex items-center rounded-md gap-3  px-3 py-2 text-base bgblackbn hover:bg-gray-800 text-white  outline-none`}
            >
              <img
                src={filterImgSrc(addressToken)}
                alt="picture of token"
                className="h-10 w-10 rounded-full"
              />
              <div className=" flex flex-col text-left">
                <span className="textShadowWhite">
                  {symbolToken.toLocaleUpperCase()}
                </span>
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
              <Popover.Panel className="absolute left-[34%] z-10 mt-1 max-h-[260px]  w-8/12 -translate-x-1/2 transform   myXscroll bgblackbn rounded-xl">
                {({ close }) => (
                  <div>
                    {allowlistAddressToken1.map((item) => (
                      <div
                        className="textGray flex items-center gap-2 p-2  border-[1px] border-gray-800 hover:bg-gray-800 cursor-pointer"
                        onClick={async (e) => {
                          close()
                          setDataModalaAddressToken(item.addressToken)
                          setDataModalSymbolToken(item.symbolToken)
                        }}
                      >
                        <img
                          src={filterImgSrc(item.addressToken)}
                          alt="picture of token"
                          className="h-10 w-10 rounded-full"
                        />
                        <div className=" flex flex-col text-left">
                          <span
                            className={` 
                              ${
                                item.addressToken == addressToken
                                  ? 'textShadowWhite'
                                  : ''
                              } `}
                          >
                            {item.symbolToken.toLocaleUpperCase()}
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
