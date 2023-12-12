import { createRoot } from "react-dom/client";
import { HashRouter, Route, Switch } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import NotificationPopupContainer from "components/Notification/NotificationPopupContainer";
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import "react-international-phone/style.css";
import { StompSessionProvider } from "react-stomp-hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoute from "router/Route/MainRoute";
import PrivateRoute from "router/Route/PrivateRoute";
import { AuthContextProvider } from "store/AuthContext";
import { ESSContextProvider } from "store/ESSContext";
import { TranslationProvider } from "store/TranslationContext";
import theme from "theme/theme";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <StompSessionProvider url={"ws://localhost:8083/api/websocket-endpoint"}>
    <ESSContextProvider>
      <TranslationProvider>
        <AuthContextProvider>
          <ChakraProvider theme={theme} resetCss={false} position="relative">
            <HashRouter>
              <NotificationPopupContainer />
              <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                <PrivateRoute
                  path={`/administration`}
                  component={AdminLayout}
                />
                <MainRoute />
                <ToastContainer />
              </Switch>
            </HashRouter>
          </ChakraProvider>
        </AuthContextProvider>
      </TranslationProvider>
    </ESSContextProvider>
  </StompSessionProvider>,
);
