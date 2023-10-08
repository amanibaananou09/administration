import { Avatar, AvatarGroup, Flex, Icon, Progress, Td, Text, Tr, useColorModeValue, } from "@chakra-ui/react";
import React from "react";
function DashboardTableRow(props) {
    const { logo, name, members, budget, progression } = props;
    const textColor = useColorModeValue("gray.700", "white");
    return (React.createElement(Tr, null,
        React.createElement(Td, { minWidth: { sm: "250px" }, pl: "0px" },
            React.createElement(Flex, { align: "center", py: ".8rem", minWidth: "100%", flexWrap: "nowrap" },
                React.createElement(Icon, { as: logo, h: "24px", w: "24px", pe: "5px" }),
                React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold", minWidth: "100%" }, name))),
        React.createElement(Td, null,
            React.createElement(AvatarGroup, { size: "sm" }, members.map((member, idx) => {
                return (React.createElement(Avatar, { name: "Ryan Florence", src: member, key: idx, _hover: { zIndex: "3", cursor: "pointer" } }));
            }))),
        React.createElement(Td, null,
            React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold", pb: ".5rem" }, budget)),
        React.createElement(Td, null,
            React.createElement(Flex, { direction: "column" },
                React.createElement(Text, { fontSize: "md", color: "teal.300", fontWeight: "bold", pb: ".2rem" }, `${progression}%`),
                React.createElement(Progress, { colorScheme: progression === 100 ? "teal" : "cyan", size: "xs", value: progression, borderRadius: "15px" })))));
}
export default DashboardTableRow;
