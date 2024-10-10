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

interface StackedAreaChartProps {
  market: string
  marketName: string
  timeframe: '1m' | '5m' | '1h'
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({
  market,
  marketName,
  timeframe,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const areaSeriesRef = useRef<ISeriesApi<'Area'> | null>(null)
  const [dataPoints, setDataPoints] = useState<
    Array<{ time: UTCTimestamp; value: number }>
  >([])

  useEffect(() => {
    // Initialize the chart
    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: 600,
        height: 400,
        layout: {
          background: { type: 'solid', color: '#000000' },
          textColor: '#00FF00',
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
        },
      })

      // Add the area series to the chart
      areaSeriesRef.current = chartRef.current.addAreaSeries({
        topColor: 'rgba(0, 255, 0, 0.4)',
        bottomColor: 'rgba(0, 255, 0, 0.1)',
        lineColor: '#00FF00',
        lineWidth: 2,
      })
    }

    // Cleanup on component unmount
    return () => {
      if (chartRef.current) chartRef.current.remove()
    }
  }, []) // Run only on mount

  useEffect(() => {
    const onMessage = (data: any) => {
      if (data.tick) {
        const tick = {
          time: data.tick.epoch as UTCTimestamp,
          value: data.tick.quote,
        }

        // Update the chart with new tick data
        areaSeriesRef.current?.update(tick)
        setDataPoints((prevData) => [...prevData, tick])
      } else if (data.history) {
        const historyData = data.history.prices.map(
          (price: number, index: number) => ({
            time: data.history.times[index] as UTCTimestamp,
            value: price,
          }),
        )

        // Set the historical data in the chart
        areaSeriesRef.current?.setData(historyData)
        setDataPoints(historyData)
      }
    }

    // Set up WebSocket connection and handle subscriptions
    const wsConnection = createWebSocketConnection(onMessage, () => {
      // Request tick history and subscribe to ticks once the connection is open
      requestTickHistory(market)
      subscribeToTicks(market)
    })

    return () => {
      // Close the WebSocket connection on cleanup
      if (wsConnection) wsConnection.close()
    }
  }, [market]) // Re-run whenever `market` changes

  return (
    <div
      style={{ background: '#000000', borderRadius: '10px', padding: '10px' }}
    >
      <div
        style={{ color: '#00FF00', textAlign: 'center', marginBottom: '10px' }}
      >
        {marketName}
      </div>
      <div ref={chartContainerRef} />
    </div>
  )
}

export default StackedAreaChart
