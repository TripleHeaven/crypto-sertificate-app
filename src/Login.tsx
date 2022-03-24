import './App.css'
import { Box, Button, Typography } from '@mui/material'
import { useMetaMask } from './hooks/useMetaMask'
import { Redirect } from 'react-router-dom'
import { ROUTES } from './routes'

function Login() {
  const { connect, disconnect, isActive, account } = useMetaMask()
  if (isActive) {
    return <Redirect to={ROUTES.HOME} />
  }

  return (
    <div className="App">
      <header className="App-header">
        <Box>
          <Box>
            <img src="./imgs/login.png" width={312} alt="none" />
          </Box>
          <Box width={512}>
            <Typography variant="h5" pt={1}>
              Добро пожаловать в сервис выдачи электронных сертификатов
            </Typography>
          </Box>

          <Box width={512} pt={2} pb={1}>
            <Typography variant="h6">Авторизация</Typography>
          </Box>
        </Box>
        <Button onClick={connect} variant="contained">
          Войти с MetaMask
        </Button>
        {isActive && <Box pt={1}>Ваш аккаунт {account}</Box>}
      </header>
    </div>
  )
}

export default Login
