import axios from 'axios'
import { response } from 'express'
import { isRouteErrorResponse } from 'react-router-dom'

const api = axios.create({
  baseURL: 'https://api.deriv.com',
  headers: {
    Authorization: 'Bearer YOUR_API_TOKEN',
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
