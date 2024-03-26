import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ContractContext } from '../context/ContratContext'
import {
  HardCodePairOrder,
  HardCodeTokne0,
  HardCodeTokne1,
} from '../utils/valueConst'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function MenuDropdown() {
  const { pathname } = useRouter()
  const menu = [
    { text: 'Marktes', src: '/markets', pathname: 'markets' },
    {
      text: 'Trade',
      src: `/trade/tradepair?contractaddress=${HardCodePairOrder}&addresstoken0=${HardCodeTokne0}&addresstoken1=${HardCodeTokne1}`,
      pathname: 'trade',
    },
    { text: 'Swap', src: '/swap', pathname: 'swap' },
    { text: 'CreatePair', src: '/createpair', pathname: 'createpair' },
    { text: 'Fee', src: '/fee', pathname: 'fee' },
    { text: 'Faucet', src: '/faucet', pathname: 'faucet' },
  ]
  return (
    <Menu as="div" className=" z-30 relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className="inline-flex w-full rounded-xl  justify-center bg-[#0d111c] px-4 py-2 text-sm font-bold text-white  
              hover:opacity-70 transition-all duration-100 "
            >
              <div className={`${open ? 'Buttonselect' : 'ButtonHover'}`}>
                <Bars3Icon className="  h-6 w-6 " />
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-5  w-56 origin-top-right divide-y border-[1px] border-gray-800 divide-gray-800 rounded-md text-white bg-[#0D111C] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {menu.map((tab) => (
                <Menu.Item key={tab.src}>
                  {({ active, close }) => (
                    <div>
                      <Link
                        onClick={close}
                        href={tab.src}
                        className={`
                        ${active ? 'scale-105 text-purple-500' : ''} 
                        ${
                          pathname.includes(tab.pathname) === true
                            ? ' text-purple-500'
                            : ''
                        } 
                        group text-white flex w-full items-center rounded-md px-2 py-2 text-xs sm:text-sm font-bold transition-all`}
                      >
                        {tab.text}
                      </Link>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
