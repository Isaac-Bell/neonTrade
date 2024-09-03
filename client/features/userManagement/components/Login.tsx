import React, { useState } from 'react'
import { setToken } from '../services/auth'
import { useAuth0 } from '@auth0/auth0-react'

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0()

  const [token, setTokenState] = useState('')

  const handleLogin = () => {
    setToken(token)
    // Redirect or update the UI as needed
  }

  return (
    <div className="login-container flex h-screen items-center justify-center bg-gray-900 text-green-500">
      <div className="rounded bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <input
          type="text"
          value={token}
          onChange={(e) => setTokenState(e.target.value)}
          placeholder="Enter your API token"
          className="mb-4 w-full rounded p-2 text-black"
        />
        <button
          onClick={() => loginWithRedirect()}
          className="w-full rounded bg-green-500 p-2 text-black"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
