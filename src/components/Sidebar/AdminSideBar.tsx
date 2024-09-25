import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Accordion,
  Alert,
  AlertIcon,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure
} from "@chakra-ui/react";
import { SidebarProps } from "common/react-props";
import { renderThumbLight, renderTrack, renderView } from "components/Scrollbar/Scrollbar";
import SidebarHelp from "components/Sidebar/SidebarHelp";
import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useLocation } from "react-router-dom";
import { administrationRoutes } from "router/routes";

// AdminSideBar Component
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
          <Alert status="error" key={index}>
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

export const AdminSidebarResponsive = (props: SidebarProps) => {
  const { logo, hamburgerColor } = props;
  const location = useLocation();
  const mainPanel = React.useRef<HTMLDivElement>(null);

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
          <Alert status="error" key={index}>
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
          w="300px"
          maxW="300px"
          ms={{ sm: "16px" }}
          my={{ sm: "16px" }}
          borderRadius="16px"
          bg="white"
        >
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="300px" px="1rem">
            <Box>
              <Box>{brand}</Box>
              <Accordion
                index={expandedIndex}
                onChange={handleItemChange}
                allowToggle
              >
                {links}
              </Accordion>
              <SidebarHelp sidebarVariant={props.sidebarVariant} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default AdminSideBar;
