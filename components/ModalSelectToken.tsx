import { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../context/ContratContext'
import MuiModal from '@mui/material/Modal'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { filterImgSrc } from '../utils/filterImg'

interface Props {
  onClose: () => void
  oppositeAddress: string
  setDataAddressToken: (address: string) => void
  setDataSymbolToken: (symbol: string) => void
  setReqBalanceOfToken: (balance: number) => void
  setIsLoading: (isLoading: boolean) => void
  setReqAllowanceToken?: (allownace: number) => void
  IsDeposit?: boolean
  IsTransfer?: boolean
  IsWithdraw?: boolean
}

function ModalSelectToken({
  onClose,
  oppositeAddress,
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
    loadBalanceSpotToken,
    loadBalanceOfToken,
    loadAllowanceToken,
  } = useContext(ContractContext)

  const [showModal, setShowModal] = useState(true)

  const [tempListAddressToken, setTempListAddressToken] =
    useState(listAddressToken)

  useEffect(() => {
    setTempListAddressToken(listAddressToken)
  }, [listAddressToken])

  const handleCLose = () => {
    setShowModal(false)
    onClose()
  }
  return (
    <MuiModal
      open={showModal}
      onClose={handleCLose}
      className="flxex m-auto w-[400px] h-[600px]  justify-center items-center
   rounded-md scrollbar-hide  bgMain border-[1px] border-gray-700 px-8 py-6 outline-none"
    >
      <div className="flex flex-col gap-4 outline-none">
        <h1 className="font-semibold text-xl textShadowWhite ">
          Select a Token
        </h1>
        <button
          onClick={handleCLose}
          className=" absolute right-5 top-5 text-gray-500  hover:bg-gray-800 hover:text-white 
          p-1 rounded-lg  transition-all "
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div
          className="flex flex-row items-center my-5  p-3 bgblackbn border-2 border-gray-800
          hoverBar   text-white  rounded-lg"
        >
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
            className=" text-sm outline-none pl-2 w-full  font-semibold bg-transparent"
            placeholder="Search name or paste address"
            required
          />
        </div>
        <div className="h-[2px] bg-gray-600"></div>
        <div className="myYscroll flex flex-col h-[380px]">
          {tempListAddressToken.length > 0 ? (
            tempListAddressToken.map((item, index) => (
              <>
                <div
                  className="flex flex-row justify-between items-center my-2 p-2 border-2 border-transparent hoverBar rounded-md cursor-pointer"
                  onClick={async () => {
                    if (
                      oppositeAddress.toLocaleLowerCase() !=
                      item.addressToken.toLocaleLowerCase()
                    ) {
                      setDataAddressToken(item.addressToken)
                      setDataSymbolToken(item.symbolToken)
                    }
                    handleCLose()
                    setIsLoading(true)
                    if (IsDeposit != undefined && IsDeposit) {
                      await Promise.all([
                        setReqBalanceOfToken(
                          Number(await loadBalanceOfToken(item.addressToken))
                        ),
                        setReqAllowanceToken!(
                          Number(await loadAllowanceToken(item.addressToken))
                        ),
                      ])
                    }
                    if (IsWithdraw != undefined && IsWithdraw) {
                      await Promise.all([
                        setReqBalanceOfToken(
                          Number(await loadBalanceSpotToken(item.addressToken))
                        ),
                      ])
                    }
                    if (IsTransfer != undefined && IsTransfer) {
                      await Promise.all([
                        setReqBalanceOfToken(
                          Number(await loadBalanceSpotToken(item.addressToken))
                        ),
                      ])
                    }
                    setIsLoading(false)
                  }}
                >
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <img
                      src={filterImgSrc(item.addressToken)}
                      alt="picture of token"
                      className="h-5 w-5 sm:h-10 sm:w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div>{item.symbolToken}</div>
                      <div className="textGray">{item.nameToken}</div>
                    </div>
                  </div>
                  <div>
                    {IsDeposit ? item.balanceOfToken : item.balanceSpot}
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className=" flex items-center justify-center">
              No results found.
            </div>
          )}
        </div>
      </div>
    </MuiModal>
  )
}

export default ModalSelectToken
