import { Stack, Text } from "@chakra-ui/react";
import { ReactComponent as AdminLogo } from "assets/svg/administration-logo.svg";
import { ReactComponent as Logo } from "assets/svg/fuel-station-logo.svg";
import { useESSContext } from "store/ESSContext";

const SidebarLogo = () => {
  const { isAdminMode, selectedStation } = useESSContext();

  return (
    <Stack direction="column" spacing="12px" align="center" justify="center">
      {isAdminMode && (
        <>
          <AdminLogo style={{ height: "100px" }} />
          <Text
            fontSize={{ sm: "lg", lg: "xl" }}
            fontWeight="bold"
            ms={{ sm: "8px", md: "0px" }}
          >
            Administration
          </Text>
        </>
      )}
      )
      {!isAdminMode && (
        <>
          <Logo style={{ height: "100px" }} />
          {selectedStation && (
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              fontWeight="bold"
              ms={{ sm: "8px", md: "0px" }}
            >
              {selectedStation.name}
            </Text>
          )}
        </>
      )}
    </Stack>
  );
};

export default SidebarLogo;
