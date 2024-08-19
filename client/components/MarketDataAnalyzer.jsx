import React, { useState, useEffect } from 'react'
import { fetchActiveSymbols } from './Symbols'
import '../styles/MarketDataAnalyzer.css'

const MarketDataAnalyzer = () => {
  const [authToken, setAuthToken] = useState('R8yyDzZYKW8kyyv')
  const [marketType, setMarketType] = useState('')
  const [submarketType, setSubmarketType] = useState('')
  const [symbol, setSymbol] = useState([])
  const [ticksData, setTicksData] = useState([])
  const [result, setResult] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [marketOptions, setMarketOptions] = useState([])
  const [submarketOptions, setSubmarketOptions] = useState([])
  const [symbolOptions, setSymbolOptions] = useState([])

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const symbols = await fetchActiveSymbols()
        setSymbol(symbols)
        console.log('here at the symbols', symbols)

        // Extract unique market types with their display names
        const markets = Array.from(
          new Set(symbols.map((symbol) => symbol.market_display_name)),
        ).map((market_display_name, index) => ({
          market_display_name,
          market: symbols.find(
            (symbol) => symbol.market_display_name === market_display_name,
          ).market,
          id: index, // Adding a unique identifier as a key
        }))

        setMarketOptions(markets)
        console.log('Market Options:', markets)
      } catch (error) {
        console.error('Failed to fetch symbols:', error)
      }
    }

    fetchSymbols()
  }, [])

  useEffect(() => {
    if (marketType) {
      const filteredSubmarkets = marketOptions
        .filter((symbol) => symbol.market_display_name === marketType)
        .map((symbol, index) => ({
          submarket_display_name: symbol.submarket_display_name,
          id: index, // Adding a unique identifier as a key
        }))

      const uniqueSubmarkets = Array.from(
        new Set(filteredSubmarkets.map((item) => item.submarket_display_name)),
      ).map((submarket_display_name, index) => ({
        submarket_display_name,
        id: index, // Adding a unique identifier as a key
      }))

      setSubmarketOptions(uniqueSubmarkets)
      console.log('Submarket Options:', uniqueSubmarkets)
    } else {
      setSubmarketOptions([])
      setSymbolOptions([])
    }
  }, [marketType])

  useEffect(() => {
    if (submarketType) {
      const filteredSymbols = marketOptions
        .filter((symbol) => symbol.submarket_display_name === submarketType)
        .map((symbol, index) => ({
          display_name: symbol.display_name,
          value: symbol.symbol,
          id: index, // Adding a unique identifier as a key
        }))
      setSymbolOptions(filteredSymbols)
      console.log('Symbol Options:', filteredSymbols)
    } else {
      setSymbolOptions([])
    }
  }, [submarketType])

  useEffect(() => {
    const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=62894')

    ws.onopen = function () {
      console.log('WebSocket Connected')
      ws.send(JSON.stringify({ authorize: authToken }))
    }

    ws.onmessage = function (msg) {
      const data = JSON.parse(msg.data)
      console.log('WebSocket Message:', data)
      if (data.msg_type === 'authorize') {
        setIsAuthorized(true)
        console.log('Authorization successful:', data)
      } else if (data.history) {
        setTicksData(data.history.prices)
        console.log('Tick Data:', data.history.prices)
      }
    }

    ws.onerror = function (error) {
      console.log('WebSocket Error:', error)
    }

    return () => {
      ws.close()
    }
  }, [authToken])

  const handleMarketChange = (e) => {
    setMarketType(e.target.value)
    console.log(marketType)
    setSubmarketType('')
    setSymbol('')
  }

  const handleSubmarketChange = (e) => {
    setSubmarketType(e.target.value)
    console.log(submarketType)
    setSymbol('')
  }

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value)
    console.log(Symbol)
  }

  const fetchTicksData = () => {
    if (isAuthorized && symbol) {
      const ws = new WebSocket(
        'wss://ws.binaryws.com/websockets/v3?app_id=62894',
      )
      ws.onopen = function () {
        console.log('Requesting tick data for:', symbol)
        ws.send(
          JSON.stringify({
            ticks_history: symbol,
            count: 1000, // Max tick count
            end: 'latest',
            style: 'ticks',
          }),
        )
      }

      ws.onmessage = function (msg) {
        const data = JSON.parse(msg.data)
        console.log('Message received:', data)
        if (data.history) {
          setTicksData(data.history.prices)
          console.log('Tick data:', data.history.prices)
        }
      }

      ws.onerror = function (error) {
        console.log('WebSocket Error:', error)
      }
    } else {
      console.log('WebSocket not authorized yet or no symbol selected')
    }
  }

  const analyzeData = () => {
    const result = findLongestConsecutiveEvenOrOdd(ticksData)
    setResult(result)
  }

  const findLongestConsecutiveEvenOrOdd = (prices) => {
    let maxEvenStreak = 0
    let maxOddStreak = 0
    let currentEvenStreak = 0
    let currentOddStreak = 0

    prices.forEach((price) => {
      const priceString = price.toString()
      const lastDigit = parseInt(priceString.slice(-1))

      if (lastDigit % 2 === 0) {
        currentEvenStreak++
        currentOddStreak = 0
        if (currentEvenStreak > maxEvenStreak) {
          maxEvenStreak = currentEvenStreak
        }
      } else {
        currentOddStreak++
        currentEvenStreak = 0
        if (currentOddStreak > maxOddStreak) {
          maxOddStreak = currentOddStreak
        }
      }
    })

    return {
      maxEvenStreak,
      maxOddStreak,
    }
  }

  return (
    <>
      <div>
        <h2>Market Data Analyzer</h2>
        <div>
          <label>
            Select Market Type:
            <select value={marketType} onChange={handleMarketChange}>
              <option value="" disabled>
                Select a Market
              </option>
              {marketOptions.map((market) => (
                <option key={market.id} value={market.market_display_name}>
                  {market.market_display_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Select Submarket Type:
            <select
              value={submarketType}
              onChange={handleSubmarketChange}
              disabled={!marketType}
            >
              <option value="" disabled>
                Select a Submarket
              </option>
              {submarketOptions.map((submarket) => (
                <option
                  key={submarket.id}
                  value={submarket.submarket_display_name}
                >
                  {submarket.submarket_display_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Select Symbol:
            <select
              value={symbol}
              onChange={handleSymbolChange}
              disabled={!submarketType}
            >
              <option value="" disabled>
                Select a Symbol
              </option>
              {symbolOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.display_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button onClick={fetchTicksData}>Fetch Tick Data</button>
        <button onClick={analyzeData}>Analyze Data</button>

        {result && (
          <div className="analysis-results">
            <h3>Analysis Results:</h3>
            <p>Max Consecutive Even Numbers: {result.maxEvenStreak}</p>
            <p>Max Consecutive Odd Numbers: {result.maxOddStreak}</p>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-gray-900 p-4 text-green-500 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">All Markets</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-white">
            <thead>
              <tr>
                <th className="px-4 py-2">TRADE ID</th>
                <th className="px-4 py-2">TIMESTAMP</th>
                <th className="px-4 py-2">TYPE</th>
                <th className="px-4 py-2">QUANTITY</th>
                <th className="px-4 py-2">PRICE</th>
                <th className="px-4 py-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {symbol?.map((trade) => (
                <tr key={trade.display_name} className="bg-gray-800">
                  <td className="border px-4 py-2">
                    {trade.market_display_name}
                  </td>
                  <td className="border px-4 py-2">{trade.display_name}</td>
                  <td className="border px-4 py-2">{trade.submarket}</td>
                  <td className="border px-4 py-2">
                    {' '}
                    {trade.exchange_is_open ? 'Open' : 'Closed'}{' '}
                  </td>
                  {/* <td className="border px-4 py-2">{trade.price}</td>
                  <td className="border px-4 py-2">{trade.status}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default MarketDataAnalyzer
