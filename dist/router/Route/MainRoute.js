import { Redirect } from "react-router-dom";
import { useAuth } from "store/AuthContext";
const MainRoute = () => {
    const { isSignedIn } = useAuth();
    if (isSignedIn) {
        return React.createElement(Redirect, { to: "/admin/dashboard" });
    }
    else {
        return React.createElement(Redirect, { to: "/auth/signin" });
    }
};
export default MainRoute;
