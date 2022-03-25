import { Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "./routes";
import Home from "./Home";
import { PrivateRoute } from "./fragments/PrivateRoute";

function Main() {
  return (
    <Switch>
      <PrivateRoute path={ROUTES.HOME} component={Home} />
      <Redirect to={ROUTES.HOME} />
    </Switch>
  );
}

export default Main;
