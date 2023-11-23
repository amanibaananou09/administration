import React, { useState, useEffect } from 'react';
import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {  ProfileIcon, SupportIcon } from "components/Icons/Icons";
import ItemContent from "components/Menu/ItemContent";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import { useHistory } from "react-router-dom";
import { administrationRoutes, dashboardRoutes } from "router/routes";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import LanguageSelector from "components/LanguageSelector";
import { useTranslation } from "react-i18next";
import StationConfigurator from "components/Configurator/StationConfigurator";


import NotificationPopup from 'components/Notification/NotificationPopup';
import WebSocketService from 'components/Notification/WebSocketService';
import avatar1 from "../../assets/img/avatars/avatar1.png";
import avatar2 from "../../assets/img/avatars/avatar2.png";
import avatar3 from "../../assets/img/avatars/avatar3.png";

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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { colorMode } = useColorMode();
  const history = useHistory();
  const { signOut, user, isSignedIn } = useAuth();
  const { isAdminMode } = useESSContext();
  const routes = isAdminMode ? administrationRoutes() : dashboardRoutes();
  const { t } = useTranslation("dashboard");
  const [showStationConfigurator, setShowStationConfigurator] = useState<boolean>(false);

  const navbarIcon = fixed && scrolled
    ? useColorModeValue("gray.700", "gray.200")
    : useColorModeValue("white", "gray.200");

  const menuBg = useColorModeValue("white", "navy.800");

  useEffect(() => {
    const stompClient = WebSocketService((notification) => {
      const timestamp = new Date(); // Create a timestamp when the notification is received
      setNotifications(prevNotifications => [...prevNotifications, { notification, timestamp }]);
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  const handleNotificationClick = (index: number) => {
    // Mark the notification as read and remove it from the list
    setNotifications((prevNotifications) => {
      const updatedNotifications = [...prevNotifications];
      updatedNotifications.splice(index, 1);
      return updatedNotifications;
    });
  };

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <Menu>
        <MenuButton>
          <Flex alignItems="center" me="16px">
            <Box>
              <Text
                fontSize="md"
                fontWeight="bold"
                color={navbarIcon}
                me="16px"
              >
                {isSignedIn ? user!!.name : "Unknown Name"}
              </Text>
            </Box>
            <Box>
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            </Box>
          </Flex>
        </MenuButton>
        <MenuList
          p="16px 8px"
          bg={menuBg}
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          borderRadius="8px"
          minWidth="200px"
        >
          <MenuItem borderRadius="8px">
            <Flex alignItems="center">
              <Box mr="12px">
                <img
                  src={avatar1}
                  alt="Avatar"
                  style={{ borderRadius: "50%", width: "32px", height: "32px" }}
                />
              </Box>
              <Box>
                <Text color="gray.400" fontSize="md" mr="12px">
                  <Text
                    as="span"
                    fontSize="md"
                    color="black"
                    fontWeight="bold"
                    mr="12px"
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
          {!isAdminMode && (
            <MenuItem
              borderRadius="8px"
              _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
              onClick={() => {
                history.push("/admin/profile");
              }}
            >
               {t("navbarLinks.myProfile")}
            </MenuItem>
          )}
          <MenuItem
            borderRadius="8px"
            onClick={() => {
              signOut();
            }}
            _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
          >
             {t("navbarLinks.signOut")}
          </MenuItem>
        </MenuList>
      </Menu>
      <SidebarResponsive
        hamburgerColor={"white"}
        colorMode={colorMode}
        secondary={props.secondary}
        routes={routes}
        {...props}
      />
      {!isAdminMode && (<SupportIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        onClick={() => setShowStationConfigurator(true)}
        color={navbarIcon}
        w="18px"
        h="18px"
      />  )}
      {!isAdminMode && (
      <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
          {notifications.length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '30%',
                right: '4%',
                transform: 'translate(50%, -50%)',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '45%',
                padding: '4px 8px',
              }}
            >
              {notifications.length}
            </span>
          )}
        </MenuButton>
        <MenuList p="16px 8px" bg={menuBg}>
          <Flex flexDirection="column">
            {notifications.map((notification, index) => (
              <MenuItem
                key={index}
                borderRadius="8px"
                mb="10px"
                onClick={() => handleNotificationClick(index)}
              >
                <ItemContent
                  time={notification.timestamp.toLocaleString()} // Display the received time
                  info={notification.notification}
                  boldInfo=""
                  aName="Kara"

                />
              </MenuItem>
            ))}
          </Flex>
        </MenuList>
      </Menu>
      )}
      <LanguageSelector />
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
