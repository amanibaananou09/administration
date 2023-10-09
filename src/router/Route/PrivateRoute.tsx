import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "src/store/AuthContext";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect to="/auth/signin" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
