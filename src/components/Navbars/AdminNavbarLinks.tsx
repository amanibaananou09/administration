import React from "react";
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
import avatar1 from "../../assets/img/avatars/avatar1.png";
import avatar2 from "../../assets/img/avatars/avatar2.png";
import avatar3 from "../../assets/img/avatars/avatar3.png";
import { ProfileIcon, SettingsIcon } from "src/components/Icons/Icons";
import { ItemContent } from "src/components/Menu/ItemContent";
import { SidebarResponsive } from "src/components/Sidebar/Sidebar";
import routes from "src/router/routes";
import { useAuth } from "src/store/AuthContext";
import { useHistory } from "react-router-dom";

interface HeaderLinksProps {
  logoText: string;
  variant: any;
  children: any;
  fixed: boolean;
  scrolled: boolean;
  secondary: any;
  onOpen: () => void;
}

const HeaderLinks: React.FC<HeaderLinksProps> = (props) => {
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;

  const { signOut, user } = useAuth();
  const { colorMode } = useColorMode();
  const history = useHistory();

  let navbarIcon =
    fixed && scrolled
      ? useColorModeValue("gray.700", "gray.200")
      : useColorModeValue("white", "gray.200");
  let menuBg = useColorModeValue("white", "navy.800");
  if (secondary) {
    navbarIcon = "white";
  }

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
                {user && user.fullName ? user.fullName : "Unknown Name"}
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
                    User Login:
                  </Text>
                  {user && user.username ? user.username : "Unknown User Name"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {user && user.email ? user.email : "Unknown Email"}
                </Text>
              </Box>
            </Flex>
          </MenuItem>
          <MenuItem
            borderRadius="8px"
            _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
            onClick={() => {
              history.push("/admin/profile");
            }}
          >
            My Profile
          </MenuItem>
          <MenuItem
            borderRadius="8px"
            onClick={() => {
              signOut();
            }}
            _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
      <SidebarResponsive
        hamburgerColor={"white"}
        colorMode={colorMode}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
      <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      />
      <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px" bg={menuBg}>
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment successfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default HeaderLinks;
