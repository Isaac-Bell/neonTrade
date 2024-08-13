import React from 'react'
import { useState, useEffect } from 'react'
import { useTradeHistory } from '../hooks/useTradeHistory'
import WebSocketConnection from '../apis/websockets'
import { TickHistoryResponse } from '../../models/trade'
import { getTicksOfScale } from 'recharts/types/util/ChartUtils'

const TicksHistory: React.FC = () => {
  const [ticks, setTicks] = useState<
  TickHistoryResponse []
>([])
  const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=62894')

  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Connected')
      ws.send(JSON.stringify({ authorize: 'R8yyDzZYKW8kyyv' }))
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
    
      if (data.error) {
        console.error('Error in authorization:', data.error.message)
      } else if (data.authorize) {
       

        ws.send(JSON.stringify({  ticks_history: "R_50",
          adjust_start_time: 1,
          count: 10,
          end: "latest",
          start: 1,
          style: "ticks"}))
        } 
        else if (data.history) {
          setTicks(data.history)
          console.log(data.history)

        }
      
    }

    ws.onerror = (error) => {
      console.log('WebSocket Error: ', error)
    }

    return () => {
      ws.close()
    }
  }, []) 

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
          {/* <tbody>
            {ticks?.map((trade) => (
              <tr key={trade.ticks_history} className="bg-gray-800">
                <td className="border px-4 py-2">{trade.tradeId}</td>
                <td className="border px-4 py-2">
                  {new Date(trade.history.times).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{trade.type}</td>
                <td className="border px-4 py-2">{trade.quantity}</td>
                <td className="border px-4 py-2">{trade.price}</td>
                <td className="border px-4 py-2">{trade.status}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  )
}

export default TicksHistory
