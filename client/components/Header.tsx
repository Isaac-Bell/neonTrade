import React from 'react'
import { User } from './../../models/user'

interface HeaderProps {
  user: User
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <div className="header">
      <div className="username">{user.username}</div>
      <div className="account-balance">{user.accountBalance} </div>
      <div className="account-settings">{/* <icon /> */}</div>
    </div>
  )
}

export default Header
