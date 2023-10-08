import React, { Fragment } from "react";
/*eslint-disable*/
import { HamburgerIcon } from "@chakra-ui/icons";
// chakra imports
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Stack, Text, useColorMode, useColorModeValue, useDisclosure, } from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import { renderThumbDark, renderThumbLight, renderTrack, renderView, } from "components/Scrollbar/Scrollbar";
import { HSeparator } from "components/Separator/Separator";
import { SidebarHelp } from "components/Sidebar/SidebarHelp";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "store/AuthContext";
// FUNCTIONS
function Sidebar(props) {
    const { isSignedIn } = useAuth();
    // to check for active links and opened collapses
    let location = useLocation();
    // this is for the rest of the collapses
    const [state, setState] = React.useState({});
    const mainPanel = React.useRef();
    let variantChange = "0.2s linear";
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return location.pathname === routeName ? "active" : "";
    };
    const { colorMode } = useColorMode;
    // this function creates the links and collapses that appear in the sidebar (left menu)
    const { sidebarVariant } = props;
    const createLinks = (routes) => {
        // Chakra Color Mode
        let activeBg = useColorModeValue("white", "navy.700");
        let inactiveBg = useColorModeValue("white", "navy.700");
        let activeColor = useColorModeValue("gray.700", "white");
        let inactiveColor = useColorModeValue("gray.400", "gray.400");
        let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
        return routes.map((prop, key) => {
            if (isSignedIn && prop.onlyPublicRoute) {
                return null;
            }
            if (!isSignedIn && prop.privateRoute) {
                return null;
            }
            if (prop.redirect) {
                return null;
            }
            if (prop.category) {
                var st = {};
                st[prop["state"]] = !state[prop.state];
                return (React.createElement(Fragment, { key: key },
                    React.createElement(Text, { color: activeColor, fontWeight: "bold", mb: {
                            xl: "6px",
                        }, mx: "auto", ps: {
                            sm: "10px",
                            xl: "16px",
                        }, py: "12px" }, prop.name),
                    createLinks(prop.views)));
            }
            return (React.createElement(NavLink, { to: prop.layout + prop.path, key: key }, activeRoute(prop.layout + prop.path) === "active" ? (React.createElement(Button, { boxSize: "initial", justifyContent: "flex-start", alignItems: "center", boxShadow: sidebarActiveShadow, bg: activeBg, transition: variantChange, mb: {
                    xl: "6px",
                }, mx: {
                    xl: "auto",
                }, ps: {
                    sm: "10px",
                    xl: "16px",
                }, py: "12px", borderRadius: "15px", _hover: "none", w: "100%", _active: {
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                }, _focus: {
                    boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
                } },
                React.createElement(Flex, null,
                    typeof prop.icon === "string" ? (React.createElement(Icon, null, prop.icon)) : (React.createElement(IconBox, { bg: "blue.500", color: "white", h: "30px", w: "30px", me: "12px", transition: variantChange }, prop.icon)),
                    React.createElement(Text, { color: activeColor, my: "auto", fontSize: "sm" }, prop.name)))) : (React.createElement(Button, { boxSize: "initial", justifyContent: "flex-start", alignItems: "center", bg: "transparent", mb: {
                    xl: "6px",
                }, mx: {
                    xl: "auto",
                }, py: "12px", ps: {
                    sm: "10px",
                    xl: "16px",
                }, borderRadius: "15px", _hover: "none", w: "100%", _active: {
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                }, _focus: {
                    boxShadow: "none",
                } },
                React.createElement(Flex, null,
                    typeof prop.icon === "string" ? (React.createElement(Icon, null, prop.icon)) : (React.createElement(IconBox, { bg: inactiveBg, color: "blue.500", h: "30px", w: "30px", me: "12px", transition: variantChange }, prop.icon)),
                    React.createElement(Text, { color: inactiveColor, my: "auto", fontSize: "sm" }, prop.name))))));
        });
    };
    const { logo, routes } = props;
    var links = React.createElement(React.Fragment, null, createLinks(routes));
    //  BRAND
    //  Chakra Color Mode
    let sidebarBg = useColorModeValue("white", "navy.800");
    let sidebarRadius = "20px";
    let sidebarMargins = "0px";
    var brand = (React.createElement(Box, { pt: "25px", mb: "12px" },
        logo,
        React.createElement(HSeparator, { my: "26px" })));
    // SIDEBAR
    return (React.createElement(Box, { ref: mainPanel },
        React.createElement(Box, { display: { sm: "none", xl: "block" }, position: "fixed" },
            React.createElement(Box, { bg: sidebarBg, transition: variantChange, w: "260px", maxW: "260px", ms: {
                    sm: "16px",
                }, my: {
                    sm: "16px",
                }, h: "calc(100vh - 32px)", ps: "20px", pe: "20px", m: sidebarMargins, filter: "drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.05))", borderRadius: sidebarRadius },
                React.createElement(Scrollbars, { autoHide: true, renderTrackVertical: renderTrack, renderThumbVertical: useColorModeValue(renderThumbLight, renderThumbDark), renderView: renderView },
                    React.createElement(Box, null, brand),
                    React.createElement(Stack, { direction: "column", mb: "40px" },
                        React.createElement(Box, null, links)),
                    React.createElement(SidebarHelp, { sidebarVariant: sidebarVariant }))))));
}
// FUNCTIONS
export function SidebarResponsive(props) {
    // to check for active links and opened collapses
    let location = useLocation();
    const { logo, routes, colorMode, hamburgerColor, ...rest } = props;
    // this is for the rest of the collapses
    const [state, setState] = React.useState({});
    const mainPanel = React.useRef();
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return location.pathname === routeName ? "active" : "";
    };
    // Chakra Color Mode
    let activeBg = useColorModeValue("white", "navy.700");
    let inactiveBg = useColorModeValue("white", "navy.700");
    let activeColor = useColorModeValue("gray.700", "white");
    let inactiveColor = useColorModeValue("gray.400", "white");
    let sidebarActiveShadow = useColorModeValue("0px 7px 11px rgba(0, 0, 0, 0.04)", "none");
    let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
    // this function creates the links and collapses that appear in the sidebar (left menu)
    const createLinks = (routes) => {
        return routes.map((prop, key) => {
            if (prop.redirect) {
                return null;
            }
            if (prop.category) {
                var st = {};
                st[prop["state"]] = !state[prop.state];
                return (React.createElement(Fragment, { key: key },
                    React.createElement(Text, { color: activeColor, fontWeight: "bold", mb: {
                            xl: "6px",
                        }, mx: "auto", ps: {
                            sm: "10px",
                            xl: "16px",
                        }, py: "12px" }, prop.name),
                    createLinks(prop.views)));
            }
            return (React.createElement(NavLink, { to: prop.layout + prop.path, key: key }, activeRoute(prop.layout + prop.path) === "active" ? (React.createElement(Button, { boxSize: "initial", justifyContent: "flex-start", alignItems: "center", bg: activeBg, boxShadow: sidebarActiveShadow, mb: {
                    xl: "6px",
                }, mx: {
                    xl: "auto",
                }, ps: {
                    sm: "10px",
                    xl: "16px",
                }, py: "12px", borderRadius: "15px", _hover: "none", w: "100%", _active: {
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                }, _focus: {
                    boxShadow: "none",
                } },
                React.createElement(Flex, null,
                    typeof prop.icon === "string" ? (React.createElement(Icon, null, prop.icon)) : (React.createElement(IconBox, { bg: "blue.500", color: "white", h: "30px", w: "30px", me: "12px" }, prop.icon)),
                    React.createElement(Text, { color: activeColor, my: "auto", fontSize: "sm" }, prop.name)))) : (React.createElement(Button, { boxSize: "initial", justifyContent: "flex-start", alignItems: "center", bg: "transparent", mb: {
                    xl: "6px",
                }, mx: {
                    xl: "auto",
                }, py: "12px", ps: {
                    sm: "10px",
                    xl: "16px",
                }, borderRadius: "15px", _hover: "none", w: "100%", _active: {
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                }, _focus: {
                    boxShadow: "none",
                } },
                React.createElement(Flex, null,
                    typeof prop.icon === "string" ? (React.createElement(Icon, null, prop.icon)) : (React.createElement(IconBox, { bg: inactiveBg, color: "blue.500", h: "30px", w: "30px", me: "12px" }, prop.icon)),
                    React.createElement(Text, { color: inactiveColor, my: "auto", fontSize: "sm" }, prop.name))))));
        });
    };
    var links = React.createElement(React.Fragment, null, createLinks(routes));
    //  BRAND
    var brand = (React.createElement(Box, { pt: "35px", mb: "8px" },
        logo,
        React.createElement(HSeparator, { my: "26px" })));
    // SIDEBAR
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    // Color variables
    return (React.createElement(Flex, { display: { sm: "flex", xl: "none" }, ref: mainPanel, alignItems: "center" },
        React.createElement(HamburgerIcon, { color: hamburgerColor, w: "18px", h: "18px", ref: btnRef, onClick: onOpen }),
        React.createElement(Drawer, { isOpen: isOpen, onClose: onClose, finalFocusRef: btnRef },
            React.createElement(DrawerOverlay, null),
            React.createElement(DrawerContent, { w: "250px", maxW: "250px", ms: {
                    sm: "16px",
                }, my: {
                    sm: "16px",
                }, borderRadius: "16px", bg: sidebarBackgroundColor },
                React.createElement(DrawerCloseButton, { _focus: { boxShadow: "none" }, _hover: { boxShadow: "none" } }),
                React.createElement(DrawerBody, { maxW: "250px", px: "1rem" },
                    React.createElement(Box, { maxW: "100%", h: "100vh" },
                        React.createElement(Box, null, brand),
                        React.createElement(Stack, { direction: "column", mb: "40px" },
                            React.createElement(Box, null, links)),
                        React.createElement(SidebarHelp, null)))))));
}
export default Sidebar;
