import React from 'react'
import Balance from './Balance'
import TransactionHistory from './TransactionHistory'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Balance />
      <TransactionHistory />
    </div>
  )
}

export default Dashboard
