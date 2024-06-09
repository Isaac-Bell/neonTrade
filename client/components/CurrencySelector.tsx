import React, { useState } from 'react'

interface CurrencySelectorProps {
  onSelectCurrency: (currency: string) => void
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  onSelectCurrency,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedCurrency = event.target.value
    setSelectedCurrency(selectedCurrency)
    onSelectCurrency(selectedCurrency)
  }

  return (
    <select onChange={handleCurrencyChange} value={selectedCurrency}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
    </select>
  )
}

export default CurrencySelector
