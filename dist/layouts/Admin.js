// Chakra imports
import { Portal, useDisclosure, Stack, Box, useColorMode, Text, } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
import { ReactComponent as Logo } from "assets/svg/fuel-station-logo.svg";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "router/routes.js";
// Custom Chakra theme
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import bgAdmin from "assets/img/admin-background.png";
import PrivateRoute from "router/Route/PrivateRoute";
import { useAuth } from "store/AuthContext";
import MainRoute from "router/Route/MainRoute";
import { useESSContext } from "store/ESSContext";
export default function Dashboard(props) {
    const { isSignedIn } = useAuth();
    const { selectedStation } = useESSContext();
    const { ...rest } = props;
    // states and functions
    const [fixed, setFixed] = useState(false);
    const { colorMode } = useColorMode();
    // functions for changing the states from components
    const getRoute = () => {
        return window.location.pathname !== "/admin/full-screen-maps";
    };
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
    // This changes navbar state(fixed or not)
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
            if (prop.layout === "/admin") {
                return (React.createElement(Route, { path: prop.layout + prop.path, component: prop.component, key: key }));
            }
            else {
                return null;
            }
        });
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    document.documentElement.dir = "ltr";
    // Chakra Color Mode
    return (React.createElement(Box, null,
        React.createElement(Box, { minH: "40vh", w: "100%", position: "absolute", bgImage: colorMode === "light" ? bgAdmin : "none", bg: colorMode === "light" ? bgAdmin : "navy.900", bgSize: "cover", top: "0" }),
        React.createElement(Sidebar, Object.assign({ routes: routes, logo: React.createElement(Stack, { direction: "column", spacing: "12px", align: "center", justify: "center" },
                React.createElement(Logo, { style: { height: "100px" } }),
                selectedStation && (React.createElement(Text, { fontSize: { sm: "lg", lg: "xl" }, fontWeight: "bold", ms: { sm: "8px", md: "0px" } }, selectedStation.name))), display: "none" }, rest)),
        React.createElement(MainPanel, { w: {
                base: "100%",
                xl: "calc(100% - 275px)",
            } },
            React.createElement(Portal, null,
                React.createElement(AdminNavbar, Object.assign({ onOpen: onOpen, brandText: getActiveRoute(routes), secondary: getActiveNavbar(routes), fixed: fixed }, rest))),
            getRoute() ? (React.createElement(PanelContent, null,
                React.createElement(PanelContainer, null,
                    React.createElement(Switch, null,
                        getRoutes(routes),
                        React.createElement(MainRoute, null))))) : null,
            React.createElement(Footer, null),
            React.createElement(Portal, null,
                React.createElement(FixedPlugin, { secondary: getActiveNavbar(routes), fixed: fixed, onOpen: onOpen })),
            isSignedIn && (React.createElement(Configurator, { secondary: getActiveNavbar(routes), isOpen: isOpen, onClose: onClose, isChecked: fixed, onSwitch: (value) => {
                    setFixed(value);
                } })))));
}
