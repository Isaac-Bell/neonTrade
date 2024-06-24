import React, { useState, useEffect } from 'react'
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic'

interface Tick {
  symbol: ''
  quote: ''
}

const TickList = () => {
  const [ticks, setTicks] = useState<Tick[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const app_id = 62062
    const connection = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`,
    )
    const api = new DerivAPIBasic({ connection })
    const tickStream = () => api.subscribe({ ticks: 'R_100' })
    const tickResponse = async (res) => {
      const data = JSON.parse(res.data)
      if (data.error !== undefined) {
        setError(data.error.message)
        connection.removeEventListener('message', tickResponse, false)
        await api.disconnect()
      }
      if (data.msg_type === 'tick') {
        setTicks((prevTicks) => [...prevTicks, data.tick])
      }
    }

    const subscribeTicks = async () => {
      await tickStream()
      connection.addEventListener('message', tickResponse)
    }

    subscribeTicks()

    return () => {
      connection.removeEventListener('message', tickResponse, false)
      tickStream().unsubscribe()
    }
  }, [])

  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {ticks.map((tick, index) => (
            <li className="" key={index}>
              {tick.symbol} - {tick.quote}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TickList
