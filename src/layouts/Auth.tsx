// Chakra imports
import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import Footer from "../components/Footer/Footer";
// Core components
import AuthNavbar from "../components/Navbars/AuthNavbar";
import MainRoute from "../router/Route/MainRoute";
import PrivateRoute from "../router/Route/PrivateRoute";
import React, { useEffect, useRef } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../router/routes";
import { useAuth } from "../store/AuthContext";

interface PagesProps {}

const Pages: React.FC<PagesProps> = (props) => {
  const { isSignedIn } = useAuth();
  const wrapper = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "unset";

    return function cleanup() {};
  }, []);

  const getActiveRoute = (routes: any[]): any => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes: any[]):any => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes: any[]): any => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }

      if (isSignedIn && prop.onlyPublicRoute) {
        return null;
      }

      if (prop.privateRoute) {
        return (
          <PrivateRoute
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }

      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";

  return (
    <Box ref={navRef} w="100%">
      <Portal containerRef={navRef}>
        <AuthNavbar secondary={getActiveNavbar(routes)} logoText="" logo={undefined} />
      </Portal>
      <Box w="100%">
        <Box ref={wrapper} w="100%">
          <Switch>
            {getRoutes(routes)}
            <MainRoute />
          </Switch>
        </Box>
      </Box>
      <Box px="24px" mx="auto" width="1044px" maxW="100%" mt="60px">
        <Footer />
      </Box>
    </Box>
  );
};

export default Pages;
