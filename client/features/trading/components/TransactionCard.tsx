import React from 'react'
import '../styles/TransactionCard.css'
interface TransactionCardProps {
  transaction: any
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <div className="transaction-card">
      <h2>{transaction.amount}</h2>
      <p>{transaction.currency}</p>
    </div>
  )
}

export default TransactionCard
