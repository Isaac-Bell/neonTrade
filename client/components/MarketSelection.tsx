// MarketSelection.tsx
import React, { useEffect, useState } from 'react'
import { fetchActiveSymbols } from './Symbols'

interface MarketSelectionProps {
  selectedMarket: string
  setSelectedMarket: (market: string) => void
}

const MarketSelection: React.FC<MarketSelectionProps> = ({
  selectedMarket,
  setSelectedMarket,
}) => {
  const [markets, setMarkets] = useState<
    { symbol: string; display_name: string }[]
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
