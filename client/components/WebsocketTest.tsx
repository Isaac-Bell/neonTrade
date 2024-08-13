import React, { useState } from 'react'
import WebSocketConnection from '../apis/websockets'
// import './WebSocketTestComponent.css'

const WebSocketTestComponent = () => {
  const [inputValue, setInputValue] = useState('')
  const [response, setResponse] = useState(null)
  const [messageToSend, setMessageToSend] = useState('')
  const authToken = 'R8yyDzZYKW8kyyv' // Replace with your actual auth token

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSendClick = () => {
    try {
      // Validate JSON
      JSON.parse(inputValue)
      setMessageToSend(inputValue)
    } catch (error) {
      alert('Invalid JSON')
    }
  }

  const handleMessage = (data) => {
    setResponse(data)
  }

  return (
    <div>
      <h2>WebSocket Test</h2>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter JSON message"
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleSendClick} className="button">
        Send
      </button>
      <div>
        <h3>Response:</h3>
        <pre>
          {response ? JSON.stringify(response, null, 2) : 'No response yet'}
        </pre>
      </div>
      {/* This will invoke the WebSocket connection with the auth token and message */}
      <WebSocketConnection
        authToken={authToken}
        messageToSend={messageToSend}
        onMessage={handleMessage}
      />
    </div>
  )
}

export default WebSocketTestComponent
