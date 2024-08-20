import React, { useState, useEffect, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { fetchActiveSymbols } from './Symbols'
import '../styles/MarketDataAnalyzer.css'
import { symbolName } from 'typescript'

const MarketDataAnalyzer = () => {
  const [authToken, setAuthToken] = useState('R8yyDzZYKW8kyyv')
  const [marketType, setMarketType] = useState('')
  const [submarketType, setSubmarketType] = useState('')
  const [symbols, setSymbols] = useState([])
  const [ticksData, setTicksData] = useState([])
  const [result, setResult] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [liveData, setLiveData] = useState({}) // Store live prices

  // DROPDOWNS
  const [marketOptions, setMarketOptions] = useState([])
  const [submarketOptions, setSubmarketOptions] = useState([])
  const [symbolOptions, setSymbolOptions] = useState([])

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const symbols = await fetchActiveSymbols()
        setSymbols(symbols)

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

  // DROP DOWNS
  useEffect(() => {
    if (marketType) {
      const filteredSubmarkets = marketOptions
        .filter((symbols) => symbols.market_display_name === marketType)
        .map((symbols, index) => ({
          submarket_display_name: symbols.submarket_display_name,
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
        .filter((symbols) => symbols.submarket_display_name === submarketType)
        .map((symbols, index) => ({
          display_name: symbols.display_name,
          value: symbols.symbol,
          id: index, // Adding a unique identifier as a key
        }))
      setSymbolOptions(filteredSymbols)
      console.log('Symbol Options:', symbolOptions)
    } else {
      setSymbolOptions([])
    }
  }, [submarketType])

  // Authorize Websocket
  useEffect(() => {
    const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=62894')

    ws.onopen = function () {
      console.log('WebSocket for ticks Connected')
      ws.send(JSON.stringify({ authorize: authToken }))
    }

    ws.onmessage = function (msg) {
      const data = JSON.parse(msg.data)
      console.log('Logged in as:', data.authorize.fullname)
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

  // const handleMarketChange = (e) => {
  //   setMarketType(e.target.value)
  //   console.log('this is the new value', marketType)
  // }

  // const handleSubmarketChange = (e) => {
  //   setSubmarketType(e.target.value)
  //   console.log(submarketType)
  //   setSymbol('')
  // }

  // const handleSymbolChange = (e) => {
  //   setSymbol(e.target.value)
  //   console.log(Symbol)
  // }

  useEffect(() => {
    const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=62894')

    ws.onopen = () => {
      console.log('WebSocket Connected')
      symbols.forEach((symbol) => {
        ws.send(JSON.stringify({ ticks: symbol.symbol }))
      })
    }

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data)
      if (data.tick) {
        setLiveData((prevData) => ({
          ...prevData,
          [data.tick.symbol]: data.tick.quote,
        }))
      }
    }

    ws.onerror = (error) => {
      console.log('WebSocket Error:', error)
    }

    return () => {
      ws.close()
    }
  }, [symbols])

  const columns = useMemo(
    () => [
      {
        Header: 'Market',
        accessor: 'market_display_name',
      },
      {
        Header: 'Submarket',
        accessor: 'submarket_display_name',
      },
      {
        Header: 'Type',
        accessor: 'display_name',
      },
      {
        Header: 'Status',
        accessor: (row) => (row.exchange_is_open ? 'Open' : 'Closed'),
        id: 'status',
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
      },
      {
        Header: 'Live Price',
        accessor: (row) => liveData[row.symbol] || 'Loading...',
        id: 'livePrice',
      },
    ],
    [liveData],
  )

  const data = useMemo(() => symbols, [symbols])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

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
      {/* <div>
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
      </div> */}

      <div className="py-15 rounded-lg bg-gray-900 p-4 text-green-500 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">All Markets</h2>
        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="min-w-full bg-gray-900 text-white"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-4 py-2"
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()} className="bg-gray-800">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="border px-4 py-2">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default MarketDataAnalyzer
