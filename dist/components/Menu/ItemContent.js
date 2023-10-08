// chakra imports
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { ClockIcon } from "components/Icons/Icons";
import React from "react";
export function ItemContent(props) {
    const navbarIcon = useColorModeValue("gray.500", "gray.200");
    const notificationColor = useColorModeValue("gray.700", "white");
    const spacing = " ";
    return (React.createElement(React.Fragment, null,
        React.createElement(Avatar, { name: props.aName, src: props.aSrc, borderRadius: "12px", me: "16px" }),
        React.createElement(Flex, { flexDirection: "column" },
            React.createElement(Text, { fontSize: "14px", mb: "5px", color: notificationColor },
                React.createElement(Text, { fontWeight: "bold", fontSize: "14px", as: "span" },
                    props.boldInfo,
                    spacing),
                props.info),
            React.createElement(Flex, { alignItems: "center" },
                React.createElement(ClockIcon, { color: navbarIcon, w: "13px", h: "13px", me: "3px" }),
                React.createElement(Text, { fontSize: "xs", lineHeight: "100%", color: navbarIcon }, props.time)))));
}
