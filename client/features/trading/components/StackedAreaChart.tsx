import React, { useEffect, useRef, useState } from 'react'
import {
  createChart,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from 'lightweight-charts'
import {
  createWebSocketConnection,
  subscribeToTicks,
  requestTickHistory,
} from '../utils/websocketUtils'
import {
  calculateSMA,
  calculateEMA,
  calculateRSI,
  calculateMACD,
  calculateADX,
} from '../../analysis/services/indicatorsService'

interface StackedAreaChartProps {
  market: string
  marketName: string // New prop for the market name
  timeframe: '1m' | '5m' | '1h' // Example timeframes
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({
  market,
  marketName,
  timeframe,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const areaSeriesRef = useRef<ISeriesApi<'Area'> | null>(null)
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [dataPoints, setDataPoints] = useState<
    Array<{ time: UTCTimestamp; value: number }>
  >([])

  useEffect(() => {
    if (chartContainerRef.current) {
      // Initialize the chart
      chartRef.current = createChart(chartContainerRef.current, {
        width: 600,
        height: 300,
        layout: {
          background: '#000000', // Black background
          textColor: '#00FF00', // Neon green text color
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: true, // Show seconds for smaller timeframes
        },
      })

      // Add the area series to the chart
      areaSeriesRef.current = chartRef.current.addAreaSeries({
        topColor: 'rgba(0, 255, 0, 0.4)', // Neon green area fill
        bottomColor: 'rgba(0, 255, 0, 0.1)', // Lighter neon green area fill
        lineColor: '#00FF00', // Neon green line
        lineWidth: 2,
      })
    }
  }, [])

  useEffect(() => {
    const onMessage = (data: any) => {
      if (data.tick) {
        const tick = {
          time: data.tick.epoch as UTCTimestamp,
          value: data.tick.quote,
        }

        // Update the chart with the new tick
        areaSeriesRef.current?.update(tick)

        // Store the tick in our local data points state
        setDataPoints((prevData) => [...prevData, tick])
      } else if (data.history) {
        // Tick history received, set it in the chart
        const historyData = data.history.prices.map(
          (price: number, index: number) => ({
            time: data.history.times[index] as UTCTimestamp,
            value: price,
          }),
        )
        areaSeriesRef.current?.setData(historyData)

        // Store the history in our local data points state
        setDataPoints(historyData)
      }
    }

    const wsConnection = createWebSocketConnection(onMessage, () => {
      requestTickHistory(wsConnection, market) // Fetch tick history
      subscribeToTicks(wsConnection, market) // Subscribe to live ticks
    })

    setWs(wsConnection)

    return () => {
      wsConnection.close()
    }
  }, [market, timeframe])

  // Trend Detection and Chart Color Update
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentTime = Date.now() / 1000
  //     const oneMinuteAgo = currentTime - 60 // 1 minute ago

  //     const recentPrices = dataPoints.filter((priceData) => {
  //       return priceData.time > oneMinuteAgo
  //     })

  //     if (recentPrices.length > 0) {
  //       const firstPrice = recentPrices[0].value
  //       const lastPrice = recentPrices[recentPrices.length - 1].value

  //       if (lastPrice > firstPrice) {
  //         // Uptrend detected
  //         areaSeriesRef.current?.applyOptions({
  //           topColor: 'rgba(0, 255, 0, 0.4)', // Neon green area fill
  //           bottomColor: 'rgba(0, 255, 0, 0.1)', // Lighter neon green area fill
  //           lineColor: '#00FF00', // Neon green line
  //         })
  //       } else if (lastPrice < firstPrice) {
  //         // Downtrend detected
  //         areaSeriesRef.current?.applyOptions({
  //           topColor: 'rgba(255, 0, 0, 0.4)', // Neon red area fill
  //           bottomColor: 'rgba(255, 0, 0, 0.1)', // Lighter neon red area fill
  //           lineColor: '#FF0000', // Neon red line
  //         })
  //       }
  //     }
  //   }, 1000) // Check every second

  //   return () => clearInterval(interval)
  // }, [dataPoints])

  // Indicators Calculation and Visualization
  useEffect(() => {
    if (dataPoints.length > 0) {
      const prices = dataPoints.map((point) => point.value)
      const smaShort = calculateSMA(prices, 5) // Example: 5-period SMA
      const smaLong = calculateSMA(prices, 20) // Example: 20-period SMA
      const ema = calculateEMA(prices, 10) // Example: 10-period EMA
      const rsi = calculateRSI(prices, 14) // Example: 14-period RSI
      const { macdLine, signalLine, histogram } = calculateMACD(
        prices,
        12,
        26,
        9,
      ) // Example MACD settings
      const adx = calculateADX(prices, 14) // Example: 14-period ADX

      const chartData = dataPoints.map((point, index) => ({
        time: point.time,
        price: point.value,
        smaShort: smaShort[index] ?? null,
        smaLong: smaLong[index] ?? null,
        ema: ema[index] ?? null,
        rsi: rsi[index] ?? null,
        macd: macdLine[index] ?? null,
        signalLine: signalLine[index] ?? null,
        histogram: histogram[index] ?? null,
        adx: adx[index] ?? null,
      }))

      if (chartRef.current) {
        const smaShortSeries = chartRef.current.addLineSeries({
          color: '#82ca9d',
          lineWidth: 2,
        })
        smaShortSeries.setData(
          chartData
            .filter((data) => data.smaShort !== null)
            .map((data) => ({ time: data.time, value: data.smaShort! })),
        )

        const smaLongSeries = chartRef.current.addLineSeries({
          color: '#ff7300',
          lineWidth: 2,
        })
        smaLongSeries.setData(
          chartData
            .filter((data) => data.smaLong !== null)
            .map((data) => ({ time: data.time, value: data.smaLong! })),
        )

        const emaSeries = chartRef.current.addLineSeries({
          color: '#ffa500',
          lineWidth: 2,
        })
        emaSeries.setData(
          chartData
            .filter((data) => data.ema !== null)
            .map((data) => ({ time: data.time, value: data.ema! })),
        )

        const rsiSeries = chartRef.current.addLineSeries({
          color: '#ff0000',
          lineWidth: 2,
        })
        rsiSeries.setData(
          chartData
            .filter((data) => data.rsi !== null)
            .map((data) => ({ time: data.time, value: data.rsi! })),
        )

        const macdSeries = chartRef.current.addLineSeries({
          color: '#00ff00',
          lineWidth: 2,
        })
        macdSeries.setData(
          chartData
            .filter((data) => data.macd !== null)
            .map((data) => ({ time: data.time, value: data.macd! })),
        )

        const signalLineSeries = chartRef.current.addLineSeries({
          color: '#0000ff',
          lineWidth: 2,
        })
        signalLineSeries.setData(
          chartData
            .filter((data) => data.signalLine !== null)
            .map((data) => ({ time: data.time, value: data.signalLine! })),
        )

        const adxSeries = chartRef.current.addLineSeries({
          color: '#ffff00',
          lineWidth: 2,
        })
        adxSeries.setData(
          chartData
            .filter((data) => data.adx !== null)
            .map((data) => ({ time: data.time, value: data.adx! })),
        )
      }
    }
  }, [dataPoints])

  return (
    <div
      style={{ background: '#000000', borderRadius: '10px', padding: '10px' }}
    >
      <div
        style={{ color: '#00FF00', textAlign: 'center', marginBottom: '10px' }}
      >
        {marketName} {/* Display the market name */}
      </div>
      <div ref={chartContainerRef} />
    </div>
  )
}

export default StackedAreaChart
