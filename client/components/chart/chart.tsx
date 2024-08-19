import './styles/chart.css'

import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { ClipLoader } from 'react-spinners'
import { chartOptions } from './config'
import ChartToolbar from './components/toolbar'
import { useChartWebSocket } from './hooks/useChartWebSocket'

interface ChartProps {
  market: string
}

const Chart: React.FC<ChartProps> = ({ market }) => {
  const [timePeriod, setTimePeriod] = useState<string>('1min')
  const { chartData, loading } = useChartWebSocket(market, timePeriod)

  return (
    <>
      <ChartToolbar timePeriod={timePeriod} setTimePeriod={setTimePeriod} />
      <div className="relative mx-auto my-0 w-full max-w-4xl">
        {loading && (
          <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center rounded-md bg-gray-200 bg-opacity-80">
            <ClipLoader color="#00C805" loading={loading} size={50} />
          </div>
        )}

        <Line data={chartData} options={chartOptions} />
      </div>
    </>
  )
}

export default Chart
