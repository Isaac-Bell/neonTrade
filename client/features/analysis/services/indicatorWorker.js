// indicatorWorker.js
import { SMA, EMA, RSI, MACD, ADX } from 'technicalindicators'

self.onmessage = function (e) {
  const { prices } = e.data

  if (!prices || prices.length < 14) {
    // Ensure enough data points
    console.error('Insufficient data for ADX calculation')
    self.postMessage({ error: 'Insufficient data for ADX calculation' })
    return
  }

  try {
    const smaShort = SMA.calculate({ period: 5, values: prices })
    // const smaLong = SMA.calculate({ period: 20, values: prices })
    // const ema = EMA.calculate({ period: 10, values: prices })
    // const rsi = RSI.calculate({ period: 14, values: prices })
    // const macd = MACD.calculate({
    //   values: prices,
    //   fastPeriod: 12,
    //   slowPeriod: 26,
    //   signalPeriod: 9,
    //   SimpleMAOscillator: false,
    //   SimpleMASignal: false,
    // })
    // const adx = ADX.calculate({ close: prices, period: 14 })

    self.postMessage({ smaShort })
  } catch (error) {
    console.error('Error in calculating indicators:', error)
    self.postMessage({ error: error.message })
  }
}
