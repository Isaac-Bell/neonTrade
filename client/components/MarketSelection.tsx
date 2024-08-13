// MarketSelection.tsx
import React, { useEffect, useState } from 'react'
import { fetchActiveSymbols } from './Symbols'
import { Symbol } from '../../models/trade'

interface MarketSelectionProps {
  selectedMarket: string
  setSelectedMarket: (market: string) => void
}

const MarketSelection: React.FC<MarketSelectionProps> = ({
  selectedMarket,
  setSelectedMarket,
}) => {
  const [markets, setMarkets] = useState<
    Symbol []
  >([])

  useEffect(() => {
    async function loadMarkets() {
      try {
        const marketsData = await fetchActiveSymbols()
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
      <form > 

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
      <select value={selectedMarket}   onChange={(e) => setSelectedMarket(e.target.value)}> 
        {markets.map((market) => (
          <option key={market.market_display_name} value={market.market}> 
          {market.market_display_name} </option>
        ))}
      </select>

      </form>

      <div> 
        <h2> Markets selected: {selectedMarket} </h2>
      </div>
    </div>
  )
}

export default MarketSelection
