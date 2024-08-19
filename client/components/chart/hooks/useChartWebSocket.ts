import { useState, useEffect } from 'react'
import {
  getHistoryData,
  getRealTimeSubscription,
  handleWebSocketMessage,
} from '../utils'
import { timePeriods, getGranularity } from '../constants'

export const useChartWebSocket = (market: string, timePeriod: string) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Stock Price',
        data: [],
        borderColor: '#00C805',
        borderWidth: 2,
        fill: true,
        backgroundColor: 'rgba(0, 200, 5, 0.1)',
      },
    ],
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [wsInstance, setWsInstance] = useState<WebSocket | null>(null)

  const resetChartData = () => {
    setChartData({
      labels: [],
      datasets: [
        {
          label: 'Stock Price',
          data: [],
          borderColor: '#00C805',
          borderWidth: 2,
          fill: true,
          backgroundColor: 'rgba(0, 200, 5, 0.1)',
        },
      ],
    })
    setLoading(true)
  }

  const closeWebSocket = () => {
    if (wsInstance) {
      wsInstance.onclose = () => setWsInstance(null)
      wsInstance.close()
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      resetChartData()
      closeWebSocket()

      setTimeout(() => {
        const ws = new WebSocket(
          'wss://ws.binaryws.com/websockets/v3?app_id=1089',
        )
        setWsInstance(ws)

        const granularity = getGranularity(timePeriod)

        ws.onopen = () => {
          ws.send(
            JSON.stringify(
              getHistoryData(market, timePeriods[timePeriod], granularity),
            ),
          )
        }

        ws.onmessage = (msg) => {
          handleWebSocketMessage(msg, setChartData, setLoading)
          ws.send(JSON.stringify(getRealTimeSubscription(market)))
        }

        ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          setLoading(false)
        }

        ws.onclose = () => setWsInstance(null)
      }, 500)
    }

    fetchData()

    return () => closeWebSocket()
  }, [market, timePeriod])

  return { chartData, loading }
}
