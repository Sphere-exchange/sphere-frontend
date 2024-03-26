import React, { useContext, useState } from 'react'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { ContractContext } from '../context/ContratContext'
import { notificationToast } from '../utils/notificationToastify'
import { HardCodeSymbol1, HardCodeTokne1 } from '../utils/valueConst'
import BarAllowlistAddressToken1 from '../components/BarAllowlistAddressToken1'

type Props = {}

function createpair({}: Props) {
  const { sendTxCreatePair } = useContext(ContractContext)

  const [inputAddressToken0, setInputAddressToken0] = useState('')

  const [modalAddressToken, setModalaAddressToken] = useState(HardCodeTokne1)
  const [modalSymbolToken, setModalSymbolToken] = useState(HardCodeSymbol1)
  return (
    <div className="flex flex-1 justify-center items-center mt-3 xs:mt-10">
      <div className="flex flex-col gap-5 w-[95vw] sm:w-[65vw] md:w-[50vw] xl:w-[35vw] 2xl:w-[30vw]">
        <span className="text-2xl sm:text-3xl  font-semibold textShadowWhite">
          Create New Pair
        </span>
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-xl font-semibold">
              List your token on Sphere
            </span>
          </div>

          <div className="flex w-[90%] text-[10px] xs:text-xs lg:text-sm  textGray break-words">
            <p>
              In our exchange you will be able to list your any token in the
              base asset but the quote asset will be set by us. (BASE/QUOTE)
            </p>
          </div>
        </div>
        <div className="flex flex-col blue-glassmorphism p-5  gap-10 text-sm lg:text-base">
          <form className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 ">
              <span className="font-semibold">Base Asset Address</span>
              <div className="flex flex-row">
                <input
                  type="text"
                  onKeyPress={(event) => {
                    if (!/^[a-zA-Z0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setInputAddressToken0(e.target.value)
                  }}
                  className=" text-xs lg:text-sm outline-none pl-5  p-4 font-semibold bgblackbn border-[1px] border-gray-800
                  hover:border-gray-600    text-white  rounded-lg block w-full"
                  placeholder="0x..."
                  required
                />
              </div>
            </div>
            <div className=" flex justify-center ">
              <img
                src="/logoblack.png"
                alt="me"
                className="h-12 w-12 p-1  bg-[#ffffff] rounded-lg hover:scale-125 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-semibold">Quote Asset Address</span>
              <BarAllowlistAddressToken1
                addressToken={modalAddressToken}
                symbolToken={modalSymbolToken}
                setDataModalaAddressToken={(address) =>
                  setModalaAddressToken(address)
                }
                setDataModalSymbolToken={(symbol) =>
                  setModalSymbolToken(symbol)
                }
              />
              <div className=" flex justify-center mt-3 ">
                <button
                  onClick={(event) => {
                    event.preventDefault()
                    notificationToast(
                      sendTxCreatePair(
                        inputAddressToken0.trim(),
                        modalAddressToken.trim()
                      )
                    )
                  }}
                  className="Buttonpurple px-6 py-2"
                >
                  Create Pair
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default createpair
