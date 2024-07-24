import React, { useEffect, useState } from 'react'

const WebSocketConnection = ({ onMessage }) => {
  useEffect(() => {
    const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=62894')

    ws.onopen = () => {
      console.log('WebSocket Connected')
      ws.send(JSON.stringify({ authorize: 'R8yyDzZYKW8kyyv' }))
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
  }, [onMessage])

  return null
}

export default WebSocketConnection

// token R8yyDzZYKW8kyyv
// neonTrade
