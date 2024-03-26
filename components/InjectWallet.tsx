import { useContext, useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useNetwork } from 'wagmi'
import { MainChainID } from '../utils/valueConst'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useChainModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { ContractContext } from '../context/ContratContext'
interface Props {}

function InjectWallet() {
  const { chain, chains } = useNetwork()
  const { openChainModal } = useChainModal()

  const [showModal, setShowModal] = useState(false)

  const handleCLose = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (chain != undefined) {
      if (chain.id === MainChainID) {
        setShowModal(false)
      } else {
        setShowModal(true)
      }
    } else {
      setShowModal(false)
    }
  }, [chain])

  return (
    <MuiModal
      open={showModal}
      //   onClose={handleCLose}
      className="flxex m-auto min-w-fit min-h-fit max-w-[350px] max-h-[600px]   justify-center items-center
   rounded-md scrollbar-hide  bgMain border-[1px] border-gray-700 px-8 py-6 outline-none"
    >
      <div className="flex flex-col items-center justify-center gap-5 outline-none">
        <h1 className="font-semibold text-white text-xl">Check your network</h1>
        {/* <button
          onClick={handleCLose}
          className=" absolute right-5 top-5 text-gray-500  hover:bg-gray-800 hover:text-white 
          p-1 rounded-lg  transition-all "
        >
          <XMarkIcon className="h-6 w-6" />
        </button> */}
        <div>
          <p className="textGray">Currently our exchange only supported in</p>
          <p className="textGray">BNB Testnet</p>
        </div>
        <ExclamationTriangleIcon className="IconHover h-16 w-16 text-white !cursor-default" />
        <div className="Buttonselect cursor-default ">
          <h1>Please switch your network to continue</h1>
        </div>
        <button
          className="Buttonpurple"
          onClick={() => {
            openChainModal!()
            handleCLose()
          }}
        >
          Switch or Disconnect
        </button>
      </div>
    </MuiModal>
  )
}

export default InjectWallet
