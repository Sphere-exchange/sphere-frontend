import * as React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  GlobeAltIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid'
import { ContractContext } from '../context/ContratContext'
import { useAccount } from 'wagmi'
import {
  notificationToast,
  simpleErrorNotificationToast,
} from '../utils/notificationToastify'
import { ConvertSmallDateTime, ConvertFullDateTime } from '../utils/DateTime'
import { shortenAddress } from '../utils/shortenAddress'

export default function ChatGlobal() {
  const { dataChat, loadChat, sendTxChat, isLoadingChat } =
    React.useContext(ContractContext)

  const { address } = useAccount()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const textAreaRef = React.useRef(null)
  const [val, setVal] = React.useState('')

  React.useEffect(() => {
    if (textAreaRef.current != null) {
      // @ts-ignore: Unreachable code error
      textAreaRef.current.style.height = 'auto'
      // @ts-ignore: Unreachable code error
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
  }, [val])

  return (
    <div className="fixed bottom-2 right-3 z-20 ">
      <Button onClick={handleClick} className="!bg-[#6e38cc] ">
        <div className=" flex gap-1 justify-center items-center text-white">
          <div>CHAT</div>
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-white" />
        </div>
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className=" w-[350px] h-[600px]">
          <div className="bg-[#6e38cc] h-[10%] text-white p-3 flex gap-3 items-center justify-center">
            <GlobeAltIcon className="h-6 w-6 text-white" />
            <div className="">Chat Global</div>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <button
              onClick={handleClose}
              className=" absolute right-5 hover:bg-red-400 text-white p-1 rounded-lg  transition-all "
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="overflow-y-auto w-full p-4 h-[80%]">
            <div className="flex flex-col gap-3">
              {isLoadingChat ? (
                <div className="w-full animate-pulse flex flex-col gap-5">
                  <div className=" text-center ">Loading...</div>
                  <div className="flex w-full">
                    <div className="h-14 w-1/2 bg-slate-400 rounded"></div>
                  </div>
                  <div className="flex w-full">
                    <div className="h-14 w-1/2 bg-slate-400 rounded"></div>
                  </div>
                  <div className="flex w-full  justify-end">
                    <div className="h-14 w-1/2 bg-slate-400 rounded"></div>
                  </div>
                  <div className="flex w-full">
                    <div className="h-14 w-1/2 bg-slate-400 rounded"></div>
                  </div>
                  <div className="flex w-full  justify-end">
                    <div className="h-14 w-1/2 bg-slate-400 rounded"></div>
                  </div>
                </div>
              ) : (
                dataChat.map((info, index) => (
                  <>
                    {info.user == address ? (
                      <div className="  flex items-center w-full justify-end">
                        <div className=" bg-[#6e38cc] text-white rounded-xl  px-4 py-2 text-sm">
                          <div className="text-sm">{info.msg}</div>
                          <div className="text-[9px] text-end mt-1">
                            {ConvertFullDateTime(info.date)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-row gap-3">
                        <div className="flex flex-col justify-center items-center">
                          <UserCircleIcon className="h-10 w-10 text-purple-600" />
                          <div className="text-[9px]">
                            {shortenAddress(info.user)}
                          </div>
                        </div>
                        <div className="flex flex-col  bg-gray-100 rounded-xl px-4 py-2">
                          <div className='text-sm "'>{info.msg}</div>
                          <div className="text-[9px] text-end mt-1">
                            {ConvertFullDateTime(info.date)}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))
              )}
            </div>
          </div>
          <div className=" w-full h-[10%] flex  border-t-[1px] p-2  border-gray-300 overflow-y-auto">
            <div className="flex flex-row w-full h-full items-center ">
              <textarea
                rows={1}
                wrap="soft"
                onChange={(e) => {
                  setVal(e.target.value)
                }}
                className="text-wrap text-sm outline-none pl-4 
                   text-black w-11/12    resize-none"
                placeholder="Write ..."
                value={val}
                ref={textAreaRef}
              />

              <div className="absolute right-5">
                <PaperAirplaneIcon
                  className="h-4 w-4 text-[#6e38cc] hover:opacity-80 cursor-pointer transition-all"
                  onClick={() => {
                    if (val.length > 0) {
                      notificationToast(sendTxChat(val))
                    } else {
                      simpleErrorNotificationToast('Please write something')
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  )
}
