import React, { useState } from 'react'
import CustomLineChart from '../components/CustomLineChart'
import AccountBalance from './AccountBalance'
import MarketSelection from './MarketSelection'
import TradeAmountInput from './TradeAmount'
import MartingaleTrading from './MartingaleTrading'

import TicksHistory from './TicksHistory'
import WebSocketTestComponent from './WebsocketTest'
import Chart from './chart/chart'

const Dashboard: React.FC = () => {
  const [selectedMarket, setSelectedMarket] = useState('R_50')
  const [tradeAmount, setTradeAmount] = useState(10)

  return (
    <>
      <div className="p-4">
        <h1 className="mb-4 space-y-8 text-2xl font-bold">Dashboard</h1>
        <Chart market={selectedMarket} />
        <AccountBalance />
        <TicksHistory />
      </div>

      <div>
        <MarketSelection
          selectedMarket={selectedMarket}
          setSelectedMarket={setSelectedMarket}
        />
        <TradeAmountInput
          tradeAmount={tradeAmount}
          setTradeAmount={setTradeAmount}
        />
        <MartingaleTrading
          selectedMarket={selectedMarket}
          tradeAmount={tradeAmount}
        />
      </div>
    </>
  )
}

export default Dashboard
