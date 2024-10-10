interface Symbol {
  display_name: string
  symbol: string
  market: string
  submarket: string
  trade_types: string[]
}

export const fetchActiveSymbols = async (): Promise<symbol[]> => {
  const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=64097')

  return new Promise((resolve, reject) => {
    ws.onopen = () => {
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
    }

    ws.onerror = (error) => {
      reject('WebSocket Error: ' + error)
    }

    ws.onclose = () => {
      console.log('WebSocket connection closed')
    }
  })
}
