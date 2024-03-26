import Image from 'next/image'
import React, { useContext } from 'react'
import { ContractContext } from '../context/ContratContext'
import { simpleNotificationToast } from '../utils/notificationToastify'
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import copy from 'copy-to-clipboard'
import { shortenAddress } from '../utils/shortenAddress'
import BarSearch from './BarSearch'
import { findAllHeaderDataByAddress } from '../utils/find'

type Props = {}

function HeaderData({}: Props) {
  const {
    listPairOrder,
    priceToken,
    symbolToken0,
    symbolToken1,
    ContractPairOrderAddress,
    ContractToken0Address,
    ContractToken1Address,
  } = useContext(ContractContext)

  return (
    <div className="font-semibold   flex  ">
      <div className="items-center flex hover:bg-gray-800  border-r-[1px] border-gray-800 w-[75%] sm:w-fit">
        <BarSearch></BarSearch>
      </div>
      <div className="text-xs flex gap-6 items-end lg:justify-center justify-end px-5 py-3  w-[25%]  sm:w-fit">
        <div className=" flex flex-col text-sm sm:text-base   justify-center">
          <span className="text-green-600 ">
            {priceToken ? priceToken : '0.00'}{' '}
          </span>
          <span className="textGray text-xs">$ 0.0000</span>
        </div>
        <div className=" hidden sm:flex flex-col pr-5">
          <span className="textGray">24h Change</span>
          <span>
            <>
            {findAllHeaderDataByAddress(listPairOrder,ContractToken0Address,ContractToken1Address).change24H}%
           </>
          </span>
        </div>
        <div className=" hidden md:flex flex-col   pr-5">
          <span className="textGray">24h High</span>
           <span>
            <>
            {findAllHeaderDataByAddress(listPairOrder,ContractToken0Address,ContractToken1Address).high24H}
           </>
          </span>
        </div>
        <div className=" hidden md:flex flex-col   pr-5">
          <span className="textGray">24h Low</span>
           <span>
            <>
            {findAllHeaderDataByAddress(listPairOrder,ContractToken0Address,ContractToken1Address).low24H}
           </>
          </span>
        </div>
        <div className=" hidden xl:flex flex-col   pr-5">
          <span className="textGray">24h Volume({symbolToken0})</span>
           <span>
            <>
            {findAllHeaderDataByAddress(listPairOrder,ContractToken0Address,ContractToken1Address).volumeToken024H}
           </>
          </span>
        </div>
        <div className=" hidden xl:flex flex-col  ">
          <span className="textGray">24h Volume({symbolToken1})</span>
           <span>
            <>
            {findAllHeaderDataByAddress(listPairOrder,ContractToken0Address,ContractToken1Address).volumeToken124H}
           </>
          </span>
        </div>
      </div>
    </div>
  )
}

export default HeaderData
