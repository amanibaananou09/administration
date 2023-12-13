import { Flex, Stack, Text } from "@chakra-ui/react";
import { ReactComponent as AdminLogo } from "assets/svg/administration-logo.svg";

const SidebarLogo = () => {
  return (
    <Flex direction="row" gap="1" align="center">
      <AdminLogo style={{ height: "50px", width: "30%" }} />
      <Text
        width="60%"
        fontSize={{ sm: "lg", lg: "xl" }}
        fontWeight="bold"
        ms={{ sm: "8px", md: "0px" }}
      >
        Administration
      </Text>
    </Flex>
  );
};

export default SidebarLogo;
