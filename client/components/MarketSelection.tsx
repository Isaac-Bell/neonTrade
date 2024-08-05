import React, { useEffect, useState } from 'react'
import { fetchActiveSymbols } from '../apis/api'

const MarketSelection = ({ selectedMarket, setSelectedMarket }) => {
  const [markets, setMarkets] = useState([])

  useEffect(() => {
    async function loadMarkets() {
      try {
        const marketsData = await fetchActiveSymbols()
        console.log(marketsData)
        setMarkets(marketsData)
      } catch (error) {
        console.error('Error loading markets:', error)
      }
    }
    loadMarkets()
  }, [])

  return (
    <div>
      <h3>Select Market</h3>
      <select
        value={selectedMarket}
        onChange={(e) => setSelectedMarket(e.target.value)}
      >
        {markets.map((market) => (
          <option key={market.symbol} value={market.symbol}>
            {market.display_name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MarketSelection
