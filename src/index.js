import { createRoot } from "react-dom/client";
import { HashRouter, Route, Switch } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import NotificationPopupContainer from "components/Notification/NotificationPopupContainer";
import AuthLayout from "layouts/Auth";
import MainLayout from "layouts/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoute from "router/Route/MainRoute";
import { AuthContextProvider } from "store/AuthContext";
import { ESSContextProvider } from "store/ESSContext";
import { TranslationProvider } from "store/TranslationContext";
import theme from "theme/theme";
const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <ESSContextProvider>
    <TranslationProvider>
      <AuthContextProvider>
        <ChakraProvider theme={theme} resetCss={false} position="relative">
          <HashRouter>
            <NotificationPopupContainer />
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <Route path={`/dashboard`} component={MainLayout} />
              <Route path={`/administration`} component={MainLayout} />
              <MainRoute />
              <ToastContainer />
            </Switch>
          </HashRouter>
        </ChakraProvider>
      </AuthContextProvider>
    </TranslationProvider>
  </ESSContextProvider>,
);
