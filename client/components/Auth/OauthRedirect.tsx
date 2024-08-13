import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()
  
  const handleLogin = () => {
    const appId = 'your_app_id' // Replace with your Deriv app ID
    const authUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${appId}`
    window.location.href = authUrl
  }

  return (
    <div className="login-container flex h-screen items-center justify-center bg-gray-900 text-green-500">
      <div className="rounded bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Login with Deriv</h1>
        <button
          onClick={handleLogin}
          className="w-full rounded bg-green-500 p-2 text-black"
        >
          Login with OAuth2
        </button>
      </div>
    </div>
  )
}

export default Login