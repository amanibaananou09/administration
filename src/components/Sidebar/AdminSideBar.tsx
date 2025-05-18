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
  useDisclosure,
} from "@chakra-ui/react";
import { SidebarProps } from "common/react-props";
import {
  renderThumbLight,
  renderTrack,
  renderView,
} from "components/Scrollbar/Scrollbar";
import SidebarHelp from "components/Sidebar/SidebarHelp";
import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { administrationRoutes } from "router/routes";

const SidebarLinks = ({
  expandedIndex,
  handleItemChange,
}: {
  expandedIndex: number;
  handleItemChange: (index: number) => void;
}) => {
  const routes = administrationRoutes();

  return (
    <Accordion index={expandedIndex} onChange={handleItemChange} allowToggle>
      {routes
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
        })}
    </Accordion>
  );
};

const SidebarBrand = ({ logo }: { logo: SidebarProps["logo"] }) => (
  <Box pt={"25px"} mb="12px">
    {logo}
  </Box>
);

const AdminSideBar = (props: SidebarProps) => {
  const { logo } = props;
  const mainPanel = React.useRef<HTMLDivElement>(null);
  const variantChange = "0.2s linear";
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const handleItemChange = (index: number) => {
    setExpandedIndex(index);
  };

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
            <SidebarBrand logo={logo} />
            <SidebarLinks
              expandedIndex={expandedIndex}
              handleItemChange={handleItemChange}
            />
            <SidebarHelp sidebarVariant={props.sidebarVariant} />
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  );
};

export const AdminSidebarResponsive = (props: SidebarProps) => {
  const { logo, hamburgerColor } = props;
  const mainPanel = React.useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<SVGSVGElement>(null);

  const handleItemChange = (index: number) => {
    setExpandedIndex(index);
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
              <SidebarBrand logo={logo} />
              <SidebarLinks
                expandedIndex={expandedIndex}
                handleItemChange={handleItemChange}
              />
              <SidebarHelp sidebarVariant={props.sidebarVariant} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default AdminSideBar;
