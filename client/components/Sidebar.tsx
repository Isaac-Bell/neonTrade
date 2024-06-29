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
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-dashboard" /> {isOpen && 'Dashboard'}
          </Link>
          <Link
            to="/account-balance"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-account-balance" /> {isOpen && 'Account Balance'}
          </Link>
          <Link
            to="/current-trades"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-current-trades" /> {isOpen && 'Current Trades'}
          </Link>
          <Link
            to="/market-trends"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-market-trends" /> {isOpen && 'Market Trends'}
          </Link>
          <Link
            to="/performance-metrics"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-performance-metrics" />{' '}
            {isOpen && 'Performance Metrics'}
          </Link>
          <Link
            to="/trade-history"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-trade-history" /> {isOpen && 'Trade History'}
          </Link>
          <Link
            to="/active-bots"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-active-bots" /> {isOpen && 'Active Bots'}
          </Link>
          <Link
            to="/trade-controls"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-trade-controls" /> {isOpen && 'Trade Controls'}
          </Link>
          <Link
            to="/strategy-form"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-strategy-form" /> {isOpen && 'Strategy Form'}
          </Link>
          <Link
            to="/saved-strategies"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-saved-strategies" />{' '}
            {isOpen && 'Saved Strategies'}
          </Link>
          <Link
            to="/profile-settings"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-profile-settings" />{' '}
            {isOpen && 'Profile Settings'}
          </Link>
          <Link
            to="/risk-management"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-risk-management" /> {isOpen && 'Risk Management'}
          </Link>
          <Link
            to="/notification-preferences"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-gray-800 hover:text-white"
          >
            <i className="icon-notification-preferences" />{' '}
            {isOpen && 'Notification Preferences'}
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
