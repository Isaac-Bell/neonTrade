import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import PriceChart from './Price Chart'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-4 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
