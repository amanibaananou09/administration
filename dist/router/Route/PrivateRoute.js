import { Route, Redirect } from "react-router-dom";
import { useAuth } from "store/AuthContext";
const PrivateRoute = ({ ...props }) => {
    const { isSignedIn } = useAuth();
    if (!isSignedIn) {
        return React.createElement(Redirect, { to: "/auth/signin" });
    }
    return React.createElement(Route, Object.assign({}, props));
};
export default PrivateRoute;
