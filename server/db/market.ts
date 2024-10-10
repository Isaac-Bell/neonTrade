import connection from './connection'
import { Symbol, Symbols } from '../../models/market'
const db = connection

export function getAllSymbols() {
  return db('markets').select()
}

export function getSymbolByMarketType(type: string) {
  return db('markets').where({ type }).select()
}

export function addSymbols(symbols: Symbols) {
  return db('markets').insert(symbols)
}
