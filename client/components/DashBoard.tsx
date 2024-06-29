import React from 'react'
import CustomLineChart from '../components/CustomLineChart'
import TradeHistory from './TradeHistory'
import AccountBalance from './AccountBalance'

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-4 space-y-8 text-2xl font-bold">Dashboard</h1>
      <CustomLineChart />
      <AccountBalance />
      {/* <CurrentTrades /> */}
      {/* <PerformanceMetrics /> */}
      <TradeHistory />
    </div>
  )
}

export default Dashboard
