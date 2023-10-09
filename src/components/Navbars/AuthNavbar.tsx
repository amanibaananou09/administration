import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoBlue,
  ChakraLogoDark,
  ChakraLogoLight,
  DocumentIcon,
  HomeIcon,
  PersonIcon,
  RocketIcon,
} from "src/components/Icons/Icons";
import { SidebarResponsive } from "src/components/Sidebar/Sidebar";
import { NavLink } from "react-router-dom";
import routes from "src/router/routes";

interface AuthNavbarProps {
  logo: any;
  logoText: string;
  secondary: any;
}

const AuthNavbar: React.FC<AuthNavbarProps> = (props) => {
  const { logo, logoText, secondary, ...rest } = props;
  const { colorMode } = useColorMode();

  // Chakra color mode
  let mainText = "white";
  let navbarIcon = "white";
  let navbarBg = "none";
  let navbarBorder = "none";
  let navbarShadow = "initial";
  let navbarFilter = "initial";
  let navbarBackdrop = "none";
  let bgButton = useColorModeValue("white", "navy.900");
  let colorButton = useColorModeValue("gray.700", "white");
  let navbarPosition = "absolute";
  let hamburgerColor = {
    base: useColorModeValue("gray.700", "white"),
    md: "white",
  };
  let brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target="_blank"
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
    </Link>
  );
  hamburgerColor = { base: "white" };

  return (
    <Flex
      position={navbarPosition}
      top="16px"
      left="50%"
      transform="translate(-50%, 0px)"
      background={navbarBg}
      border={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="15px"
      px="16px"
      py="22px"
      mx="auto"
      width="1044px"
      maxW="90%"
      alignItems="center"
      zIndex="3"
    ></Flex>
  );
};

export default AuthNavbar;
