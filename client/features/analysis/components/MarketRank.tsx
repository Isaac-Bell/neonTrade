import React, { useState } from 'react'
import pLimit from 'p-limit' // Import p-limit
import EvenOddMarketAnalysis from './EvenOddMarketAnalysis'
import {
  getStaticDigitMarkets,
  requestTickHistory,
} from '../../../features/trading/utils/websocketUtils'
import '../../../styles/MarketRank.css'

interface RankedMarket {
  symbol: string
  evenStreak: number
  oddStreak: number
  currentTrend: string
}

const MarketRank: React.FC = () => {
  const [rankedMarkets, setRankedMarkets] = useState<RankedMarket[]>([])
  const [loading, setLoading] = useState(false)

  // Limit concurrent requests to 3
  const limit = pLimit(3)

  const loadAndAnalyzeMarkets = async () => {
    setLoading(true)
    try {
      // Step 1: Get the static digit markets from webSocketUtils
      const symbols = getStaticDigitMarkets()

      // Step 2: Queue tick history requests with a limit of 3 concurrent requests
      const marketDataPromises = symbols.map((symbol) =>
        limit(() => requestTickHistory(symbol, 5000)),
      )

      const marketData = await Promise.allSettled(marketDataPromises)
      console.log('this is the market data', marketData)

      // Step 3: Perform Even-Odd Analysis on each market's tick history
      const analyzedMarkets = marketData
        .filter(
          (result) =>
            result.status === 'fulfilled' && result.value?.prices?.length > 0,
        )
        .map((result: any) => {
          const market = result.value
          const analysis = EvenOddMarketAnalysis({ selectedMarket: market })
          return {
            symbol: market.symbol,
            evenStreak: analysis.evenStreak,
            oddStreak: analysis.oddStreak,
            currentTrend: analysis.currentTrend,
          }
        })

      // Step 4: Rank markets by shortest even/odd streak
      const sortedMarkets = analyzedMarkets.sort((a, b) => {
        const aStreak = Math.min(a.evenStreak, a.oddStreak)
        const bStreak = Math.min(b.evenStreak, b.oddStreak)
        return aStreak - bStreak
      })

      setRankedMarkets(sortedMarkets)
    } catch (error) {
      console.error('Error loading or analyzing markets:', error)
    }
    setLoading(false)
  }

  return (
    <div className="market-rank">
      <h2>Ranked Markets for Digit Trading</h2>
      <button onClick={loadAndAnalyzeMarkets} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Digits'}
      </button>

      {rankedMarkets.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Market</th>
              <th>Consecutive Even/Odd Streak</th>
              <th>Current Trend</th>
            </tr>
          </thead>
          <tbody>
            {rankedMarkets.map((market, index) => (
              <tr key={market.symbol}>
                <td>{index + 1}</td>
                <td>{market.symbol}</td>
                <td>{Math.min(market.evenStreak, market.oddStreak)}</td>
                <td>{market.currentTrend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MarketRank
