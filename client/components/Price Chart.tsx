import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import MarketDataAnalyzer from './MarketDataAnalyzer'

const PriceChart = () => {
  const [prices, setPrices] = useState<number[]>([])
  const [timestamps, setTimestamps] = useState<string[]>([])
  const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=62894')

  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Connected')
      ws.send(JSON.stringify({ ticks: 'R_50', subscribe: 1 }))
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.tick) {
        setPrices((prevPrices) => [...prevPrices, data.tick.quote])
        setTimestamps((prevTimestamps) => [
          ...prevTimestamps,
          new Date(data.tick.epoch * 1000).toLocaleTimeString(),
        ])
      }
    }

    ws.onerror = (error) => {
      console.log('WebSocket Error: ', error)
    }

    return () => {
      ws.close()
    }
  }, [])

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Price',
        data: prices,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  }

  return (
    <div>
      <h2>Live Price Data</h2>
      {/* <Line data={data} options={options} /> */}
      <MarketDataAnalyzer />
    </div>
  )
}

export default PriceChart
