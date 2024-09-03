import React from 'react'
// import { useGetCurrentTrades } from '../hooks/useTrades'
import { Trade } from '../../../../models/trade'

const CurrentTrades: React.FC = () => {
  // const { data: trades, error, isLoading } = useGetCurrentTrades()

  // if (isLoading) return <p>Loading...</p>
  // if (error) return <p>Error loading current trades.</p>

  return (
    <div className="rounded-lg bg-gray-900 p-4 text-green-500 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Current Trades</h2>
      {/* <ul className="space-y-2">
        {trades.map((trade: Trade) => (
          <li key={trade.id} className="rounded-lg bg-gray-800 p-3 shadow">
            <p>Date: {new Date(trade.date).toLocaleString()}</p>
            <p>Amount: {trade.amount}</p>
            <p>Instrument: {trade.instrument}</p>
            <p>Result: {trade.result}</p>
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default CurrentTrades
