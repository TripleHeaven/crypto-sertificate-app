import { Redirect, Route, Switch } from "react-router-dom";

import Login from "./Login";
import { ROUTES } from "./routes";
import Home from "./Home";
import { PrivateRoute } from "./fragments/PrivateRoute";
import Main from "./Main";

export const Root = () => (
  <Switch>
    <Route path={ROUTES.LOGIN} exact component={Login} />
    <PrivateRoute path={ROUTES.HOME} exact component={Home} />
    <PrivateRoute path={ROUTES.ROOT} exact component={Main} />
  </Switch>
);
