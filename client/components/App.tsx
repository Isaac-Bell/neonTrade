import { mockUser } from '../../models/user.ts'
import { useFruits } from '../hooks/useFruits.ts'
import GraphContainer from './GraphContainer.tsx'
import Header from './Header.tsx'

function App() {
  // const { data } = useFruits()

  return (
    <>
      <div className="app">
        <Header user={mockUser} />
        <GraphContainer />
      </div>
    </>
  )
}

export default App
