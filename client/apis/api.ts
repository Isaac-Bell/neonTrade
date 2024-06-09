import axios from 'axios'
import { response } from 'express'
import { isRouteErrorResponse } from 'react-router-dom'

const api = axios.create({
  baseURL: 'https://api.deriv.com',
  headers: {
    Authorization: '***********PVea',
  },
})

export const getBalance = async () => {
  const reponse = await api.get('/account/balance')
  return reponse.data
}

export const getTradeHistory = async () => {
  const response = await api.get('/trade/history')
  return response.data
}

export const getTransactions = async () => {
  const reponse = await fetch('https://example.com/transactions')
  const data = await reponse.json()
  return data
}
