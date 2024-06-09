import React from 'react'

interface CurrencyFormatterProps {
  amount: number
  currency: string
}

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
  amount,
  currency,
}) => {
  const formattedAmount = new Intl.NumberFormat(`en-${currency}`, {
    style: 'currency',
    currency,
  }).format(amount)

  return <span>{formattedAmount} </span>
}

export default CurrencyFormatter
