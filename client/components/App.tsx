import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import AccountBalance from './AccountBalance'
import CurrentTrades from './CurrentTrades'
import TradeHistory from './TradeHistory'
import PerformanceMetrics from './PerformanceMetrics'

const domain = 'piwakawaka-2024-isaac.au.auth0.com'
const clientID = 'eJw3cfuzST9Lba04S6CV1d6PiCuJVROd'
const clientSecret =
  'g7E5D6ijAkRYVFSk2heb0ZloXxX-Le3_fo-f_fIh5U2WvsHih521noKa5Qip6uNj'

function App() {
  const location = useLocation()
  const redirectUri = `${location.protocol}//${location.hostname}:${location.port}/`

  return (
    // // <Auth0Provider
    //   domain={domain}
    //   clientId={clientID}
    //   clientSecret={clientSecret}
    //   authorizationParams={{ redirect_uri: redirectUri }}
    // >
    <div className="app">
      <Header />
      <main className="h-auto space-y-8 p-4 pt-20 md:ml-64">
        <Outlet />
        {/* <AccountBalance /> */}
        {/* <CurrentTrades /> */}
        {/* <PerformanceMetrics /> */}
        {/* <TradeHistory /> */}
      </main>
    </div>
    // </Auth0Provider>
  )
}

export default App
