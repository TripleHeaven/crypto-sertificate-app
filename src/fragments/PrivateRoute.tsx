import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useMetaMask } from '../hooks/useMetaMask'
import { ROUTES } from '../routes'

type PrivateRouteProps = Pick<RouteProps, 'component'>

const PrivateRouteComponent = (props: PrivateRouteProps) => {
  const { isActive } = useMetaMask()
  if (!isActive) {
    return <Redirect to={ROUTES.LOGIN} />
  }
  return <Route {...props} />
}

export const PrivateRoute = ({ component, ...rest }: RouteProps) => (
  <Route
    {...rest}
    render={() => <PrivateRouteComponent component={component} {...rest} />}
  />
)
