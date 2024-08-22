// websocketUtils.ts

const WEBSOCKET_URL = 'wss://ws.binaryws.com/websockets/v3?app_id=62894'
const AUTH_TOKEN = 'R8yyDzZYKW8kyyv'

export const createWebSocketConnection = (
  onMessage: (data: any) => void,
  onOpen?: () => void,
) => {
  const ws = new WebSocket(WEBSOCKET_URL)

  ws.onopen = () => {
    console.log('WebSocket Connected')
    ws.send(JSON.stringify({ authorize: AUTH_TOKEN }))
    if (onOpen) {
      onOpen()
    }
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    onMessage(data)
  }

  ws.onerror = (error) => {
    console.error('WebSocket Error:', error)
  }

  ws.onclose = () => {
    console.log('WebSocket Disconnected')
  }

  return ws
}

export const subscribeToTicks = (ws: WebSocket, symbol: string) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ ticks: symbol }))
  } else {
    console.error('WebSocket not open yet, unable to subscribe to ticks')
  }
}

export const requestTickHistory = (
  ws: WebSocket,
  symbol: string,
  count: number = 1000,
) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        ticks_history: symbol,
        count,
        end: 'latest',
        style: 'ticks',
      }),
    )
  } else {
    console.error('WebSocket not open yet, unable to request tick history')
  }
}

export const fetchAllSymbols = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(WEBSOCKET_URL)

    ws.onopen = () => {
      console.log('WebSocket Connected')
      ws.send(
        JSON.stringify({ active_symbols: 'brief', product_type: 'basic' }),
      )
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.error) {
        reject(data.error.message)
      } else if (data.active_symbols) {
        resolve(data.active_symbols)
      }
      ws.close()
    }

    ws.onerror = (error) => {
      console.error('WebSocket Error', error)
      reject('Websocket Error')
    }
  })
}
