import express from 'express'
import * as Path from 'node:path'
import checkJwt from './auth0'
import { getAllTrades, getCurrentTrades } from './db/trades'

const server = express()

server.use(express.json())
// server.use(checkJwt)

// server.use('/authorized', (req, res) => {
//   res.send('Secured Resource')
// })

server.get('/api/trades', async (req, res) => {
  try {
    const trades = await getAllTrades()
    res.json(trades)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trade history' })
  }
})

server.get('/api/current-trades', async (req, res) => {
  try {
    const trades = await getCurrentTrades()
    res.json(trades)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch current trades' })
  }
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
