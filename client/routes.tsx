import React from 'react'
import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './shared/Layout'
import Dashboard from './features/trading/components/DashBoard'
import AccountBalance from './features/trading/components/AccountBalance'
import CurrentTrades from './features/trading/components/CurrentTrades'
// import MarketTrends from './components/MarketTrends'
import PerformanceMetrics from './features/trading/components/PerformanceMetrics'
import TicksHistory from './features/trading/components/TradeHistory'
import MarketDashboard from './features/trading/components/MarketDashboard'
// import PriceChart from './components/Price Chart'
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
    <Route path="market-trends" element={<MarketDashboard />} />
    <Route path="performance-metrics" element={<PerformanceMetrics />} />
    <Route path="ticks-history" element={<TicksHistory />} />
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
