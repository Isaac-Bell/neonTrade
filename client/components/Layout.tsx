import { Outlet } from 'react-router-dom'

// app_id 1089 is for testing, create your own app_id and use it here.
// go to api.deriv.com to register your own app.
const connection = new WebSocket(
  'wss://ws.derivws.com/websockets/v3?app_id=1089',
)
const api = new DerivAPI({ connection })
const basic = api.basic

basic.ping().then(console.log)

export default function Layout() {
  return (
    <>
      <header>
        <h1>Fullstack Boilerplate - with Fruits!</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
