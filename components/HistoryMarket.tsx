import { time } from 'console'
import { ethers } from 'ethers'
import React, { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { ContractContext } from '../context/ContratContext'
import { ConvertSmallDateTime } from '../utils/DateTime'
import { toEtherandFixFloatingPoint } from '../utils/UnitInEther'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { delay } from '../utils/Delay'

// interface Props {
//   order: EventMarketOrder[]
// }

function HistoryMarket() {
  const {
    marketEvent,
    isLoadingMarketEvent,
    loadHistoryMarketOrder,
    symbolToken0,
    symbolToken1,
  } = useContext(ContractContext)

  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false)
 
  return (
    <div className="h-full py-3 ">
      <div className="flex items-center justify-between px-5 ">
        <span className="text-white font-bold">Market Trades</span>
        {isLoadingRefresh ? (
          <span className="loader2"></span>
        ) : (
          <ArrowPathIcon
            onClick={async () => {
              setIsLoadingRefresh(true)
              await loadHistoryMarketOrder()
              await delay(1000)
              setIsLoadingRefresh(false)
            }}
            className="IconHover h-5 w-5"
          />
        )}
      </div>
      <div className="grid grid-cols-3 py-4 text-[11px] textGray px-5">
        <div className="text-start ">Price({symbolToken1})</div>
        <div className="text-end ">Amount({symbolToken0})</div>
        <div className="text-end ">Time</div>
      </div>
      <div
        className={`myYscroll  h-[80%] xl:h-[90%]
       ${isLoadingRefresh && 'opacity-30'}
        `}
      >
        {marketEvent.map((item, index) => (
          <div className=" grid grid-cols-3 text-xs px-5  py-1 hover:bg-gray-800 transition-all ">
            <div
              className={`text-start  ${
                item.isBuy === 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {item.price}
            </div>
            <div className="text-end">{item.amount}</div>
            <div className="text-end">{ConvertSmallDateTime(item.date)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryMarket
