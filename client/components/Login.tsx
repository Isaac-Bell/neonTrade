import React, { useState } from 'react'
import { setToken } from '../utils/auth'

const Login: React.FC = () => {
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
          onClick={handleLogin}
          className="w-full rounded bg-green-500 p-2 text-black"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
