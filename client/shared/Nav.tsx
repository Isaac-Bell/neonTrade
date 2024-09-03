import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const { logout, loginWithRedirect, user } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
    console.log(user)
  }

  return (
    <>
      <NavGroup>
        <IfAuthenticated>
          <NavButton onClick={handleSignOut}>Logout</NavButton>
          <p>
            Signed in as: {user?.nickname} ({user?.email})
          </p>
          <p>Account Balance: $XXX</p>
          <p>Trading Bot Status: Online</p>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavButton onClick={handleSignIn}>Sign in to Trading Bot</NavButton>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Fruit FTW! Trading Bot</h1>
    </>
  )
}
export default Nav
