import React from 'react'
import Balance from './Balance'
import TradeHistory from './TradeHistory'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Balance balance={1000} currency="USD" />
      <TradeHistory trades={[]} />
    </div>
  )
}

export default Dashboard
