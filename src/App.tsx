import './App.css'
import { MetaMaskProvider } from './hooks/useMetaMask'
import { history } from './utils/history'
import { Router } from 'react-router-dom'
import { Root } from './Root'

function App() {
  return (
    <MetaMaskProvider>
      <Router history={history}>
        <Root />
      </Router>
    </MetaMaskProvider>
  )
}

export default App
