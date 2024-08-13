import { useEffect } from 'react'

const WebSocketConnection = ({ authToken, messageToSend, onMessage }) => {
  useEffect(() => {
    const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=62894')

    ws.onopen = () => {
      console.log('WebSocket Connected')

      // First, authorize the connection
      ws.send(JSON.stringify({ authorize: authToken }))

      // If there is a message to send after authorization
      if (messageToSend) {
        ws.send(messageToSend)
      }
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      onMessage(data)
    }

    ws.onerror = (error) => {
      console.log('WebSocket Error: ', error)
    }

    return () => {
      ws.close()
    }
  }, [authToken, messageToSend, onMessage])

  return null
}

export default WebSocketConnection
