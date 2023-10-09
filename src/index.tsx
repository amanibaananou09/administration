import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
// Custom Chakra theme
import theme from 'src/theme/theme';
import { AuthContextProvider } from 'src/store/AuthContext';
import AuthLayout from 'src/layouts/Auth';
import AdminLayout from 'src/layouts/Admin';
import MainRoute from 'src/router/Route/MainRoute';
import { ESSContextProvider } from 'src/store/ESSContext';

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
  document.getElementById('root')
);
