import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/DashBoard'
import AccountBalance from './components/AccountBalance'
import CurrentTrades from './components/CurrentTrades'
import TradeHistory from './components/TradeHistory'
import PerformanceMetrics from './components/PerformanceMetrics'
// Import other pages as needed

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="account-balance" element={<AccountBalance />} />
    <Route path="current-trades" element={<CurrentTrades />} />
    <Route path="trade-history" element={<TradeHistory />} />
    <Route path="performance-metrics" element={<PerformanceMetrics />} />
    {/* Add other routes as needed */}
  </Route>,
)

export default routes
