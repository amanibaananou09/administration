import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SidebarProps } from "common/react-props";
import IconBox from "components/Icons/IconBox";
import {
  renderThumbLight,
  renderTrack,
  renderView,
} from "components/Scrollbar/Scrollbar";
import { HSeparator } from "components/Separator/Separator";
import SidebarHelp from "components/Sidebar/SidebarHelp";
import React, { FC, Fragment, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "store/AuthContext";

type RouteState = { [key: string]: boolean };

const commonStyles = {
  activeBg: "white",
  inactiveBg: "white",
  activeColor: "gray.700",
  inactiveColor: "gray.400",
  sidebarActiveShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
  sidebarBackgroundColor: "white",
  variantChange: "0.2s linear",
};

const commonButtonProps = {
  boxSize: "initial",
  justifyContent: "flex-start",
  alignItems: "center",
  mb: { xl: "6px" },
  mx: { xl: "auto" },
  py: "12px",
  ps: { sm: "10px", xl: "16px" },
  borderRadius: "15px",
  w: "100%",
  _active: {
    bg: "inherit",
    transform: "none",
    borderColor: "transparent",
  },
};

const SidebarItem: FC<{
  prop: any;
  isActive: boolean;
  variantChange: string;
}> = ({ prop, isActive, variantChange }) => {
  const styles = isActive
    ? {
        bg: commonStyles.activeBg,
        boxShadow: commonStyles.sidebarActiveShadow,
        color: commonStyles.activeColor,
      }
    : {
        bg: "transparent",
        color: commonStyles.inactiveColor,
      };

  return (
    <Button
      {...commonButtonProps}
      bg={styles.bg}
      boxShadow={styles.boxShadow}
      _focus={{
        boxShadow: isActive ? commonStyles.sidebarActiveShadow : "none",
      }}
    >
      <Flex>
        {typeof prop.icon === "string" ? (
          <Icon>{prop.icon}</Icon>
        ) : (
          <IconBox
            bg={isActive ? "gray" : commonStyles.inactiveBg}
            color={isActive ? "white" : "gray"}
            h="30px"
            w="30px"
            me="12px"
            transition={variantChange}
          >
            {prop.icon}
          </IconBox>
        )}
        <Text color={styles.color} my="auto" fontSize="sm">
          {prop.name}
        </Text>
      </Flex>
    </Button>
  );
};

// Reusable CategoryTitle component
const CategoryTitle: FC<{ name: string }> = ({ name }) => (
  <Text
    color={commonStyles.activeColor}
    fontWeight="bold"
    mb={{ xl: "6px" }}
    mx="auto"
    ps={{ sm: "10px", xl: "16px" }}
    py="12px"
  >
    {name}
  </Text>
);

const Brand: FC<{ logo: React.ReactNode }> = ({ logo }) => (
  <Box pt={"25px"} mb="12px">
    {logo}
    <HSeparator my="26px" />
  </Box>
);

const SidebarLinks: FC<{
  routes: any;
  activeRoute: (routeName: string) => string;
  state: RouteState;
  variantChange: string;
}> = ({ routes, activeRoute, state, variantChange }) => {
  const { isSignedIn } = useAuth();
  const routesArray = Object.values(routes);

  return (
    <>
      {routesArray.map((prop: any, key: number) => {
        if (
          (isSignedIn && prop.publicRoute) ||
          prop.hideInNavbar ||
          prop.redirect
        ) {
          return null;
        }

        if (prop.category) {
          return (
            <Fragment key={key}>
              <CategoryTitle name={prop.name} />
              <SidebarLinks
                routes={prop.views}
                activeRoute={activeRoute}
                state={state}
                variantChange={variantChange}
              />
            </Fragment>
          );
        }

        return (
          <NavLink to={prop.layout + prop.path} key={key}>
            <SidebarItem
              prop={prop}
              isActive={activeRoute(prop.layout + prop.path) === "active"}
              variantChange={variantChange}
            />
          </NavLink>
        );
      })}
    </>
  );
};

const Sidebar: FC<SidebarProps> = ({
  logo,
  routes,
  sidebarVariant,
  ...rest
}) => {
  const location = useLocation();
  const [state, setState] = React.useState<RouteState>({});
  const mainPanel = useRef<HTMLDivElement>(null);

  const activeRoute = (routeName: string) => {
    return location.pathname.startsWith(routeName) ? "active" : "";
  };

  return (
    <Box ref={mainPanel}>
      <Box display={{ base: "none", xl: "block" }} position="fixed">
        <Box
          bg="white"
          transition={commonStyles.variantChange}
          w="260px"
          maxW="260px"
          ms={{ sm: "16px" }}
          my={{ sm: "16px" }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m="0px"
          filter="drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.05))"
          borderRadius="20px"
          display={{ base: "none", xl: "block" }}
        >
          <Scrollbars
            autoHide
            renderTrackVertical={renderTrack}
            renderThumbVertical={renderThumbLight}
            renderView={renderView}
          >
            <Brand logo={logo} />
            <Stack direction="column" mb="40px">
              <Box>
                <SidebarLinks
                  routes={routes}
                  activeRoute={activeRoute}
                  state={state}
                  variantChange={commonStyles.variantChange}
                />
              </Box>
            </Stack>
            <SidebarHelp sidebarVariant={sidebarVariant} />
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  );
};

export const SidebarResponsive: FC<SidebarProps> = ({
  logo,
  routes,
  hamburgerColor,
  sidebarVariant,
  ...rest
}) => {
  const location = useLocation();
  const [state, setState] = React.useState<RouteState>({});
  const mainPanel = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<SVGSVGElement>(null);

  const activeRoute = (routeName: string) => {
    return location.pathname === routeName ? "active" : "";
  };

  return (
    <Flex
      display={{ sm: "flex", xl: "none" }}
      ref={mainPanel}
      alignItems="center"
    >
      <HamburgerIcon
        color={hamburgerColor}
        w="28px"
        h="28px"
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent
          w="250px"
          maxW="250px"
          ms={{ sm: "16px" }}
          my={{ sm: "16px" }}
          borderRadius="16px"
          bg={commonStyles.sidebarBackgroundColor}
        >
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="100vh">
              <Brand logo={logo} />
              <Stack direction="column" mb="40px">
                <Box>
                  <SidebarLinks
                    routes={routes}
                    activeRoute={activeRoute}
                    state={state}
                    variantChange={commonStyles.variantChange}
                  />
                </Box>
              </Stack>
              <SidebarHelp sidebarVariant={sidebarVariant} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Sidebar;
