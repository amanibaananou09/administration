import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Controller from "views/Pages/Controller.js";
import Station from "views/Pages/Station.js";
import Dashboard from "views/Dashboard/Dashboard.js";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js"; // Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import theme from "theme/theme.js";
import { AuthContextProvider } from "store/AuthContext";
import PrivateRoute from "components/Route/PrivateRoute";

ReactDOM.render(
  <AuthContextProvider>
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <HashRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/rtl`} component={RTLLayout} />
          <PrivateRoute path="/station" component={Station} />
          <PrivateRoute
            path="/controller/:stationName"
            component={Controller}
          />
          <Route path="/dashboard/:id" component={Dashboard} />
        </Switch>
      </HashRouter>
    </ChakraProvider>
  </AuthContextProvider>,
  document.getElementById("root"),
);
