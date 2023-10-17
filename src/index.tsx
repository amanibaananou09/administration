import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import theme from "theme/theme";
import { AuthContextProvider } from "store/AuthContext";
import AuthLayout from "layouts/Auth";
import AdminLayout from "layouts/Admin";
import MainRoute from "router/Route/MainRoute";
import { ESSContextProvider } from "store/ESSContext";

ReactDOM.render(
  <ESSContextProvider>
    <AuthContextProvider>
      <ChakraProvider theme={theme} resetCSS={false}>
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <MainRoute />
          </Switch>
        </HashRouter>
      </ChakraProvider>
    </AuthContextProvider>
  </ESSContextProvider>,
  document.getElementById("root"),
);
