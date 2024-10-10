import readline from 'readline'
import WebSocket from 'ws'

const API_URL = 'wss://ws.binaryws.com/websockets/v3?app_id=62894' // Replace with your API URL
const ws = new WebSocket(API_URL)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Array of predefined WebSocket messages for testing
const testMessages = [
  // // Fetch active symbols (brief)
  { active_symbols: 'brief', product_type: 'basic' },

  // // Buy signals
  // { buy: 1, price: 100, symbol: 'frxAUDJPY' },
  // { buy: 1, price: 200, symbol: 'frxAUDUSD' },

  // // Example sell signal
  // { sell: 1, price: 150, symbol: 'frxEURUSD' },

  // // Another example request: fetching tick history
  // { ticks_history: 'frxAUDUSD', end: 'latest', count: 10, style: 'ticks' },

  // // Example for market subscription (price updates)
  // { ticks: 'frxAUDUSD', subscribe: 1 },

  // // Example trade proposal
  // {
  //   proposal: 1,
  //   amount: 10,
  //   basis: 'stake',
  //   contract_type: 'CALL',
  //   currency: 'USD',
  //   duration: 60,
  //   duration_unit: 's',
  //   symbol: 'frxAUDJPY',
  // },

  // // Example contract cancellation
  // { cancel: 1, contract_id: 12345 },

  // Example balance request
  // { balance: 1 },
]

ws.on('open', () => {
  console.log('Connected to WebSocket')
  promptTestOption() // Start the input prompt after connection is established
})

ws.on('message', (data) => {
  console.log('Received:', data)
})

ws.on('close', () => {
  console.log('WebSocket connection closed')
})

ws.on('error', (error) => {
  console.error('WebSocket error:', error)
})

function promptTestOption() {
  rl.question(
    'Choose an option: 1) Send message from array 2) Send custom message: ',
    (option) => {
      if (option === '1') {
        sendMessagesFromArray()
      } else if (option === '2') {
        sendCustomMessage()
      } else {
        console.log('Invalid option. Please try again.')
        promptTestOption() // Re-prompt for a valid option
      }
    },
  )
}

function sendMessagesFromArray() {
  testMessages.forEach((message, index) => {
    console.log(`Sending message ${index + 1}:`, message)
    ws.send(JSON.stringify(message)) // Send each message in the array
  })
  promptTestOption() // Re-prompt for more testing after sending all messages
}

function sendCustomMessage() {
  rl.question('Enter a custom message (in JSON format): ', (message) => {
    try {
      const jsonMessage = JSON.parse(message) // Parse the input if it's JSON
      ws.send(JSON.stringify(jsonMessage)) // Send the parsed JSON message
    } catch (e) {
      console.error('Invalid JSON format. Please enter a valid JSON object.')
    }
    promptTestOption() // Prompt again for more tests
  })
}

process.on('SIGINT', () => {
  rl.close()
  ws.close()
  console.log('Connection closed. Exiting...')
  process.exit()
})
