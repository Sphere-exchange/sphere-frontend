type Props = {}

import React, { useState, useContext, useEffect } from 'react'
import CountdownTimer from '../components/CountdownTimer'
import Image from 'next/image'
import { ContractContext } from '../context/ContratContext'
import { notificationToast } from '../utils/notificationToastify'

function faucet({}: Props) {
  const { timeUnLockFaucet, sendTxFaucet } = useContext(ContractContext)

  return (
    <>
      <div className="flex  flex-col w-screen  mt-3 xs:mt-10 items-center p-5">
        <div className="p-5  w-fit flex flex-col justify-start  blue-glassmorphism mb-10 ">
          <h1 className="text-white text-2xl sm:text-3xl font-bold textShadowWhite ">
           Faucet
          </h1>
          <Image
            className=" fixed right-3 top-3 "
            src="/bnb.png"
            alt=""
            width="48"
            height="48"
          />

          <div className="flex flex-col mt-2 text-xs sm:text-base textGray">
            <p>This official BNB testnet-faucet</p>
            <p>You need to use gas(bnb) for pay transaction fees</p>
            <button
              onClick={() =>
                window.open('https://www.bnbchain.org/en/testnet-faucet')
              }
              className=" Buttonpurple mt-3 w-fit"
            >
              Faucet
            </button>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-bold  mt-5 textShadowWhite">
            Chain
          </h1>
          <div className="flex flex-col mt-2 text-xs sm:text-base textGray">
            <p>This chainlist.org</p>
            <p>You can add the BNB Testnet chain from here</p>
            <button
              onClick={() =>
                window.open('https://chainlist.org/chain/97')
              }
              className=" Buttonpurple mt-3 w-fit"
            >
              Chain
            </button>
          </div>
        </div>

        <div className="p-5  w-fit flex flex-col justify-start  blue-glassmorphism mb-10 gap-3">
          <h1 className="text-white text-2xl sm:text-3xl font-bold textShadowWhite ">
            Get Test Tokens
          </h1>
          <Image
            className=" fixed right-3 top-3 "
            src='/token/btc.png'
            alt=""
            width="48"
            height="48"
          />

          <div className=" textGray text-xs sm:text-base">
            <p>This faucet transfers TestToken (BTC, ETH, USDT, SPHERE)</p>
            <p>on BNB Testnet for use in Sphere</p>
          </div>
          <h2 className="text-white text-base sm:text-lg font-bold   ">
            Received
          </h2>
          <div className="flex flex-row gap-2 text-xs sm:text-base">
            <button className="Buttonselect bg-slate-800 cursor-default">
              10 BTC
            </button>
            <button className="Buttonselect bg-slate-800 cursor-default">
              100 ETH
            </button>
            <button className="Buttonselect bg-slate-800  cursor-default">
              1,000 SPH
            </button>
            <button className="Buttonselect bg-slate-800  cursor-default">
              10,000 USDT
            </button>
          </div>
          <button
            disabled={timeUnLockFaucet > Math.floor(Date.now() / 1000)}
            onClick={() => {
              notificationToast(sendTxFaucet())
            }}
            className={`${
              timeUnLockFaucet > Math.floor(Date.now() / 1000)
                ? 'cursor-not-allowed bg-gray-600 !text-black hover:opacity-100'
                : ''
            }  Buttonpurple py-2 text-sm sm:text-base mt-2`}
          >
            {Number(timeUnLockFaucet) > Math.floor(Date.now() / 1000) ? (
              <CountdownTimer
                countdownTimestampMs={Number(timeUnLockFaucet + '000')}
              />
            ) : (
              'Faucet'
            )}
          </button>
        </div>
      </div>
    </>
  )
}
export default faucet
