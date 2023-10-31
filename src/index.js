import { createRoot } from "react-dom/client";
import { HashRouter, Route, Switch } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import MainRoute from "router/Route/MainRoute";
import { AuthContextProvider } from "store/AuthContext";
import { ESSContextProvider } from "store/ESSContext";
import theme from "theme/theme";

const root = createRoot(document.getElementById("root"));

root.render(
  <ESSContextProvider>
    <AuthContextProvider>
      <ChakraProvider theme={theme} resetCss={false} position="relative">
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
);
