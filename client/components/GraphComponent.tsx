import React, { useState, useEffect } from 'react'
import * as THREE from 'three'
import mockData from '../../models/mockdata.ts'

interface GraphComponentProps {
  data: typeof mockData // to be updated with correct data type props
}

const GraphComponent: React.FC<GraphComponentProps> = ({ data }) => {
  const [graph, setGraph] = useState<any>(null) // initialize three.js graph

  useEffect(() => {
    if (data) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      )
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('graph-canvas'),
        antialias: true,
      })

      const points = data.map((dataPoint) => [
        parseFloat(dataPoint.timestamp),
        parseFloat(dataPoint.value),
        0,
      ])

      if (points.some((point) => point.some((value) => isNaN(value)))) {
        console.error("NaN values detected in points array!")
      } else {  
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
      const line = new THREE.Line(geometry, material)
      scene.add(line)

      camera.position.z = 5
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)

      setGraph(renderer)
    }
  }, [data])

  return (
    <div className="graph-container">
      {graph && (
        <canvas id="graph-canvas" style={{ width: '100%', height: '100%' }} />
      )}
      <div className="graph-placeholder"> Graph will be displayed here </div>
    </div>
  )
}

export default GraphComponent
