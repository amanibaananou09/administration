import React from "react";
import { Tr, Td, Flex, Text, Progress, Icon, Button, useColorModeValue, } from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
function DashboardTableRow(props) {
    const { logo, name, status, budget, progression, isLast } = props;
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    return (React.createElement(Tr, null,
        React.createElement(Td, { minWidth: { sm: "250px" }, pl: "0px", borderColor: borderColor, borderBottom: isLast ? "none" : null },
            React.createElement(Flex, { alignItems: "center", py: ".8rem", minWidth: "100%", flexWrap: "nowrap" },
                React.createElement(Icon, { as: logo, h: "24px", w: "24px", me: "18px" }),
                React.createElement(Text, { fontSize: "md", color: titleColor, fontWeight: "bold", minWidth: "100%" }, name))),
        React.createElement(Td, { borderBottom: isLast ? "none" : null, borderColor: borderColor },
            React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold", pb: ".5rem" }, budget)),
        React.createElement(Td, { borderBottom: isLast ? "none" : null, borderColor: borderColor },
            React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold", pb: ".5rem" }, status)),
        React.createElement(Td, { borderBottom: isLast ? "none" : null, borderColor: borderColor },
            React.createElement(Flex, { direction: "column" },
                React.createElement(Text, { fontSize: "md", color: "blue.500", fontWeight: "bold", pb: ".2rem" }, `${progression}%`),
                React.createElement(Progress, { colorScheme: "blue", size: "xs", value: progression, borderRadius: "15px" }))),
        React.createElement(Td, { borderBottom: isLast ? "none" : null, borderColor: borderColor },
            React.createElement(Button, { p: "0px", bg: "transparent", variant: "no-effects" },
                React.createElement(Icon, { as: FaEllipsisV, color: "gray.400", cursor: "pointer" })))));
}
export default DashboardTableRow;
