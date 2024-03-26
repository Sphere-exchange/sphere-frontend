import React, { useContext, useEffect, useState, useRef } from 'react'
import '../styles/font.module.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ContractContext } from '../context/ContratContext'
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts'
import { ethers } from 'ethers'
import { convertToOHLC } from '../utils/CovertCandle'

enum TimeFrame {
  _1m = 60,
  _3m = 180,
  _5m = 300,
  _15m = 900,
  _30m = 1800,
  _1h = 3600,
  _4h = 14400,
  _1D = 86400,
}


export const ChartComponent = () => {

 
}

const TradingviewGraph = () => {
    const [statusTimeFrame, setStatusTimeFrame] = useState<TimeFrame>(TimeFrame._1m)

      const chartContainerRef = useRef()
      const chart = useRef()
      const resizeObserver = useRef()
      const candleSeriesRef = useRef()

      const { tradingViewList } = useContext(ContractContext)

      useEffect(() => {
        // console.log('tradingViewList', tradingViewList)
        // if (tradingViewList.length >0) setDataTradingView(convertToOHLC(tradingViewList))
        const handleResize = () => {
          // @ts-ignore
          chart.current.applyOptions({
            // @ts-ignore
            width: chartContainerRef.current.clientWidth,
            // @ts-ignore
            height:420,
          })
        }
        // @ts-ignore
        chart.current = createChart(chartContainerRef.current, {
          // @ts-ignore
          width: chartContainerRef.current.clientWidth,
          // @ts-ignore
          height: 420,
          handleScale: {
            axisPressedMouseMove: true,
          },
          layout: {
            fontFamily: 'IBM Plex Mono',
            background: {
              color: '#101014',
            },
            textColor: '#ffffff',
          },
          grid: {
            vertLines: {
              color: '#1B1C1F',
            },
            horzLines: {
              color: '#1B1C1F',
            },
          },
          crosshair: {
            mode: CrosshairMode.Normal,
          },
          priceScale: {
            borderColor: '#485c7b',
          },
          timeScale: {
            timeVisible: true,
            secondVisible: false,
            borderColor: '#485c7b',
          },
        })
        // @ts-ignore
        chart.current.timeScale().fitContent()
        // @ts-ignore
        candleSeriesRef.current = chart.current.addCandlestickSeries()
        // candleSeries.setData(tradingViewList)

        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
          // @ts-ignore
          chart.current.remove()
        }
      }, [])

      useEffect(() => {

        if (tradingViewList.length > 0) {
          if (chart.current) {
            // @ts-ignore
            candleSeriesRef.current.setData(convertToOHLC(tradingViewList, statusTimeFrame))
          }
        }else{
           if (chart.current) {
            // @ts-ignore
            candleSeriesRef.current.setData([])
          }
        }
      }, [tradingViewList, statusTimeFrame])




  return (
    <div className="h-full text-xs xs:text-sm textGray">
      <div className="flex flex-row h-[30px] border-b-[1px] border-gray-800  px-5 gap-4 ">
        <div className="h-full flex items-center font-semibold    ">Time</div>
        <div
          onClick={() => setStatusTimeFrame(TimeFrame._1m)}
          className={`${
            statusTimeFrame === TimeFrame._1m && 'text-white'
          } hover:text-white cursor-pointer h-full flex items-center font-semibold transition-all   `}
        >
          1m
        </div>
        <div
          onClick={() => setStatusTimeFrame(TimeFrame._3m)}
          className={`${
            statusTimeFrame === TimeFrame._3m && 'text-white'
          } hover:text-white cursor-pointer h-full flex items-center font-semibold transition-all   `}
        >
          3m
        </div>
        <div
          onClick={() => setStatusTimeFrame(TimeFrame._5m)}
          className={`${
            statusTimeFrame === TimeFrame._5m && 'text-white'
          } hover:text-white cursor-pointer h-full flex items-center font-semibold transition-all   `}
        >
          5m
        </div>
        <div
          onClick={() => setStatusTimeFrame(TimeFrame._15m)}
          className={`${
            statusTimeFrame === TimeFrame._15m && 'text-white'
          } hover:text-white cursor-pointer h-full flex items-center font-semibold transition-all   `}
        >
          15m
        </div>
        <div
          onClick={() => setStatusTimeFrame(TimeFrame._30m)}
          className={`${
            statusTimeFrame === TimeFrame._30m && 'text-white'
          } hover:text-white cursor-pointer h-full flex items-center font-semibold transition-all   `}
        >
          30m
        </div>
        <div
          onClick={() => setStatusTimeFrame(TimeFrame._1h)}
          className={`${
            statusTimeFrame === TimeFrame._1h && 'text-white'
          } hover:text-white cursor-pointer h-full flex items-center font-semibold transition-all   `}
        >
          1H
        </div>
        <div
          onClick={() => setStatusTimeFrame(TimeFrame._4h)}
          className={`${
            statusTimeFrame === TimeFrame._4h && 'text-white'
          } hover:text-white cursor-pointer h-full flex items-center font-semibold transition-all   `}
        >
          4H
        </div>
        <div
          onClick={() => setStatusTimeFrame(TimeFrame._1D)}
          className={`${
            statusTimeFrame === TimeFrame._1D && 'text-white'
          } hover:text-white cursor-pointer h-full flex items-center font-semibold transition-all   `}
        >
          1D
        </div>
      </div>
      <div ref={chartContainerRef as any} />
    </div>
  )
}

export default TradingviewGraph
