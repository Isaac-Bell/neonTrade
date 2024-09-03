import React, { useState } from 'react'
import AccountBalance from './AccountBalance'
import MarketSelection from './MarketSelection'

import TicksHistory from './TradeHistory'
import MarketDashboard from './MarketDashboard'

const Dashboard: React.FC = () => {
  const [selectedMarket, setSelectedMarket] = useState('')

  return (
    <>
      <div className="p-4">
        <h1 className="mb-4 space-y-8 text-2xl font-bold">Dashboard</h1>

        <AccountBalance />
        <TicksHistory />
      </div>

      <div>
        <MarketSelection
          selectedMarket={selectedMarket}
          setSelectedMarket={setSelectedMarket}
        />
      </div>
      <MarketDashboard />
    </>
  )
}

export default Dashboard
