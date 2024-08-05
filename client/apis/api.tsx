import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Trade } from '../../models/trade'
import request from 'superagent'

import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic'

const app_id = 62894 // Replace with your app_id.
const connection = new WebSocket(
  `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`,
)
const api = new DerivAPIBasic({ connection })

const active_symbols_request = {
  active_symbols: 'brief',
  product_type: 'basic',
}

export async function fetchActiveSymbols() {
  return new Promise((resolve, reject) => {
    connection.onopen = () => {
      console.log('WebSocket Connected')
      api.activeSymbols(active_symbols_request)
    }

    connection.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data)

      if (data.error !== undefined) {
        console.error('Error:', data.error.message)
        reject(data.error.message)
      }

      if (data.msg_type === 'active_symbols') {
        resolve(data.active_symbols)
      }
    }

    connection.onerror = (error) => {
      console.error('WebSocket Error:', error)
      reject(error)
    }

    connection.onclose = () => {
      console.log('WebSocket Disconnected')
    }
  })
}

// Function to fetch trade history
const fetchTradeHistory = async (): Promise<Trade[]> => {
  const { data } = await axios.get('/api/trades')
  return data
}

// Hook to use trade history
export const useTradeHistory = () => {
  return useQuery<Trade[], Error>('tradeHistory', fetchTradeHistory)
}

// Function to fetch current trades (you can define it as per your needs)
const fetchCurrentTrades = async (): Promise<Trade[]> => {
  const { data } = await axios.get('/api/current-trades')
  return data
}

// Hook to use current trades
export const useGetCurrentTrades = () => {
  return useQuery<Trade[], Error>('currentTrades', fetchCurrentTrades)
}
