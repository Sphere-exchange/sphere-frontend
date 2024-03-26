import { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../context/ContratContext'
import MuiModal from '@mui/material/Modal'
import { notificationToast } from '../utils/notificationToastify'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

interface Props {
  onClose: () => void
  side: number
  id: number
}

function ModalDelOrder({ onClose, side, id }: Props) {
  const { sendTxCancelOrder} = useContext(ContractContext)

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
      className="flxex m-auto    max-w-[20vw]  min-w-[350px] h-fit  justify-center items-center
   rounded-md scrollbar-hide  bgMain border-[1px] border-gray-700  p-3 outline-none"
    >
      <div className="flex flex-col  h-full gap-2">
        <div className='items-center justify-center flex flex-col textGray font-semibold'>
         <ExclamationCircleIcon
           className="IconHover h-8 w-8 text-white  !cursor-default"
         />
          <h1>Are you sure you would like to</h1>
          <h1 className='text-white'>Cancel order ?</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCLose}
            className="w-full ButtonGray"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              notificationToast(
                sendTxCancelOrder(side, id)
              )
              handleCLose()
            }}
            className="w-full Buttonpurple"
          >
           Cancel Order
          </button>
        </div>
      </div>
    </MuiModal>
  )
}

export default ModalDelOrder
