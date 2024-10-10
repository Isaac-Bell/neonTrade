import express from 'express'
import * as Path from 'node:path'
import checkJwt from './auth0'
import { getAllTrades, getCurrentTrades } from './db/trades'
import superagent from 'superagent'

const server = express()

server.use(express.json())
// server.use(checkJwt)

// server.use('/authorized', (req, res) => {
//   res.send('Secured Resource')
// })

// server.use('/api/v1/trade', trade)

server.get('/api/trades', async (req, res) => {
  try {
    const trades = await getAllTrades()
    res.json(trades)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trade history' })
  }
})

server.get('/oauth/callback', (req, res) => {
  const { code } = req.query // Deriv sends this code to your redirect URI
  superagent
    .post('https://api.deriv.com/oauth/token')
    .send({
      code: code,
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      redirect_uri: 'http://localhost:5173/oauth/callback',
      grant_type: 'authorization_code',
    })
    .set('Accept', 'application/json')
    .then((response) => {
      const accessToken = response.body.access_token
      // Use this access token to make further API requests
      res.send('Authentication successful')
    })
    .catch((error) => {
      console.error('Authentication failed', error)
      res.send('Authentication failed')
    })
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
