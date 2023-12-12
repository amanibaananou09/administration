import { Stack, Text } from "@chakra-ui/react";
import { ReactComponent as AdminLogo } from "assets/svg/administration-logo.svg";

const SidebarLogo = () => {
  return (
    <Stack direction="column" spacing="12px" align="center" justify="center">
      <AdminLogo style={{ height: "100px" }} />
      <Text
        fontSize={{ sm: "lg", lg: "xl" }}
        fontWeight="bold"
        ms={{ sm: "8px", md: "0px" }}
      >
        Administration
      </Text>
    </Stack>
  );
};

export default SidebarLogo;
