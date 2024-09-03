import React, { useState, useEffect } from 'react'
import { fetchHistoricalData } from '../utils/WebSocketUtils'

interface MarketHistoryAnalyzerProps {
  symbol: string
  period: string // e.g., '1d', '1h', '5m'
}

const MarketHistoryAnalyzer: React.FC<MarketHistoryAnalyzerProps> = ({
  symbol,
  period,
}) => {
  const [priceData, setPriceData] = useState<number[]>([])
  const [timeData, setTimeData] = useState<number[]>([])

  const calculateSMA = (data: number[], windowSize: number): number[] => {
    const sma = []
    for (let i = 0; i < data.length - windowSize + 1; i++) {
      const window = data.slice(i, i + windowSize)
      const average = window.reduce((acc, val) => acc + val, 0) / windowSize
      sma.push(average)
    }
    return sma
  }

  useEffect(() => {
    if (priceData.length > 0) {
      const shortTermSMA = calculateSMA(priceData, 5) // e.g., 5-period SMA
      const longTermSMA = calculateSMA(priceData, 20) // e.g., 20-period SMA

      // Now, you can use these SMAs to identify trends
      // Example: Display the SMAs on a chart or analyze crossovers
    }
  }, [priceData])

  useEffect(() => {
    const loadHistoricalData = async () => {
      const { prices, times } = await fetchHistoricalData(symbol, period)
      setPriceData(prices)
      setTimeData(times)
    }

    loadHistoricalData()
  }, [symbol, period])

  return (
    <div>
      {/* Placeholder for chart or analysis results */}
      <h3>Market History for {symbol}</h3>
      <p>Period: {period}</p>
    </div>
  )
}

export default MarketHistoryAnalyzer
