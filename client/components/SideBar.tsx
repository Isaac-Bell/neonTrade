import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaTachometerAlt,
  FaBalanceScale,
  FaExchangeAlt,
  FaChartLine,
  FaRegChartBar,
  FaHistory,
  FaRobot,
  FaCogs,
  FaEdit,
  FaSave,
  FaUser,
  FaShieldAlt,
  FaBell,
} from 'react-icons/fa'

const Sidebar: React.FC = () => {
  return (
    <div className="fixed h-screen w-64 bg-gray-900 text-green-500">
      <div className="p-4">
        <h2 className="text-2xl font-bold">neonTrading</h2>
        <nav className="mt-10 space-y-2">
          <Link
            to="/"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </Link>
          <Link
            to="/account-balance"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaBalanceScale className="mr-2" />
            Account Balance
          </Link>
          <Link
            to="/current-trades"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaExchangeAlt className="mr-2" />
            Current Trades
          </Link>
          <Link
            to="/market-trends"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaChartLine className="mr-2" />
            Market Trends
          </Link>
          <Link
            to="/performance-metrics"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaRegChartBar className="mr-2" />
            Performance Metrics
          </Link>
          <Link
            to="/trade-history"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaHistory className="mr-2" />
            Trade History
          </Link>
          <Link
            to="/active-bots"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaRobot className="mr-2" />
            Active Bots
          </Link>
          <Link
            to="/trade-controls"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaCogs className="mr-2" />
            Trade Controls
          </Link>
          <Link
            to="/strategy-form"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaEdit className="mr-2" />
            Strategy Form
          </Link>
          <Link
            to="/saved-strategies"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaSave className="mr-2" />
            Saved Strategies
          </Link>
          <Link
            to="/profile-settings"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaUser className="mr-2" />
            Profile Settings
          </Link>
          <Link
            to="/risk-management"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaShieldAlt className="mr-2" />
            Risk Management
          </Link>
          <Link
            to="/notification-preferences"
            className="flex items-center rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <FaBell className="mr-2" />
            Notification Preferences
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
