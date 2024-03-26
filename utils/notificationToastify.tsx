import { toast } from 'react-toastify'
import { shortenAddress } from './shortenAddress'
import { filterErrorMessage } from './filterErrorMessage'
import '../styles/font.module.css'
import { urlScan } from './valueConst'
export function notificationToast(myFunction: any) {
  toast.promise(myFunction, {
    pending: {
      icon: ({ theme, type }) => <span className="loader"></span>,
      style: {
        fontFamily: 'IBM Plex Mono',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 1)',
        // backdropFilter: 'blur(5px)',
        // backgroundColor: '#0D111C',
        color: 'white',
        overflow: 'auto',
        fontSize: 12,
        borderWidth: '1px',
        borderColor: '#4b5563',
      },
      render() {
        return (
          <div>
            <h1 className="font-semibold">Processing . . .</h1>
          </div>
        )
      },
    },
    success: {
      icon: ({ theme, type }) => (
        <img src="/images/images/success.png" alt="me" className="h-5 w-5" />
      ),
      autoClose: 5000,
      style: {
        fontFamily: 'IBM Plex Mono',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 1)',
        color: 'white',
        overflow: 'auto',
        fontSize: 12,
        borderWidth: '1px',
        borderColor: '#4b5563',
      },
      render({ data }: any) {
        return (
          <div>
            <h1 className="font-semibold ">Transaction receipt</h1>
            <a
              className="text-[#6f6e84] hover:text-white font-body text-xs underline mt-5"
              href={`${urlScan}/tx/${data}`}
              target="_blank"
            >
              View on bscscan: {shortenAddress(data)}
            </a>
          </div>
        )
      },
    },
    error: {
      icon: ({ theme, type }) => (
        <img src="/images/images/fail.png" alt="me" className="h-5 w-5" />
      ),
      autoClose: 3000,
      style: {
        fontFamily: 'IBM Plex Mono',
        backgroundColor: '#ffffff',
        color: 'black',
        overflow: 'auto',
        fontSize: 12,
        fontWeight: 'bold',
        // boxShadow: '#ff0505 0px 0px 6px 3px  ',
        borderWidth: '1px',
        borderColor: '#000000',
      },
      render({ data }: any) {
        return (
          <div>
            <h1 className="">Transaction Fail</h1>
            <p> {filterErrorMessage(data.message)}</p>
          </div>
        )
      },
    },
  })
}

export function simpleNotificationToast(text: string) {
  toast.success(text, {
    autoClose: 1000,
    style: {
      fontFamily: 'IBM Plex Mono',
      backgroundColor: '#0D111C',
      color: 'white',
      borderWidth: '1px',
      borderColor: 'gray',
      overflow: 'auto',
      fontSize: 16,
      fontWeight: 'bold',
    },
    icon: '📝',
  })
}

export function simpleErrorNotificationToast(text: string) {
  toast.error(text, {
    autoClose: 1000,
    style: {
      fontFamily: 'IBM Plex Mono',
      backgroundColor: '#ffffff',
      color: 'black',
      overflow: 'auto',
      fontSize: 12,
      fontWeight: 'bold',
      // boxShadow: '#ff0505 0px 0px 6px 3px  ',
      borderWidth: '1px',
      borderColor: '#000000',
    },
    icon: ({ theme, type }) => (
      <img src="/images/images/fail.png" alt="me" className="h-5 w-5" />
    ),
  })
}
