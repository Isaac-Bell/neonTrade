// indicatorsService.ts

/**
 * Calculates the Simple Moving Average (SMA) for a given dataset.
 * SMA is used to smooth out price data and identify the direction of the trend.
 * @param data - Array of prices.
 * @param period - The number of periods to calculate the average.
 * @returns Array of SMA values.
 */
export const calculateSMA = (data: number[], period: number): number[] => {
  const sma = []
  for (let i = 0; i <= data.length - period; i++) {
    const window = data.slice(i, i + period)
    const average = window.reduce((acc, val) => acc + val, 0) / period
    sma.push(average)
  }
  return sma
}

/**
 * Calculates the Exponential Moving Average (EMA) for a given dataset.
 * EMA gives more weight to recent prices, making it more responsive to new information.
 * @param data - Array of prices.
 * @param period - The number of periods for the EMA calculation.
 * @returns Array of EMA values.
 */
export const calculateEMA = (data: number[], period: number): number[] => {
  const k = 2 / (period + 1)
  const ema = [data[0]] // Start with the first data point

  for (let i = 1; i < data.length; i++) {
    ema.push(data[i] * k + ema[i - 1] * (1 - k))
  }
  return ema
}

/**
 * Calculates the Relative Strength Index (RSI) for a given dataset.
 * RSI measures the speed and change of price movements to identify overbought or oversold conditions.
 * @param data - Array of prices.
 * @param period - The number of periods for the RSI calculation.
 * @returns Array of RSI values.
 */
export const calculateRSI = (data: number[], period: number): number[] => {
  const rsi = []
  for (let i = period; i < data.length; i++) {
    const gains = []
    const losses = []

    for (let j = i - period + 1; j <= i; j++) {
      const change = data[j] - data[j - 1]
      if (change > 0) gains.push(change)
      else losses.push(Math.abs(change))
    }

    const avgGain = gains.reduce((acc, val) => acc + val, 0) / period
    const avgLoss = losses.reduce((acc, val) => acc + val, 0) / period
    const rs = avgGain / avgLoss
    rsi.push(100 - 100 / (1 + rs))
  }
  return rsi
}

/**
 * Calculates the Moving Average Convergence Divergence (MACD) for a given dataset.
 * MACD is a trend-following momentum indicator that shows the relationship between two moving averages.
 * @param data - Array of prices.
 * @param shortPeriod - The period for the short-term EMA.
 * @param longPeriod - The period for the long-term EMA.
 * @param signalPeriod - The period for the signal line EMA.
 * @returns Object containing the MACD line, signal line, and histogram.
 */
export const calculateMACD = (
  data: number[],
  shortPeriod: number,
  longPeriod: number,
  signalPeriod: number,
) => {
  const shortEMA = calculateEMA(data, shortPeriod)
  const longEMA = calculateEMA(data, longPeriod)
  const macdLine = shortEMA.map((val, index) => val - longEMA[index])

  const signalLine = calculateEMA(macdLine, signalPeriod)
  const histogram = macdLine.map((val, index) => val - signalLine[index])

  return { macdLine, signalLine, histogram }
}

/**
 * Calculates the Average Directional Index (ADX) for a given dataset.
 * ADX is used to quantify the strength of a trend, regardless of its direction.
 * @param data - Array of prices.
 * @param period - The number of periods for the ADX calculation.
 * @returns Array of ADX values.
 */
export const calculateADX = (data: number[], period: number): number[] => {
  const adx = [] // Placeholder for ADX calculation
  // ADX calculation is more complex and would need the +DI and -DI calculations
  // This implementation is simplified and needs additional components to be accurate
  // +DI and -DI would be calculated first, followed by the ADX
  return adx
}
