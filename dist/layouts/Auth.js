// chakra imports
import { Box, Portal } from "@chakra-ui/react";
import Footer from "components/Footer/Footer.js";
// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import MainRoute from "router/Route/MainRoute";
import PrivateRoute from "router/Route/PrivateRoute";
import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "router/routes.js";
import { useAuth } from "store/AuthContext";
export default function Pages(props) {
    const { isSignedIn } = useAuth();
    const { ...rest } = props;
    // ref for the wrapper div
    const wrapper = React.createRef();
    React.useEffect(() => {
        document.body.style.overflow = "unset";
        // Specify how to clean up after this effect:
        return function cleanup() { };
    });
    const getActiveRoute = (routes) => {
        let activeRoute = "Default Brand Text";
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveRoute = getActiveRoute(routes[i].views);
                if (collapseActiveRoute !== activeRoute) {
                    return collapseActiveRoute;
                }
            }
            else if (routes[i].category) {
                let categoryActiveRoute = getActiveRoute(routes[i].views);
                if (categoryActiveRoute !== activeRoute) {
                    return categoryActiveRoute;
                }
            }
            else {
                if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    return routes[i].name;
                }
            }
        }
        return activeRoute;
    };
    const getActiveNavbar = (routes) => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].category) {
                let categoryActiveNavbar = getActiveNavbar(routes[i].views);
                if (categoryActiveNavbar !== activeNavbar) {
                    return categoryActiveNavbar;
                }
            }
            else {
                if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    if (routes[i].secondaryNavbar) {
                        return routes[i].secondaryNavbar;
                    }
                }
            }
        }
        return activeNavbar;
    };
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.collapse) {
                return getRoutes(prop.views);
            }
            if (prop.category === "account") {
                return getRoutes(prop.views);
            }
            if (isSignedIn && prop.onlyPublicRoute) {
                return null;
            }
            if (prop.privateRoute) {
                return (React.createElement(PrivateRoute, { path: prop.layout + prop.path, component: prop.component, key: key }));
            }
            if (prop.layout === "/auth") {
                return (React.createElement(Route, { path: prop.layout + prop.path, component: prop.component, key: key }));
            }
            else {
                return null;
            }
        });
    };
    const navRef = React.useRef();
    document.documentElement.dir = "ltr";
    return (React.createElement(Box, { ref: navRef, w: "100%" },
        React.createElement(Portal, { containerRef: navRef },
            React.createElement(AuthNavbar, { secondary: getActiveNavbar(routes), logoText: "" })),
        React.createElement(Box, { w: "100%" },
            React.createElement(Box, { ref: wrapper, w: "100%" },
                React.createElement(Switch, null,
                    getRoutes(routes),
                    React.createElement(MainRoute, null)))),
        React.createElement(Box, { px: "24px", mx: "auto", width: "1044px", maxW: "100%", mt: "60px" },
            React.createElement(Footer, null))));
}
