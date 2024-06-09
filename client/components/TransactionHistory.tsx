import { getTransactions } from '../apis/api'
import { useState, useEffect } from 'react'

interface Transaction {
  date: string
  description: string
  amount: number
  type: 'debit' | 'credit'
}

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    getTransactions().then((data) => setTransactions(data.transactions))
  }, [])

  return (
    <div className="transaction-history">
      <h2>Transaction History:</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.date}>
            <span>{transaction.date}</span>
            <span>{transaction.description}</span>
            <span>
              {transaction.type === 'debit' ? '-' : '+'}
              {transaction.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionHistory
