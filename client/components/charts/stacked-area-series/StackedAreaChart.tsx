import React, { useEffect, useRef, useState } from 'react'
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts'
import {
  createWebSocketConnection,
  subscribeToTicks,
  requestTickHistory,
} from '../../../apis/websocketUtils'

interface StackedAreaChartProps {
  market: string
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ market }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const areaSeriesRef = useRef<ISeriesApi<'Area'> | null>(null)
  const [ws, setWs] = useState<WebSocket | null>(null)

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
        // Live tick received, add it to the chart
        areaSeriesRef.current?.update({
          time: data.tick.epoch,
          value: data.tick.quote,
        })
      } else if (data.history) {
        // Tick history received, set it in the chart
        const historyData = data.history.prices.map(
          (price: number, index: number) => ({
            time: data.history.times[index],
            value: price,
          }),
        )
        areaSeriesRef.current?.setData(historyData)
      }
    }

    const wsConnection = createWebSocketConnection(onMessage, () => {
      // This callback ensures that WebSocket is open before making requests
      requestTickHistory(wsConnection, market) // Fetch tick history
      subscribeToTicks(wsConnection, market) // Subscribe to live ticks
    })

    setWs(wsConnection)

    return () => {
      wsConnection.close()
    }
  }, [market])

  return (
    <div
      ref={chartContainerRef}
      style={{ background: '#000000', borderRadius: '10px', padding: '10px' }}
    />
  )
}

export default StackedAreaChart
