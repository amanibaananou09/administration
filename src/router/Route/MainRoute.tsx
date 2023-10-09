import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "src/store/AuthContext";

const MainRoute: React.FC = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect to="/admin/dashboard" />;
  } else {
    return <Redirect to="/auth/signin" />;
  }
};

export default MainRoute;
