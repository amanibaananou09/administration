// Chakra Icons
import { BellIcon } from "@chakra-ui/icons";
// Chakra Imports
import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue, } from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import React from "react";
import routes from "router/routes.js";
import { useAuth } from "store/AuthContext";
import { useHistory } from "react-router-dom";
export default function HeaderLinks(props) {
    const { variant, children, fixed, scrolled, secondary, onOpen, ...rest } = props;
    const { signOut, user } = useAuth();
    const { colorMode } = useColorMode();
    const history = useHistory();
    console.log("user:", user);
    // Chakra Color Mode
    let navbarIcon = fixed && scrolled
        ? useColorModeValue("gray.700", "gray.200")
        : useColorModeValue("white", "gray.200");
    let menuBg = useColorModeValue("white", "navy.800");
    if (secondary) {
        navbarIcon = "white";
    }
    return (React.createElement(Flex, { pe: { sm: "0px", md: "16px" }, w: { sm: "100%", md: "auto" }, alignItems: "center", flexDirection: "row" },
        React.createElement(Menu, null,
            React.createElement(MenuButton, null,
                React.createElement(Flex, { alignItems: "center", me: "16px" },
                    React.createElement(Box, null,
                        React.createElement(Text, { fontSize: "md", fontWeight: "bold", color: navbarIcon, me: "16px" }, user && user.fullName ? user.fullName : "Unknown Name")),
                    React.createElement(Box, null,
                        React.createElement(ProfileIcon, { color: navbarIcon, w: "22px", h: "22px", me: "0px" })))),
            React.createElement(MenuList, { p: "16px 8px", bg: menuBg, border: "1px solid", borderColor: useColorModeValue("gray.200", "gray.700"), borderRadius: "8px", minWidth: "200px" },
                React.createElement(MenuItem, { borderRadius: "8px" },
                    React.createElement(Flex, { alignItems: "center" },
                        React.createElement(Box, { mr: "12px" },
                            React.createElement("img", { src: avatar1, alt: "Avatar", style: { borderRadius: "50%", width: "32px", height: "32px" } })),
                        React.createElement(Box, null,
                            React.createElement(Text, { color: "gray.400", fontSize: "md", mr: "12px" },
                                React.createElement(Text, { as: "span", fontSize: "md", color: "black", fontWeight: "bold", mr: "12px" }, "User Login:"),
                                user && user.username ? user.username : "Unknown User Name"),
                            React.createElement(Text, { fontSize: "sm", color: "gray.500" }, user && user.email ? user.email : "Unknown Email")))),
                React.createElement(MenuItem, { borderRadius: "8px", _hover: { bg: useColorModeValue("gray.100", "gray.600") }, onClick: () => {
                        history.push("/admin/profile");
                    } }, "My Profile"),
                React.createElement(MenuItem, { borderRadius: "8px", onClick: () => {
                        signOut();
                    }, _hover: { bg: useColorModeValue("gray.100", "gray.600") } }, "Sign Out"))),
        React.createElement(SidebarResponsive, Object.assign({ hamburgerColor: "white", colorMode: colorMode, secondary: props.secondary, routes: routes }, rest)),
        React.createElement(SettingsIcon, { cursor: "pointer", ms: { base: "16px", xl: "0px" }, me: "16px", onClick: props.onOpen, color: navbarIcon, w: "18px", h: "18px" }),
        React.createElement(Menu, null,
            React.createElement(MenuButton, null,
                React.createElement(BellIcon, { color: navbarIcon, w: "18px", h: "18px" })),
            React.createElement(MenuList, { p: "16px 8px", bg: menuBg },
                React.createElement(Flex, { flexDirection: "column" },
                    React.createElement(MenuItem, { borderRadius: "8px", mb: "10px" },
                        React.createElement(ItemContent, { time: "13 minutes ago", info: "from Alicia", boldInfo: "New Message", aName: "Alicia", aSrc: avatar1 })),
                    React.createElement(MenuItem, { borderRadius: "8px", mb: "10px" },
                        React.createElement(ItemContent, { time: "2 days ago", info: "by Josh Henry", boldInfo: "New Album", aName: "Josh Henry", aSrc: avatar2 })),
                    React.createElement(MenuItem, { borderRadius: "8px" },
                        React.createElement(ItemContent, { time: "3 days ago", info: "Payment succesfully completed!", boldInfo: "", aName: "Kara", aSrc: avatar3 })))))));
}
