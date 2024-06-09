import React, { useState, useEffect } from 'react'
import { getTradeHistory } from '../apis/api'
import { Trade } from '../../models/trade'

interface TradeHistoryProps {
  trades: Trade[]
}

const TradeHistory: React.FC<TradeHistoryProps> = ({ trades }) => {
  const [trades, setTrades] = useState([])

  useEffect(() => {
    getTradeHistory().then((data) => setTrades(data.trades))
  }, [])

  return (
    <div className="trade-history-container">
      <h2> Trade History: </h2>
      <ul>
        {trades.map((trade) => (
          <li key={trade.id}>
            <p>Date: {trade.date} </p>
            <p>Amount: {trade.amount} </p>
            <p>Instrument: {trade.instrument} </p>
            <p>Result: {trade.result}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TradeHistory
