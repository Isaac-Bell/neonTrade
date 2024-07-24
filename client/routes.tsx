import React from 'react'
import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/DashBoard'
import AccountBalance from './components/AccountBalance'
import CurrentTrades from './components/CurrentTrades'
// import MarketTrends from './components/MarketTrends'
import PerformanceMetrics from './components/PerformanceMetrics'
import TradeHistory from './components/TradeHistory'
import PriceChart from './components/Price Chart'
// import ActiveBots from './components/ActiveBots'
// import TradeControls from './components/TradeControls'
// import StrategyForm from './components/StrategyForm'
// import SavedStrategies from './components/SavedStrategies'
// import ProfileSettings from './components/ProfileSettings'
// import RiskManagement from './components/RiskManagement'
// import NotificationPreferences from './components/NotificationPreferences'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="account-balance" element={<AccountBalance />} />
    <Route path="current-trades" element={<CurrentTrades />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="market-trends" element={<PriceChart />} />
    {/* <Route path="performance-metrics" element={<PerformanceMetrics />} /> */}
    <Route path="trade-history" element={<TradeHistory />} />
    {/* <Route path="active-bots" element={<ActiveBots />} />
    <Route path="trade-controls" element={<TradeControls />} />
    <Route path="strategy-form" element={<StrategyForm />} />
    <Route path="saved-strategies" element={<SavedStrategies />} />
    <Route path="profile-settings" element={<ProfileSettings />} />
    <Route path="risk-management" element={<RiskManagement />} />
    <Route
      path="notification-preferences"
      element={<NotificationPreferences />} */}
    {/* /> */}
  </Route>,
)

export default routes
