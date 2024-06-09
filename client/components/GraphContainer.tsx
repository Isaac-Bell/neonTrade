import React from 'react'
import GraphComponent from './GraphComponent.tsx'
import mockData from '../../models/mockdata.ts'

const GraphContainer = () => {
  return (
    <>
      <GraphComponent data={mockData} />
    </>
  )
}

export default GraphContainer
