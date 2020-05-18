import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from './pages/Login/index';
import Chat from "./pages/Chat";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/chat" component={Chat} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
);

export default Routes;