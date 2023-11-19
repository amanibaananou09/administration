import { Flex } from "@chakra-ui/react";
import { AuthNavbarProps } from "common/react-props";

const AuthNavbar = (props: AuthNavbarProps) => {
  // Chakra color mode
  let navbarBg = "none";
  let navbarBorder = "none";
  let navbarShadow = "initial";
  let navbarFilter = "initial";
  let navbarBackdrop = "none";

  return (
    <Flex
      position="absolute"
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
