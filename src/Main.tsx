import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTES } from './routes'
import Home from './Home'

function Main() {
  return (
    <Switch>
      <Route path={ROUTES.HOME} component={Home} />
      <Redirect to={ROUTES.HOME} />
    </Switch>
  )
}

export default Main
