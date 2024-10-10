import React, { useState } from 'react'

import MarketSelection from './MarketSelection'

import TicksHistory from './TradeHistory'
import MarketDashboard from './MarketDashboard'

const Dashboard: React.FC = () => {
  const [selectedMarket, setSelectedMarket] = useState('')

  return (
    <>
      <div className="bg-gray-900">
        <div className=" p-4">
          <h1 className="mb-4 space-y-8 text-2xl font-bold">Dashboard</h1>

          <TicksHistory />
        </div>

        <div>
          <MarketSelection
            selectedMarket={selectedMarket}
            setSelectedMarket={setSelectedMarket}
          />
        </div>
        <MarketDashboard />
      </div>
    </>
  )
}

export default Dashboard
