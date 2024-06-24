// src/components/Layout.tsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar.tsx'
import Header from './Header'

const Layout: React.FC = () => {
  return (
    <div className="flex h-full">
      <SideBar />
      <div className="ml-64 ml-64 flex flex-grow">
        <Header />
        <main className="flex-grow overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
