import request from 'superagent'
import { Trade } from '../../models/trade'
const rootUrl = '/api/v1'

export function getFruits(): Promise<string[]> {
  return request.get(rootUrl + '/fruits').then((res) => {
    return res.body.fruits
  })
}

export function fetchTradeHistory(): Promise<Trade[]> {
  return request.get('/api/trades').then((res) => {
    console.log('API RESPONSE:', res.body)
    return res.body
  })
}
