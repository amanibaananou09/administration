import { createRoot } from "react-dom/client";
import { HashRouter, Route, Switch } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import "react-international-phone/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoute from "router/Route/MainRoute";
import PrivateRoute from "router/Route/PrivateRoute";
import { AuthContextProvider } from "store/AuthContext";
import { ESSContextProvider } from "store/ESSContext";
import { TranslationProvider } from "store/TranslationContext";
import theme from "theme/theme";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error);
      toast.error(error.response.data, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    },
  }),
});

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <ESSContextProvider>
      <TranslationProvider>
        <AuthContextProvider>
          <ChakraProvider theme={theme} resetCss={false} position="relative">
            <HashRouter>
              <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                <PrivateRoute
                  path={`/administration`}
                  component={AdminLayout}
                />
                <MainRoute />
              </Switch>
            </HashRouter>
          </ChakraProvider>
        </AuthContextProvider>
      </TranslationProvider>
    </ESSContextProvider>
    <ToastContainer />
    <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
  </QueryClientProvider>,
);
