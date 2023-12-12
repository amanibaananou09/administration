// Chakra imports
import { Box, Portal } from "@chakra-ui/react";
import Footer from "../components/Footer/Footer";
// Core components
import { Layout } from "common/enums";
import AuthNavbar from "components/Navbars/AuthNavbar";
import useRoutes from "hooks/use-routes";
import { useEffect, useRef } from "react";
import { Switch } from "react-router-dom";
import MainRoute from "../router/Route/MainRoute";
import { authRoutes } from "../router/routes";

const AuthLayout = () => {
  const { getReactRoutes, getActiveNavbar } = useRoutes();
  const wrapper = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const routes = authRoutes();

  useEffect(() => {
    document.body.style.overflow = "unset";

    return function cleanup() {};
  }, []);

  document.documentElement.dir = "ltr";

  return (
    <Box ref={navRef} w="100%">
      <Portal containerRef={navRef}>
        <AuthNavbar secondary={getActiveNavbar(routes)} />
      </Portal>
      <Box w="100%">
        <Box ref={wrapper} w="100%">
          <Switch>
            {getReactRoutes(routes, Layout.AUTH)}
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

export default AuthLayout;
