import { useContext, useState } from 'react'
import { ContractContext } from '../context/ContratContext'
import MuiModal from '@mui/material/Modal'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'
interface Props {}
import twitter from '../public/images/images/twitter.svg'
 

function ModaPairLoading() {
  const { isLoadingPairTrade } = useContext(ContractContext)

  return (
    <MuiModal
      open={isLoadingPairTrade}
      // onClose={handleCLose}
      className="relative inset-0  justify-center items-center  bg-[conic-gradient(var(--tw-gradient-stops))] from-white via-zinc-100 to-purple-600 outline-none "
    >
      <>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-10 justify-center items-center mt-40 ">
            <span className="loader9"></span>
            <div className="font-base font-semibold text-sm xs:text-base">
              Loading contract data...
            </div>
          </div>
        </div>
        <div className="text-[10px] sm:text-xs text-white  font-extralight fixed bottom-1 right-5">
         POWERED BY Sphere Lab
        </div>
      </>
    </MuiModal>
  )
}

export default ModaPairLoading
