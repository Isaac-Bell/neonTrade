import React from 'react'

interface MarketData {
  symbol: string
  prices: number[]
}

interface EvenOddAnalysisProps {
  selectedMarket: MarketData
}

const EvenOddMarketAnalysis: React.FC<EvenOddAnalysisProps> = ({
  selectedMarket,
}) => {
  // Check if the prices array is available and valid
  if (
    !selectedMarket ||
    !selectedMarket.prices ||
    selectedMarket.prices.length === 0
  ) {
    return {
      evenStreak: 0,
      oddStreak: 0,
      currentTrend: 'no data', // Return a default message when no data is available
    }
  }

  let evenStreak = 0
  let oddStreak = 0
  let currentTrend = ''

  selectedMarket.prices.forEach((price) => {
    const lastDigit = parseInt(price.toString().slice(-1))
    if (lastDigit % 2 === 0) {
      evenStreak++
      oddStreak = 0
      currentTrend = 'even'
    } else {
      oddStreak++
      evenStreak = 0
      currentTrend = 'odd'
    }
  })

  return {
    evenStreak,
    oddStreak,
    currentTrend,
  }
}

export default EvenOddMarketAnalysis
