import { Avatar, Badge, Button, Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import React from "react";
function TablesTableRow(props) {
    const { logo, name, email, subdomain, domain, status, date, isLast } = props;
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    return (React.createElement(Tr, null,
        React.createElement(Td, { minWidth: { sm: "250px" }, pl: "0px", borderColor: borderColor, borderBottom: isLast ? "none" : null },
            React.createElement(Flex, { align: "center", py: ".8rem", minWidth: "100%", flexWrap: "nowrap" },
                React.createElement(Avatar, { src: logo, w: "50px", borderRadius: "12px", me: "18px" }),
                React.createElement(Flex, { direction: "column" },
                    React.createElement(Text, { fontSize: "md", color: titleColor, fontWeight: "bold", minWidth: "100%" }, name),
                    React.createElement(Text, { fontSize: "sm", color: "gray.400", fontWeight: "normal" }, email)))),
        React.createElement(Td, { borderColor: borderColor, borderBottom: isLast ? "none" : null },
            React.createElement(Flex, { direction: "column" },
                React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold" }, domain),
                React.createElement(Text, { fontSize: "sm", color: "gray.400", fontWeight: "normal" }, subdomain))),
        React.createElement(Td, { borderColor: borderColor, borderBottom: isLast ? "none" : null },
            React.createElement(Badge, { bg: status === "Online" ? "green.400" : bgStatus, color: status === "Online" ? "white" : "white", fontSize: "16px", p: "3px 10px", borderRadius: "8px" }, status)),
        React.createElement(Td, { borderColor: borderColor, borderBottom: isLast ? "none" : null },
            React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold", pb: ".5rem" }, date)),
        React.createElement(Td, { borderColor: borderColor, borderBottom: isLast ? "none" : null },
            React.createElement(Button, { p: "0px", bg: "transparent", variant: "no-effects" },
                React.createElement(Text, { fontSize: "md", color: "gray.400", fontWeight: "bold", cursor: "pointer" }, "Edit")))));
}
export default TablesTableRow;
