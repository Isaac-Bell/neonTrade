import React, { useEffect, useState } from 'react'

interface SignalDetectorProps {
  symbol: string
  smaShort: number[]
  smaLong: number[]
}

const SignalDetector: React.FC<SignalDetectorProps> = ({
  symbol,
  smaShort,
  smaLong,
}) => {
  const [signals, setSignals] = useState<string[]>([])

  useEffect(() => {
    const detectSignals = () => {
      const newSignals = []
      for (let i = 1; i < smaShort.length; i++) {
        if (smaShort[i] > smaLong[i] && smaShort[i - 1] <= smaLong[i - 1]) {
          newSignals.push('Buy')
        } else if (
          smaShort[i] < smaLong[i] &&
          smaShort[i - 1] >= smaLong[i - 1]
        ) {
          newSignals.push('Sell')
        } else {
          newSignals.push('Hold')
        }
      }
      setSignals(newSignals)
    }

    detectSignals()
  }, [smaShort, smaLong])

  return (
    <div>
      <h3>Signal Detector for {symbol}</h3>
      <ul>
        {signals.map((signal, index) => (
          <li key={index}>
            Signal {index + 1}: {signal}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SignalDetector
