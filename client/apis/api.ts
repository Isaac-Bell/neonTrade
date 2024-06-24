import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Trade } from '../../models/trade'

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
