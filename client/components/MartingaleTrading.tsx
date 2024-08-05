import React, { useState, useEffect } from 'react'
import WebSocketConnection from '../apis/websockets.tsx'

const MartingaleTrading = ({ selectedMarket, tradeAmount }) => {
  const [balance, setBalance] = useState(20000)
  const [currentAmount, setCurrentAmount] = useState(tradeAmount)
  const [isTrading, setIsTrading] = useState(false)

  const handleTrade = (result) => {
    if (result === 'win') {
      setCurrentAmount(tradeAmount)
    } else {
      setCurrentAmount(currentAmount * 2.2)
    }
  }

  useEffect(() => {
    if (isTrading) {
      // Placeholder for trade execution logic
      // Example: executeTrade(selectedMarket, currentAmount);
    }
  }, [isTrading, currentAmount, selectedMarket])

  return (
    <div>
      <WebSocketConnection
        onMessage={(data) => {
          if (data.balance) {
            setBalance(data.balance.balance)
          }
        }}
      />
      <h3>Account Balance: ${balance.toFixed(2)}</h3>
      <button onClick={() => setIsTrading(true)}>Start Trading</button>
      <button onClick={() => setIsTrading(false)}>Stop Trading</button>
    </div>
  )
}

export default MartingaleTrading
