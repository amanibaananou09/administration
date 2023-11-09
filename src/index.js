import { createRoot } from "react-dom/client";
import { HashRouter, Route, Switch } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import AuthLayout from "layouts/Auth";
import MainLayout from "layouts/Main";
import MainRoute from "router/Route/MainRoute";
import { AuthContextProvider } from "store/AuthContext";
import { ESSContextProvider } from "store/ESSContext";
import theme from "theme/theme";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <ESSContextProvider>
    <AuthContextProvider>
      <ChakraProvider theme={theme} resetCss={false} position="relative">
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/dashboard`} component={MainLayout} />
            <Route path={`/administration`} component={MainLayout} />
            <MainRoute />
          </Switch>
        </HashRouter>
      </ChakraProvider>
    </AuthContextProvider>
  </ESSContextProvider>,
);
