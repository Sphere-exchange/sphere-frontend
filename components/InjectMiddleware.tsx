import React, { useContext, useEffect } from 'react'
import ModalWebSiteLoading from '../components/ModalWebSiteLoading'
import { ContractContext } from '../context/ContratContext'
import { useAccount } from 'wagmi'
import InjectWallet from './InjectWallet'
type Props = {}

function InjectMiddleware({}: Props) {
  const { isLoadingFirstOpenWebsite } = useContext(ContractContext)
  const { isConnected, isConnecting, isDisconnected } = useAccount()
  return (
    <div>
      {isLoadingFirstOpenWebsite && <ModalWebSiteLoading />}
      {!isLoadingFirstOpenWebsite && window.ethereum && <InjectWallet />}
    </div>
  )
}

export default InjectMiddleware
