import WebSocket from 'ws'

const API_URL = 'wss://ws.binaryws.com/websockets/v3?app_id=62894'
let ws: WebSocket

export const connectToWebSocket = () => {
  ws = new WebSocket(API_URL)

  ws.on('open', () => {
    console.log('Websocket ready for action Captain')
  })

  ws.on('close', () => {
    console.log('Chur, good times are a head, websocket closed')
  })

  ws.on('error', (error) => {
    console.error('WebSocket error', error)
  })

  return ws
}

connectToWebSocket()
