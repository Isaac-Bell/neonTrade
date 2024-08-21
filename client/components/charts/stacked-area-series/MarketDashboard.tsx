import React from 'react'
import StackedAreaChart from './StackedAreaChart'

const MarketDashboard: React.FC = () => {
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
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        <StackedAreaChart market="WLDAUD" />
        <StackedAreaChart market="AAPL" />
        <StackedAreaChart market="frxAUDCHF" />
        <StackedAreaChart market="CRASH1000" />
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
