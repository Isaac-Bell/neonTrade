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
} from '../../../apis/websocketUtils'

interface StackedAreaChartProps {
  market: string
  timeframe: '1m' | '5m' | '1h' // Example timeframes
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({
  market,
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
        width: 300,
        height: 150,
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
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now() / 1000
      const oneMinuteAgo = currentTime - 60 // 1 minute ago

      const recentPrices = dataPoints.filter((priceData) => {
        return priceData.time > oneMinuteAgo
      })

      if (recentPrices.length > 0) {
        const firstPrice = recentPrices[0].value
        const lastPrice = recentPrices[recentPrices.length - 1].value

        if (lastPrice > firstPrice) {
          // Uptrend detected
          areaSeriesRef.current?.applyOptions({
            topColor: 'rgba(0, 255, 0, 0.4)', // Neon green area fill
            bottomColor: 'rgba(0, 255, 0, 0.1)', // Lighter neon green area fill
            lineColor: '#00FF00', // Neon green line
          })
        } else if (lastPrice < firstPrice) {
          // Downtrend detected
          areaSeriesRef.current?.applyOptions({
            topColor: 'rgba(255, 0, 0, 0.4)', // Neon red area fill
            bottomColor: 'rgba(255, 0, 0, 0.1)', // Lighter neon red area fill
            lineColor: '#FF0000', // Neon red line
          })
        }
      }
    }, 1000) // Check every second

    return () => clearInterval(interval)
  }, [dataPoints])

  return (
    <div
      ref={chartContainerRef}
      style={{ background: '#000000', borderRadius: '10px', padding: '10px' }}
    />
  )
}

export default StackedAreaChart
