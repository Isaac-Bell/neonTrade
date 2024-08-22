import React, { useEffect, useState } from 'react'
import StackedAreaChart from './StackedAreaChart'
import { fetchAllSymbols } from '../../../apis/websocketUtils'

const MarketDashboard: React.FC = () => {
  const [symbols, setSymbols] = useState<any[]>([])

  useEffect(() => {
    const loadSymbols = async () => {
      try {
        const allSymbols = await fetchAllSymbols()
        setSymbols(allSymbols)
      } catch (error) {
        console.error('Failed to fetch symbols', error)
      }
    }

    loadSymbols()
  }, [])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gap: '20px',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          padding: '20px',
        }}
      >
        {symbols.map((symbol) => (
          <StackedAreaChart key={symbol.symbol} market={symbol.symbol} />
        ))}
      </div>
      <div
        style={{
          backgroundColor: '#000000',
          color: '#00FF00',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h2>Market Data & Analytics</h2>
        <div>
          <p>Symbol: BTCUSD</p>
          <p>Last Price: $33,505.45</p>
          <p>Change: +1.84%</p>
          <p>Volume: 1.13M</p>
          <p>Performance: -4.92% (1D), -38.3% (1M), +41.53% (1Y)</p>
          <p>Technical Indicator: Neutral</p>
        </div>
      </div>
    </div>
  )
}

export default MarketDashboard
