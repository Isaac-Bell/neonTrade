// src/components/Layout.tsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar.tsx'
import Header from './Header'

const Layout: React.FC = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-grow flex-col">
        <Header />
        <main className="ml-64 h-auto space-y-8 p-4 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
