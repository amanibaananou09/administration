import { Redirect } from "react-router-dom";
import { useAuth } from "store/AuthContext";

const MainRoute = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect to="/administration/customer-accounts" />;
  } else {
    return <Redirect to="/auth/signin" />;
  }
};

export default MainRoute;
