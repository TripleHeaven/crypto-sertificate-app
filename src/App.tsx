import './App.css'
import { Button } from '@mui/material'
import { useMetaMask } from './hooks/useMetaMask'

function App() {
  const { connect, disconnect, isActive, account } = useMetaMask()
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={connect}>Connect With MetaMask</Button>
        {isActive ? (
          <span>Connected with {account}</span>
        ) : (
          <span>Not Connected</span>
        )}

        <Button onClick={disconnect}>Disconnect from MetaMask</Button>
      </header>
    </div>
  )
}

export default App
