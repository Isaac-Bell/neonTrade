// MarketSelection.tsx
import React, { useEffect, useState } from 'react'
import { fetchActiveSymbols } from '../services/Symbols'
import { Symbol } from '../../../../models/trade'

interface MarketSelectionProps {
  selectedMarket: string
  setSelectedMarket: (market: string) => void
}

const MarketSelection: React.FC<MarketSelectionProps> = ({
  selectedMarket,
  setSelectedMarket,
}) => {
  const [markets, setMarkets] = useState<symbol[]>([])

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
      <h3 className="text-green-500">Select Market</h3>
      <form>
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
        <select
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value)}
        >
          {markets.map((market) => (
            <option key={market.market_display_name} value={market.market}>
              {market.market_display_name}{' '}
            </option>
          ))}
        </select>
      </form>

      <div>
        <h2 className="text-green-500"> Markets selected: {selectedMarket} </h2>
      </div>
    </div>
  )
}

export default MarketSelection
