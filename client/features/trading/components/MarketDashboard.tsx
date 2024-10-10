import React, { useEffect, useState } from 'react'
import StackedAreaChart from './StackedAreaChart'
import { fetchAllSymbols } from '../../../features/trading/utils/websocketUtils'
import MarketSymbolTable from './MarketSymbolTable'

import '../../../styles/MarketDashboard.css'
import MarketRank from '../../analysis/components/MarketRank'

interface MarketData {
  symbol: string
  prices: number[]
  times: number[]
}

const MarketDashboard: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  const [showRank, setShowRank] = useState(false)

  const handleSelectedSymbol = (symbol: string) => {
    setSelectedSymbol(symbol)
    console.log(symbol)
  }

  return (
    <>
      <div className="market-dashboard">
        <MarketRank />
        <div className="chart-area">
          {selectedSymbol && (
            <StackedAreaChart
              market={selectedSymbol}
              marketName={selectedSymbol}
              timeframe="1m"
            />
          )}
        </div>
        <div className="market-analysis">
          <h2>Market Data & Analytics</h2>
          <button className="button" onClick={() => setShowRank(!showRank)}>
            Analyze Digits
          </button>

          {showRank && <MarketRank />}

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

      <MarketSymbolTable onSelectSymbol={handleSelectedSymbol} />
    </>
  )
}

export default MarketDashboard
