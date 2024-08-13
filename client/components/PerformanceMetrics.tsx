import React from 'react'
import WebSocketTestComponent from './WebsocketTest'

const PerformanceMetrics = () => {
  return (
    <div className="flex flex-col">
      <WebSocketTestComponent />
      <h3 className="mb-4 pt-4 text-2xl font-bold dark:text-white">
        Performance Metrics
      </h3>
      <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"></div>
    </div>
  )
}

export default PerformanceMetrics
