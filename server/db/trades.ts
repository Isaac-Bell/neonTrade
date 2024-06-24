import db from './connection'
import { Trade } from '../../models/trade'
import camelcaseKeys from 'camelcase-keys'

export const getAllTrades = async (): Promise<Trade[]> => {
  const trades = await db('trades').select()

  // Convert column names to camelCase
  return camelcaseKeys(trades)
}

// Placeholder for getting current trades, customize as needed
export const getCurrentTrades = async (): Promise<Trade[]> => {
  const trades = await db('trades').select().where('result', 'pending')

  // Convert column names to camelCase
  return camelcaseKeys(trades)
}
