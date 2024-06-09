import React, { useState, useEffect } from 'react'
import { getBalance } from '../apis/api'
import CurrencyFormatter from './CurrencyFormatter'
import CurrencySelector from './CurrencySelector'

interface BalanceProps {
  // currency: string
}

const Balance: React.FC<BalanceProps> = ({}) => {
  const [balance, setBalance] = useState(0)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')

  useEffect(() => {
    getBalance().then((data) => setBalance(data.balance))
  }, [])

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency)
  }

  return (
    <div className="balance-container">
      <h2> Account Balance:</h2>
      <CurrencySelector onSelectCurrency={handleCurrencySelect} />
      <p>
        <CurrencyFormatter amount={balance} currency={selectedCurrency} />{' '}
      </p>
    </div>
  )
}

export default Balance
