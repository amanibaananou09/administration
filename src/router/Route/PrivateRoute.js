import { Route, Redirect } from "react-router-dom";
import { useAuth } from "store/AuthContext";

const PrivateRoute = ({ ...props }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect to="/auth/signin" />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
