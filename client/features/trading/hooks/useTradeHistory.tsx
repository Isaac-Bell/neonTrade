import axios from 'axios'
import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getFruits } from '../apis/fruits.ts'
import { fetchTradeHistory } from '../apis/trades.ts'

export function useFruits() {
  const query = useQuery({ queryKey: ['fruits'], queryFn: getFruits })
  return {
    ...query,
    // Extra queries go here e.g. addFruit: useAddFruit()
  }
}

export const useTradeHistory = () => {
  const query = useQuery({
    queryKey: ['tradeHistory'],
    queryFn: fetchTradeHistory,
  })
  console.log('useTradeHistory query:', query)
  return { ...query }
}
