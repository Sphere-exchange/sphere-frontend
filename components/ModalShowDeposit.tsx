import { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../context/ContratContext'
import MuiModal from '@mui/material/Modal'
import {
  notificationToast,
  simpleNotificationToast,
} from '../utils/notificationToastify'
import { ClipboardDocumentIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { shortenAddress } from '../utils/shortenAddress'
import BarWalletToken from './BarWalletToken'
import copy from 'copy-to-clipboard'
import Loader2 from './Loader2'
import ModalSelectToken from './ModalSelectToken'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { filterImgSrc } from '../utils/filterImg'
interface Props {
  onClose: () => void
  addressToken: string
  symbolToken: string
  allowanceToken: number
  balanceOfToken: number
}

function ModalShowDeposit({
  onClose,
  addressToken,
  symbolToken,
  allowanceToken,
  balanceOfToken,
}: Props) {
  const {
    sendTxDeposit,
    sendTxApproveToken,
    triggerWallet,
    loadBalanceOfToken,
    loadAllowanceToken,
  } = useContext(ContractContext)

  const [showModal, setShowModal] = useState(true)

  const [amountInput, setAmountInput] = useState<string>('')

  const [reqBalanceOfToken, setReqBalanceOfToken] =
    useState<number>(balanceOfToken)
  const [reqAllowanceToken, setReqAllowanceToken] =
    useState<number>(allowanceToken)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [modalAddressToken, setModalaAddressToken] = useState(addressToken)
  const [modalSymbolToken, setModalSymbolToken] = useState(symbolToken)

  const [showModalSelectToken, setShowModalSelectToken] = useState(false)

  const handleCLose = () => {
    setShowModal(false)
    onClose()
  }

  useEffect(() => {
    const loadBalanceAndAllowanceToken = async () => {
      setIsLoading(true)
      setReqBalanceOfToken(Number(await loadBalanceOfToken(modalAddressToken)))
      setReqAllowanceToken(Number(await loadAllowanceToken(modalAddressToken)))
      setIsLoading(false)
    }

    loadBalanceAndAllowanceToken()
  }, [triggerWallet])

  return (
    <>
      <MuiModal
        open={showModal}
        onClose={handleCLose}
        className="flxex m-auto min-w-fit min-h-fit max-w-[350px] max-h-[600px]   justify-center items-center
   rounded-md scrollbar-hide  bgMain border-[1px] border-gray-700 px-8 py-6 outline-none"
      >
        <div className="flex flex-col gap-4 outline-none">
          <h1 className="font-semibold text-xl textShadowWhite">Deposit</h1>
          <button
            onClick={handleCLose}
            className=" absolute right-5 top-5 text-gray-500  hover:bg-gray-800 hover:text-white 
          p-1 rounded-lg  transition-all "
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div>
            <h1 className="font-semibold mb-2">Asset</h1>
            <div
              className="w-fit cursor-pointer  group flex items-center rounded-md gap-3  px-3 py-2 text-base bg-gray-900 hover:bg-gray-800 text-white  outline-none"
              onClick={() => setShowModalSelectToken(true)}
            >
              <img
                src={filterImgSrc(modalAddressToken)}
                alt="picture of token"
                className="h-10 w-10 rounded-full"
              />
              <div className=" flex flex-col text-left">
                <span className="textShadowWhite">{modalSymbolToken}</span>
                <div className="flex gap-1">
                  <span className="text-xs textGray">
                    {shortenAddress(modalAddressToken)}
                  </span>
                  <div className="flex">
                    <ClipboardDocumentIcon
                      onClick={(e) => {
                        copy(modalAddressToken)
                        simpleNotificationToast('Copied to clipboard!')
                        e.preventDefault()
                      }}
                      className=" IconHover h-4 w-4 "
                    />
                  </div>
                </div>
              </div>
              <ChevronDownIcon
                className={`
                  h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 className="font-semibold mb-2">Amount</h1>
            <div
              className="text-white bg-gray-900 font-semibold flex flex-col text-base px-3 py-2 border-[1px] border-gray-900 
            hover:border-gray-400 cursor-text  transition-all rounded-lg "
            >
              <div className="flex p-2">
                <input
                  placeholder="0.0000"
                  type="number"
                  value={amountInput}
                  onKeyPress={(event) => {
                    if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setAmountInput(e.target.value)
                  }}
                  className=" text-xl w-full py-2 pr-2 text-left  bg-transparent outline-none  text-white "
                />

                <div className="text-sm bg-gray-700 py-2 px-4 rounded-lg flex items-center justify-center gap-1 ">
                  <span>{modalSymbolToken}</span>
                  <img
                    src={filterImgSrc(modalAddressToken)}
                    alt="picture of token"
                    className="h-6 w-6 rounded-full"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end text-sm px-2">
                <span className="text-gray-500 flex gap-2">
                  Balance:{' '}
                  {isLoading ? <Loader2 /> : <span>{reqBalanceOfToken}</span>}
                </span>
                <span
                  className="text-white cursor-pointer hover:text-gray-400 transition-all"
                  onClick={() => {
                    setAmountInput(String(reqBalanceOfToken))
                  }}
                >
                  Max
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col font-semibold bg-gray-900  rounded-lg py-2 px-4 ">
              <h1>No Minimum/Max Deposit</h1>
            </div>
          </div>
          <button
            disabled={isLoading}
            onClick={() => {
              if (reqAllowanceToken >= Number(amountInput)) {
                notificationToast(sendTxDeposit(amountInput, modalAddressToken))
              } else {
                notificationToast(sendTxApproveToken(modalAddressToken))
              }
            }}
            className={`w-full py-3 
          ${isLoading ? 'cursor-not-allowed ButtonGray' : 'Buttonpurple'}
          `}
          >
            {reqAllowanceToken >= Number(amountInput) ? 'Deposit' : 'Approve'}
          </button>
        </div>
      </MuiModal>
      {showModalSelectToken && (
        <ModalSelectToken
          onClose={() => setShowModalSelectToken(false)}
          oppositeAddress='0x'
          setDataAddressToken={(address) => setModalaAddressToken(address)}
          setDataSymbolToken={(symbol) => setModalSymbolToken(symbol)}
          setReqAllowanceToken={(balance) => setReqAllowanceToken(balance)}
          setReqBalanceOfToken={(allownace) => setReqBalanceOfToken(allownace)}
          setIsLoading={(isLoading) => setIsLoading(isLoading)}
          IsDeposit={true}
        />
      )}
    </>
  )
}

export default ModalShowDeposit
