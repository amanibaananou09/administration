import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Accordion,
  Alert,
  AlertIcon,
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
import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import { administrationRoutes } from "router/routes";

const AdminSideBar = (props: SidebarProps) => {
  const { logo } = props;
  const mainPanel = React.useRef<HTMLDivElement>(null);
  let variantChange = "0.2s linear";
  const routes = administrationRoutes();

  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const handleItemChange = (index: number) => {
    setExpandedIndex(index);
  };

  const links = routes
    .filter((route) => !route.hideInNavbar)
    .map((route, index) => {
      const SideBarItem = route.sideBarItemComponent;
      if (SideBarItem) {
        return (
          <SideBarItem
            key={index}
            route={route}
            isOpen={index === expandedIndex}
          />
        );
      } else {
        return (
          <Alert status="error">
            <AlertIcon />
            {route.name}: No SideBar Item description
          </Alert>
        );
      }
    });

  var brand = (
    <Box pt={"25px"} mb="12px">
      {logo}
    </Box>
  );

  return (
    <Box ref={mainPanel}>
      <Box display={{ base: "none", xl: "block" }} position="fixed">
        <Box
          bg="white"
          transition={variantChange}
          w="300px"
          maxW="300px"
          h="100vh"
          boxShadow="0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)"
          display={{ base: "none", xl: "block" }}
        >
          <Scrollbars
            autoHide
            renderTrackVertical={renderTrack}
            renderThumbVertical={renderThumbLight}
            renderView={renderView}
          >
            <Box mb="30px">{brand}</Box>
            <Accordion
              index={expandedIndex}
              onChange={handleItemChange}
              allowToggle
            >
              {links}
            </Accordion>
            <SidebarHelp sidebarVariant={props.sidebarVariant} />
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  );
};

export const SidebarResponsive = (props: SidebarProps) => {
  let location = useLocation();
  const { logo, routes, hamburgerColor, ...rest } = props;
  const mainPanel = React.useRef<HTMLDivElement>(null);
  const activeRoute = (routeName: string) => {
    return location.pathname === routeName ? "active" : "";
  };

  //styles
  let activeBg = "white";
  let inactiveBg = "white";
  let activeColor = "gray.700";
  let inactiveColor = "gray.400";
  let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
  let sidebarBackgroundColor = "white";

  const createLinks = (routes: any) => {
    const routesArray = Object.values(routes);
    return routesArray.map((prop: any, key: any) => {
      if (prop.redirect) {
        return null;
      }

      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              boxShadow={sidebarActiveShadow}
              mb={{
                xl: "6px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg="blue.500"
                    color="white"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: "6px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              borderRadius="15px"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg={inactiveBg}
                    color="blue.500"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={inactiveColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NavLink>
      );
    });
  };

  var links = <>{createLinks(routes)}</>;

  var brand = (
    <Box pt={"35px"} mb="8px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<SVGSVGElement>(null);

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
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
          bg={sidebarBackgroundColor}
        >
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="100vh">
              <Box>{brand}</Box>
              <Stack direction="column" mb="40px">
                <Box>{links}</Box>
              </Stack>
              <SidebarHelp />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default AdminSideBar;
