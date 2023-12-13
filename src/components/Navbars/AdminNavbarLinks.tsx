import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import StationConfigurator from "components/Configurator/StationConfigurator";
import { ProfileIcon } from "components/Icons/Icons";
import LanguageSelector from "components/LanguageSelector";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { administrationRoutes } from "router/routes";
import { useAuth } from "store/AuthContext";

import avatar1 from "../../assets/img/avatars/avatar1.png";

interface Notification {
  notification: string;
  timestamp: Date;
}

const HeaderLinks = (props: any) => {
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;
  const { signOut, user, isSignedIn } = useAuth();
  const routes = administrationRoutes();
  const { t } = useTranslation("dashboard");
  const [
    showStationConfigurator,
    setShowStationConfigurator,
  ] = useState<boolean>(false);

  //styles
  const navbarIcon = "gray.700";

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      justifyContent="space-around"
    >
      <Menu>
        <MenuButton>
          <Flex alignItems="center" me="10px">
            <Box display={{ sm: "none", md: "unset" }}>
              <Text
                fontSize="md"
                fontWeight="bold"
                color={navbarIcon}
                me="10px"
              >
                {isSignedIn ? user!!.name : "Unknown Name"}
              </Text>
            </Box>
            <Box>
              <ProfileIcon color={navbarIcon} w="33px" h="33px" me="0px" />
            </Box>
          </Flex>
        </MenuButton>
        <MenuList
          p="10px 8px"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="8px"
          minWidth="200px"
        >
          <MenuItem borderRadius="8px">
            <Flex alignItems="center">
              <Box mr="10px">
                <img
                  src={avatar1}
                  alt="Avatar"
                  style={{ borderRadius: "50%", width: "33px", height: "33px" }}
                />
              </Box>
              <Box>
                <Text color="gray.400" fontSize="md" mr="10px">
                  <Text
                    as="span"
                    fontSize="md"
                    color="black"
                    fontWeight="bold"
                    mr="10px"
                  >
                    {t("navbarLinks.userLogin")}:
                  </Text>
                  {isSignedIn ? user!!.username : "Unknown User Name"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {isSignedIn && user!!.email ? user!!.email : "Unknown Email"}
                </Text>
              </Box>
            </Flex>
          </MenuItem>

          <MenuItem
            borderRadius="8px"
            onClick={() => {
              signOut();
            }}
            _hover={{ bg: "gray.100" }}
          >
            {t("navbarLinks.signOut")}
          </MenuItem>
        </MenuList>
      </Menu>

      <Flex ml="16px">
        <LanguageSelector />
      </Flex>

      <Flex ml="16px">
        <SidebarResponsive
          hamburgerColor="white"
          secondary={props.secondary}
          routes={routes}
          {...props}
          mr="16px"
        />
      </Flex>

      {showStationConfigurator && (
        <StationConfigurator
          isOpen={showStationConfigurator}
          onClose={() => setShowStationConfigurator(false)}
        />
      )}
    </Flex>
  );
};

export default HeaderLinks;
