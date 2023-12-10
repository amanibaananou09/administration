import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ALERTS_TOPIC } from "common/api/WebSocketTopics";
import StationConfigurator from "components/Configurator/StationConfigurator";
import { ProfileIcon } from "components/Icons/Icons";
import LanguageSelector from "components/LanguageSelector";
import ItemContent from "components/Menu/ItemContent";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useSubscription } from "react-stomp-hooks";
import { dashboardRoutes } from "router/routes";
import { useAuth } from "store/AuthContext";

import avatar1 from "../../assets/img/avatars/avatar1.png";
import fuel from "../../assets/img/station.png";

interface Notification {
  notification: string;
  timestamp: Date;
}

const NavBarLinks = (props: any) => {
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const history = useHistory();
  const { signOut, user, isSignedIn } = useAuth();
  const routes = dashboardRoutes();
  const { t } = useTranslation("dashboard");
  const [
    showStationConfigurator,
    setShowStationConfigurator,
  ] = useState<boolean>(false);

  useSubscription(ALERTS_TOPIC, (message) => {
    const notification: string = message.body || "";
    const timestamp = new Date(); // Create a timestamp when the notification is received
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { notification, timestamp },
    ]);
  });

  const handleNotificationClick = (index: number) => {
    // Mark the notification as read and remove it from the list
    setNotifications((prevNotifications) => {
      const updatedNotifications = [...prevNotifications];
      updatedNotifications.splice(index, 1);
      return updatedNotifications;
    });
  };

  //styles
  const navbarIcon = fixed && scrolled ? "gray.700" : "white";

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
            <Box>
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
            _hover={{ bg: "gray.100" }}
            onClick={() => {
              history.push("/admin/profile");
            }}
          >
            {t("navbarLinks.myProfile")}
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

      <Flex alignItems="center" position="relative">
        <Menu>
          <MenuButton>
            <BellIcon color={navbarIcon} w="25px" h="25px" />
            {notifications.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "30%",
                  right: "4%",
                  transform: "translate(60%, -70%)",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "0px 7px",
                  fontSize: "11px",
                }}
              >
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            )}
          </MenuButton>
          <MenuList p="16px 8px" bg="white">
            <Flex flexDirection="column">
              {notifications.map((notification, index) => (
                <MenuItem
                  key={index}
                  borderRadius="8px"
                  mb="10px"
                  onClick={() => handleNotificationClick(index)}
                >
                  <ItemContent
                    time={notification.timestamp.toLocaleString()}
                    info={notification.notification}
                    boldInfo=""
                    aName="Kara"
                  />
                </MenuItem>
              ))}
            </Flex>
          </MenuList>
        </Menu>
      </Flex>

      <Image
        src={fuel}
        cursor="pointer"
        style={{
          filter: "brightness(0) invert(1)",
          height: "32px",
          width: "32px",
        }}
        ml="16px"
        onClick={() => setShowStationConfigurator(true)}
      />

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

export default NavBarLinks;
