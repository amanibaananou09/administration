import React, { FC, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import Logo from "../assets/svg/fuel-station-logo.svg";
import { useDisclosure, useColorMode } from "@chakra-ui/react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../router/routes";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import bgAdmin from "../assets/img/admin-background.png";
import PrivateRoute from "../router/Route/PrivateRoute";
import { useAuth } from "../store/AuthContext";
import MainRoute from "../router/Route/MainRoute";
import { useESSContext } from "../store/ESSContext";

interface DashboardProps {
  isSignedIn: boolean;
}

const Dashboard: FC<DashboardProps> = (props) => {
  const { isSignedIn } = useAuth();
  const { selectedStation } = useESSContext();
  const { ...rest } = props;

  const [fixed, setFixed] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getRoute = (): boolean => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };

  const getActiveRoute = (routes: any[]): string => {
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

  const getActiveNavbar = (routes: any[]): boolean => {
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

  const getRoutes = (routes: any[]): JSX.Element[] => {
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

      if (prop.layout === "/admin") {
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
    <Box>
      <Box
        minH="40vh"
        w="100%"
        position="absolute"
        bgImage={colorMode === "light" ? bgAdmin : "none"}
        bg={colorMode === "light" ? bgAdmin : "navy.900"}
        bgSize="cover"
        top="0"
      />
      <Sidebar
        routes={routes}
        logo={
          <Stack
            direction="column"
            spacing="12px"
            align="center"
            justify="center"
          >
            <Logo style={{ height: "100px" }} />
            {selectedStation && (
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                fontWeight="bold"
                ms={{ sm: "8px", md: "0px" }}
              >
                {selectedStation.name}
              </Text>
            )}
          </Stack>
        }
        display="none"
        {...rest}
      />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                <MainRoute />
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Footer />
        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        {isSignedIn && (
          <Configurator
            secondary={getActiveNavbar(routes)}
            isOpen={isOpen}
            onClose={onClose}
            isChecked={fixed}
            onSwitch={(value) => {
              setFixed(value);
            }}
          />
        )}
      </MainPanel>
    </Box>
  );
};

export default Dashboard;
