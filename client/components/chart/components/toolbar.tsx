import React from 'react'
import { timePeriods } from '../constants'

interface ChartToolbarProps {
  timePeriod: string
  setTimePeriod: (period: string) => void
}

const ChartToolbar: React.FC<ChartToolbarProps> = ({
  timePeriod,
  setTimePeriod,
}) => {
  return (
    <div className="mb-5 flex justify-center gap-2">
      {Object.keys(timePeriods).map((period) => (
        <button
          key={period}
          className={`my-1 transform cursor-pointer rounded-md border-none bg-gray-200 px-3 py-2 font-bold text-gray-800 transition-all ${
            timePeriod === period ? '!bg-green-500 !text-white' : ''
          }`}
          onClick={() => setTimePeriod(period)}
        >
          {period}
        </button>
      ))}
    </div>
  )
}

export default ChartToolbar
