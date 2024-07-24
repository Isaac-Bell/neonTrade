import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaTachometerAlt as IconDashboard,
  FaBalanceScale as IconAccountBalance,
  FaExchangeAlt as IconCurrentTrades,
  FaChartLine as IconMarketTrends,
  FaRegChartBar as IconPerformanceMetrics,
  FaHistory as IconTradeHistory,
  FaRobot as IconActiveBots,
  FaCogs as IconTradeControls,
  FaEdit as IconStrategyForm,
  FaSave as IconSavedStrategies,
  FaUser as IconProfileSettings,
  FaShieldAlt as IconRiskManagement,
  FaBell as IconNotificationPreferences,
} from 'react-icons/fa'

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed h-screen ${isOpen ? 'w-64' : 'w-16'} bg-gray-900 text-green-500 transition-all duration-300`}
    >
      <div className="p-4">
        <h2 className={`text-2xl font-bold ${!isOpen && 'hidden'}`}>
          neonTrading
        </h2>
        <nav className="mt-10">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconDashboard />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>Dashboard</span>
          </Link>
          <Link
            to="/account-balance"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconAccountBalance />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Account Balance
            </span>
          </Link>
          <Link
            to="/current-trades"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconCurrentTrades />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Current Trades
            </span>
          </Link>
          <Link
            to="/market-trends"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconMarketTrends />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Market Trends
            </span>
          </Link>
          <Link
            to="/performance-metrics"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconPerformanceMetrics />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Performance Metrics
            </span>
          </Link>
          <Link
            to="/trade-history"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconTradeHistory />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Trade History
            </span>
          </Link>
          <Link
            to="/active-bots"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconActiveBots />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>Active Bots</span>
          </Link>
          <Link
            to="/trade-controls"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconTradeControls />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Trade Controls
            </span>
          </Link>
          <Link
            to="/strategy-form"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconStrategyForm />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Strategy Form
            </span>
          </Link>
          <Link
            to="/saved-strategies"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconSavedStrategies />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Saved Strategies
            </span>
          </Link>
          <Link
            to="/profile-settings"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconProfileSettings />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Profile Settings
            </span>
          </Link>
          <Link
            to="/risk-management"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconRiskManagement />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Risk Management
            </span>
          </Link>
          <Link
            to="/notification-preferences"
            className="flex items-center space-x-2 rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <IconNotificationPreferences />
            <span className={`flex-1 ${!isOpen && 'hidden'}`}>
              Notification Preferences
            </span>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
