import React from 'react'
import { WifiIcon } from '@heroicons/react/24/outline'
import { ChartBarIcon } from '@heroicons/react/24/solid'
import twitter from '../public/images/images/twitter.svg'
import instagram from '../public/images/images/instagram.svg'
import facebook from '../public/images/images/facebook.svg'
import linkedin from '../public/images/images/linkedin.svg'
import Image from 'next/image'

type Props = {}
 
function Footer({}: Props) {
  return (
    <div className="fixed  bottom-0 justify-between bg-[#0D111C]  text-[10px] sm:text-xs font-light px-5 flex flex-row w-full border-gray-800 border-t-[1px] py-1 items-center z-10">
      <div className="flex flex-row gap-3 items-center">
        <div className="text-white pr-3 border-r border-gray-800 flex flex-row gap-1 items-center">
          <h1>Testnet</h1>
        </div>
         
        <div className="flex flex-row items-center gap-1">
          <ChartBarIcon className="h-4 w-4 text-green-600" />
          <span>v0.1</span>
        </div>
      </div>
      {/* 
      <div className="flex flex-row gap-3 items-center">
        <div className="flex flex-row items-center gap-1">
          <ChartBarIcon className="h-4 w-4 text-green-600" />
          <span>v0.1</span>
        </div>
      </div> */}
    </div>
  )
}

export default Footer
