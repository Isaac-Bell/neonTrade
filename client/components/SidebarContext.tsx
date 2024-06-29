// SidebarContext.tsx
import React, { createContext, useContext, useState } from 'react'

const SidebarContext = createContext(null)

export const useSidebar = () => useContext(SidebarContext)

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}
