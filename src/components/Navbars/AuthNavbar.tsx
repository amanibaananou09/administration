import React from "react";
import {
  Flex,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

interface AuthNavbarProps {
  logo?: any;
  logoText?: string;
  secondary?: any;
}

const AuthNavbar: React.FC<AuthNavbarProps> = (props) => {
  const { logo, logoText, secondary, ...rest } = props;

  // Chakra color mode
  let mainText = "white";
  let navbarIcon = "white";
  let navbarBg = "none";
  let navbarBorder = "none";
  let navbarShadow = "initial";
  let navbarFilter = "initial";
  let navbarBackdrop = "none";
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
    ></Link>
  );
  hamburgerColor = { base: "white", md: "" };

  return (
    <Flex
      bgPosition={navbarPosition}
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
