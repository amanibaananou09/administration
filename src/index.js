import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import theme from "theme/theme.js";
import { AuthContextProvider } from "store/AuthContext";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js"; // Chakra imports
import MainRoute from "router/Route/MainRoute";

ReactDOM.render(
  <AuthContextProvider>
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <HashRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/rtl`} component={RTLLayout} />

          <MainRoute />
        </Switch>
      </HashRouter>
    </ChakraProvider>
  </AuthContextProvider>,
  document.getElementById("root"),
);
