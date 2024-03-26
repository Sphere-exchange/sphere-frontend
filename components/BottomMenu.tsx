import React from 'react'
import { WifiIcon } from '@heroicons/react/24/outline'
import { ChartBarIcon } from '@heroicons/react/24/solid'
import twitter from '../public/images/images/twitter.svg'
import instagram from '../public/images/images/instagram.svg'
import facebook from '../public/images/images/facebook.svg'
import linkedin from '../public/images/images/linkedin.svg'
import Image from 'next/image'
import { TableCellsIcon , ComputerDesktopIcon,ClockIcon} from '@heroicons/react/24/outline'

enum LabelShowInfo {
  Trade,
  Book,
  Market,
}
type Props = {
  setLabelShowInfo: (limit: LabelShowInfo) => void
  labelShowInfo: LabelShowInfo
}

function BottomMenu({ setLabelShowInfo, labelShowInfo }: Props) {
  return (
    <div className="flex items-center justify-center w-full border-b-[1px] border-gray-800 p-1">
      <div className="flex flex-row gap-1   rounded-xl w-fit   border-[1px] border-gray-800 p-1">
        <div
          className={`
          flex flex-col justify-center items-center ButtonHover 
          ${labelShowInfo === LabelShowInfo.Trade && 'Buttonselect'}`}
          onClick={() => setLabelShowInfo(LabelShowInfo.Trade)}
        >
          <ComputerDesktopIcon className="h-6 w-6 " />
          <h1>Trade</h1>
        </div>

        <div
          className={`
          flex flex-col justify-center items-center ButtonHover 
          ${labelShowInfo === LabelShowInfo.Book && 'Buttonselect'}`}
          onClick={() => setLabelShowInfo(LabelShowInfo.Book)}
        >
          <TableCellsIcon className="h-6 w-6 " />
          <h1>Book</h1>
        </div>

        <div
          className={`
          flex flex-col justify-center items-center ButtonHover 
          ${labelShowInfo === LabelShowInfo.Market && 'Buttonselect'}`}
          onClick={() => setLabelShowInfo(LabelShowInfo.Market)}
        >
          <ClockIcon className="h-6 w-6 " />
          <h1>Market</h1>
        </div>
      </div>
    </div>
  )
}

export default BottomMenu
