import { useAccount, useSigner } from 'wagmi'
import useIsMounted from '../../hooks/useIsMounted'
import { polygonMumbai } from 'wagmi/chains'
// import { contractFaucetABI, contractFaucetAddress } from '../utils/FaucetABI'

import { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../../context/ContratContext'
import HeaderData from '../../components/HeaderData'
import OrderBook from '../../components/OrderBook'
import PanelCommand from '../../components/PanelCommand'
import TradingviewGraph from '../../components/TradingviewGraph'
import History from '../../components/History'
import HistoryMarket from '../../components/HistoryMarket'
import { GetServerSideProps, NextPageContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import ModaPairLoading from '../../components/ModaPairLoading'
import BottomMenu from '../../components/BottomMenu'
import { usePathname } from 'next/navigation'
import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from '../../public/static/charting_library/charting_library'

interface Props {
  query: ParsedUrlQuery
}

enum LabelShowInfo {
  Trade,
  Book,
  Market,
}

const Home = () => {
  const currentPathName = usePathname()
  const router = useRouter()

  const { pid, contractaddress, addresstoken0, addresstoken1 } = router.query

  const mounted = useIsMounted()

  const [labelShowInfo, setLabelShowInfo] = useState<LabelShowInfo>(
    LabelShowInfo.Trade
  )

  const defaultWidgetProps = {
    symbol: 'PRSM',
    interval: '1D' as ResolutionString,
    library_path: '/static/charting_library/',
    locale: 'en',
    charts_storage_url: 'https://saveload.tradingview.com',
    charts_storage_api_version: '1.1',
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    fullscreen: false,
    autosize: true,
  }

  const {
    setContractPairOrderAddress,
    setContractToken0Address,
    setContractToken1Address,
    triggerLoadPairTrade,
    setTriggerLoadPairTrade,
    checkFactoryPair,
    isLoadingPairTrade,

    loadPriceToken,
    loadHistoryMarketOrder,
    loadOrderBook,
    loadBalances,
    loadHistoryByAddress,
  } = useContext(ContractContext)

  useEffect(() => {
    async function check() {
      const isExistPair = await checkFactoryPair(
        addresstoken0 as string,
        addresstoken1 as string
      )
      if (contractaddress && isExistPair) {
        if (
          (contractaddress as String).toLocaleLowerCase() !=
          isExistPair.toLocaleLowerCase()
        ) {
          router.push('/nopair')
        }
      }
    }
    check()
    // console.log('query', router.query)
    // console.log('currentPathName', currentPathName)
    setContractPairOrderAddress(contractaddress as string)
    setContractToken0Address(addresstoken0 as string)
    setContractToken1Address(addresstoken1 as string)
    setTriggerLoadPairTrade(!triggerLoadPairTrade)
  }, [])

  //  useEffect(() => {
  //    const interval = setInterval(async () => {
  //        loadPriceToken()
  //        loadHistoryMarketOrder()
  //        loadOrderBook()
  //        loadBalances()
  //        loadHistoryByAddress()
  //    }, 2000)
  //    return () => {
  //      clearInterval(interval)
  //    }
  //  }, [])

  return (
    mounted && (
      <div className=" relative bg-[#161721]">
        <div className="flex xl:hidden ">
          <BottomMenu
            labelShowInfo={labelShowInfo}
            setLabelShowInfo={(limit) => setLabelShowInfo(limit)}
          />
        </div>
        <div className="border-b-[1px]  border-gray-800 ">
          <HeaderData />
        </div>
        <section className="">
          <div className="flex flex-row h-full max-h-[800px]  ">
            <div
              className={`hidden xl:flex  flex-col h-[500px] xl:h-auto xl:w-[20vw] 2xl:w-[17vw] 3xl:w-[15vw]  
            ${labelShowInfo === LabelShowInfo.Book && '!flex w-full '}
            `}
            >
              <OrderBook />
            </div>
            <div
              className={`hidden xl:flex  flex-col w-[98vw] sm:w-[99vw] xl:w-[60vw] 2xl:w-[66vw] 3xl:w-[70vw] border-r-[1px]  border-l-[1px] border-gray-800 
             ${labelShowInfo === LabelShowInfo.Trade && '!flex'}
            `}
            >
              <div className="border-b-[1px] border-gray-800 ">
                {/* <TVChartContainer {...defaultWidgetProps} /> */}
                <TradingviewGraph />
              </div>
              <div className="">
                <PanelCommand />
              </div>
            </div>
            <div
              className={`hidden xl:flex flex-col  h-[500px] xl:h-auto xl:w-[20vw] 2xl:w-[17vw] 3xl:w-[15vw]  
             ${labelShowInfo === LabelShowInfo.Market && '!flex w-full'}
            `}
            >
              <HistoryMarket />
            </div>
          </div>
        </section>
        <div className="w-full  border-gray-800 border-t-[1px]">
          <History />
        </div>

        {isLoadingPairTrade && <ModaPairLoading />}
      </div>
    )
  )
}

export default Home

// export const getServerSideProps = async (context: NextPageContext) => {
//   const { query } = context
//   return { props: { query } }
// }
