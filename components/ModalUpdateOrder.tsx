import { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../context/ContratContext'
import MuiModal from '@mui/material/Modal'
import { notificationToast } from '../utils/notificationToastify'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface Props {
  onClose: () => void
  side: number
  id: number
}

function ModalUpdateOrder({ onClose, side, id }: Props) {
  const {  symbolToken0,symbolToken1 } = useContext(ContractContext)

  const [showModal, setShowModal] = useState(true)

  const [amountInput, setAmountInput] = useState<string>()
  const [priceInput, setPriceInput] = useState<string>()

  const handleCLose = () => {
    setShowModal(false)
    onClose()
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleCLose}
      className=" m-auto max-w-[20vw]  min-w-[350px] h-fit  justify-center items-center
   rounded-md scrollbar-hide  bgMain border-[1px] border-gray-700  p-3"
    >
      <div className="flex flex-col h-full gap-2  outline-none">
        <div className="InputOrder">
          <span className="flex items-center pl-2 pr-5">Price</span>
          <input
            type="number"
            onKeyPress={(event) => {
              if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                event.preventDefault()
              }
            }}
            onChange={(e) => {
              setPriceInput(e.target.value)
            }}
            className="  w-full py-1 pr-2 text-right  bg-transparent outline-none  text-white "
          />
          <span className="flex items-center  pr-5">{symbolToken1}</span>
        </div>

        <div className="InputOrder">
          <span className="flex items-center pl-2 pr-5">Amount</span>
          <input
            type="number"
            onKeyPress={(event) => {
              if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                event.preventDefault()
              }
            }}
            onChange={(e) => {
              setAmountInput(e.target.value)
            }}
            className="  w-full py-1 pr-2 text-right  bg-transparent outline-none  text-white"
          />
          <span className="flex items-center  pr-5">{symbolToken0}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCLose} className="w-full ButtonGray">
            Cancel
          </button>
          <button
            onClick={() => {

              handleCLose()
            }}
            className="w-full Buttonpurple"
          >
            Update order
          </button>
        </div>
      </div>
    </MuiModal>
  )
}

export default ModalUpdateOrder
