import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const App = () => {
  return (
    <div className="app">
      {/* <Header /> */}
      <main className="h-auto space-y-8 p-4 pt-20 md:ml-64">
        {/* <Outlet /> */}
      </main>
    </div>
  )
}

export default App
