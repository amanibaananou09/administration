import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import theme from "theme/theme.js";
import { AuthContextProvider } from "store/AuthContext";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import MainRoute from "router/Route/MainRoute";
import { ESSContextProvider } from "store/ESSContext";
ReactDOM.render(React.createElement(ESSContextProvider, null,
    React.createElement(AuthContextProvider, null,
        React.createElement(ChakraProvider, { theme: theme, resetCss: false, position: "relative" },
            React.createElement(HashRouter, null,
                React.createElement(Switch, null,
                    React.createElement(Route, { path: `/auth`, component: AuthLayout }),
                    React.createElement(Route, { path: `/admin`, component: AdminLayout }),
                    React.createElement(MainRoute, null)))))), document.getElementById("root"));
