// Chakra imports
import {
  Box,
  Flex,
  Portal,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer";

// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import { useState } from "react";
import { Switch } from "react-router-dom";
import { administrationRoutes, dashboardRoutes } from "../router/routes";
// Custom Chakra theme
import FixedPlugin from "components/FixedPlugin/FixedPlugin";
// Custom components
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bgAdmin from "assets/img/admin-background.png";
import { Layout } from "common/enums";
import MainPanel from "components/Layout/MainPanel";
import PanelContainer from "components/Layout/PanelContainer";
import PanelContent from "components/Layout/PanelContent";
import SidebarLogo from "components/Sidebar/SidebarLogo";
import useRoutes from "hooks/use-routes";
import MainRoute from "router/Route/MainRoute";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "../store/ESSContext";

const Main = (props: { [x: string]: any }) => {
  const { isSignedIn } = useAuth();
  const { isAdminMode, isLoading } = useESSContext();
  const routes = isAdminMode ? administrationRoutes : dashboardRoutes;
  const layout = isAdminMode ? Layout.ADMIN : Layout.DASHBOARD;

  const { getActiveRoute, getActiveNavbar, getRoutesForLayout } = useRoutes();

  const { ...rest } = props;
  // states and functions
  const [fixed, setFixed] = useState(false);
  const { colorMode } = useColorMode();
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";

  const layoutBg = isAdminMode ? "gray" : bgAdmin;

  if (isLoading) {
    return (
      <Flex h="100vh" w="100%" alignItems="center" justifyContent="center">
        <FontAwesomeIcon icon={faGasPump} size="2xl" beatFade />
      </Flex>
    );
  }

  // Chakra Color Mode
  return (
    <Box>
      <Box
        minH="450vh"
        w="100%"
        position="absolute"
        bgImage={colorMode === "light" ? layoutBg : "none"}
        bg={colorMode === "light" ? layoutBg : "navy.900"}
        bgSize="cover"
        top="0"
      />
      <Sidebar routes={routes} logo={<SidebarLogo />} {...rest} />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            scrolled={false}
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
                {getRoutesForLayout(routes, layout)}
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

export default Main;
