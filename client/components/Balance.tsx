import React, { useState, useEffect } from 'react'
import { getBalance } from '../apis/api'

interface BalanceProps {
  currency: string
}

const Balance: React.FC<BalanceProps> = ({ currency }) => {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getBalance().then((data) => setBalance(data.balance))
  }, [])

  return (
    <div className="balance-container">
      <h2> Account Balance:</h2>
      <p>
        {' '}
        {balance} {currency}{' '}
      </p>
    </div>
  )
}

export default Balance
