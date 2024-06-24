import React from 'react'
import { NumberFormatter as NumberFormat } from '@internationalized/number'

interface CurrencyFormatterProps {
  amount: number
  currency: string
}

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
  amount,
  currency,
}) => {
  const formattedAmount = new NumberFormat(`en-US`, {
    style: 'currency',
    currency,
  }).format(amount)

  return <span>{formattedAmount}</span>
}

export default CurrencyFormatter
