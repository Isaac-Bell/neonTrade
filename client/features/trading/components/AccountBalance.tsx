import React, { useEffect, useState } from 'react'

const AccountBalance = () => {
  const [balance, setBalance] = useState(0)
  const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=62894')

  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Connected')
      ws.send(JSON.stringify({ authorize: 'R8yyDzZYKW8kyyv' }))
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data) // Log the incoming data to see the structure

      // Check for authorization response
      if (data.error) {
        console.error('Error in authorization:', data.error.message)
      } else if (data.authorize) {
        console.log('Authorization successful', data.authorize)
        // Now subscribe to the balance updates after successful authorization
        ws.send(JSON.stringify({ balance: 1, subscribe: 1 }))
      } else if (data.balance || data.balance_update) {
        // Handle both initial balance and any balance updates
        setBalance(
          data.balance ? data.balance.balance : data.balance_update.balance,
        )
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
    <div className="flex flex-col" >
      <h3 className="mb-4 pt-4 text-2xl font-bold dark:text-white">
        Account Balance
      </h3>
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-600 dark:bg-gray-800">
          <div className="flex w-full items-center justify-center text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${balance.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Available funds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountBalance
