import React from 'react'
import { useTradeHistory } from '../hooks/useTradeHistory'

const TradeHistory: React.FC = () => {
  const { data, error, isLoading } = useTradeHistory()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading trade history.</p>

  return (
    <div className="rounded-lg bg-gray-900 p-4 text-green-500 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Trade History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">TRADE ID</th>
              <th className="px-4 py-2">TIMESTAMP</th>
              <th className="px-4 py-2">TYPE</th>
              <th className="px-4 py-2">QUANTITY</th>
              <th className="px-4 py-2">PRICE</th>
              <th className="px-4 py-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((trade) => (
              <tr key={trade.tradeId} className="bg-gray-800">
                <td className="border px-4 py-2">{trade.tradeId}</td>
                <td className="border px-4 py-2">
                  {new Date(trade.timestamp).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{trade.type}</td>
                <td className="border px-4 py-2">{trade.quantity}</td>
                <td className="border px-4 py-2">{trade.price}</td>
                <td className="border px-4 py-2">{trade.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TradeHistory
