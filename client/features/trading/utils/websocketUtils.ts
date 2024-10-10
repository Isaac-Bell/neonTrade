import pLimit from 'p-limit'

const WEBSOCKET_URL = 'wss://ws.binaryws.com/websockets/v3?app_id=64097'
const AUTH_TOKEN = 'aRhWC7GiXwOxIG6'

let ws: WebSocket | null = null // Single WebSocket connection
let isConnectionOpen = false // Track if the connection is open
let messageQueue: (() => void)[] = [] // Queue for messages when WebSocket is not ready
let tickHistoryListeners: ((data: any) => void)[] = []

const limit = pLimit(3) // Limit to 3 concurrent requests

const keepWebSocketAlive = () => {
  setInterval(() => {
    if (ws && isConnectionOpen) {
      ws.send(JSON.stringify({ ping: 1 }))
    }
  }, 30000)
}

export const createWebSocketConnection = (
  onMessage: (data: any) => void,
  onOpen?: () => void,
): WebSocket => {
  if (!ws) {
    ws = new WebSocket(WEBSOCKET_URL)

    ws.onopen = () => {
      console.log('WebSocket Connected')
      isConnectionOpen = true
      ws!.send(JSON.stringify({ authorize: AUTH_TOKEN }))
      if (onOpen) {
        onOpen()
      }
      // Process the message queue
      messageQueue.forEach((sendMessage) => sendMessage())
      messageQueue = [] // Clear the queue
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.error) {
        console.error('WebSocket Error:', data.error.message)
      } else {
        onMessage(data)
        // If tick history listeners exist, pass the data
        tickHistoryListeners.forEach((listener) => listener(data))
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error)
    }

    ws.onclose = () => {
      console.log('WebSocket Disconnected')
      ws = null
      isConnectionOpen = false
    }
  }

  return ws
}

export const subscribeToTicks = (symbol: string) => {
  if (!symbol) {
    return console.error('Invalid symbol')
  }

  const sendSubscribeMessage = () => {
    if (ws && isConnectionOpen) {
      ws.send(JSON.stringify({ ticks: symbol }))
    } else {
      console.error('WebSocket not open yet, unable to subscribe to ticks')
    }
  }

  if (isConnectionOpen) {
    sendSubscribeMessage()
  } else {
    messageQueue.push(sendSubscribeMessage)
  }
}

export const requestTickHistory = (
  symbol: string,
  count: number = 5000,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log(`Requesting tick history for ${symbol} for ${count} ticks`)

    const sendHistoryRequest = () => {
      if (ws && isConnectionOpen) {
        ws.send(
          JSON.stringify({
            ticks_history: symbol,
            count,
            end: 'latest',
            style: 'ticks',
          }),
        )

        const listener = (data: any) => {
          if (
            data.history &&
            data.history.prices &&
            data.history.prices.length > 0
          ) {
            console.log(`Tick history received for ${symbol}`)
            resolve({
              symbol,
              prices: data.history.prices,
              times: data.history.times,
            })
            // Remove listener after receiving data
            tickHistoryListeners = tickHistoryListeners.filter(
              (l) => l !== listener,
            )
          } else {
            reject('No tick history data received')
          }
        }

        // Add listener for tick history response
        tickHistoryListeners.push(listener)
      } else {
        console.error(
          'WebSocket not open yet or ws is null, attempting to reinitialize',
        )
        reject('WebSocket not open or initialized')
      }
    }

    if (isConnectionOpen && ws !== null) {
      limit(sendHistoryRequest)
    } else {
      console.error('WebSocket is not available, queuing request.')
      messageQueue.push(sendHistoryRequest)
    }
  })
}

export const fetchAllSymbols = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const tempWs = new WebSocket(WEBSOCKET_URL)

    tempWs.onopen = () => {
      console.log('WebSocket Connected for fetchAllSymbols')
      tempWs.send(
        JSON.stringify({ active_symbols: 'brief', product_type: 'basic' }),
      )
    }

    tempWs.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('All Symbol data received')
      if (data.error) {
        reject(data.error.message)
      } else if (data.active_symbols) {
        resolve(data.active_symbols)
      }
      tempWs.close()
    }

    tempWs.onerror = (error) => {
      console.error('WebSocket Error', error)
      reject('WebSocket error occurred')
    }
  })
}

export const fetchContractsForSymbol = async (symbol: string): Promise<any> => {
  const msg = {
    contracts_for: symbol,
    currency: 'USD',
    landing_company: 'svg',
    product_type: 'basic',
  }

  return new Promise((resolve, reject) => {
    const tempWs = new WebSocket(WEBSOCKET_URL)

    tempWs.onopen = () => {
      tempWs.send(JSON.stringify(msg))
    }

    tempWs.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.error) {
        console.error(
          `Error fetching contracts for ${symbol}: ${data.error.message}`,
        )
        resolve(null)
      } else {
        resolve(data.contracts_for)
      }

      tempWs.close()
    }

    tempWs.onerror = (error) => {
      console.error(`WebSocket error for ${symbol}:`, error)
      resolve(null)
      tempWs.close()
    }
  })
}

export const getStaticDigitMarkets = (): string[] => {
  // Return the static list of markets for digit trading (these don't change often)
  return [
    'RDBEAR',
    'RDBULL',
    'JD10',
    'JD25',
    'JD50',
    'JD75',
    'JD100',
    'R_10',
    'R_25',
    'R_50',
    'R_75',
    'R_100',
    '1HZ10V',
    '1HZ25V',
    '1HZ50V',
    '1HZ75V',
    '1HZ100V',
  ]
}
