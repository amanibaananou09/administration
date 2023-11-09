import { Redirect } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";

const MainRoute = () => {
  const { isSignedIn } = useAuth();
  const { isAdminMode } = useESSContext();

  if (isSignedIn) {
    return isAdminMode ? (
      <Redirect to="/administration/home" />
    ) : (
      <Redirect to="/dashboard/home" />
    );
  } else {
    return <Redirect to="/auth/signin" />;
  }
};

export default MainRoute;
