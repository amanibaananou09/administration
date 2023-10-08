import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
function TimelineRow(props) {
    const { logo, title, date, color, index, arrLength } = props;
    const textColor = useColorModeValue("gray.700", "white.300");
    const bgIconColor = useColorModeValue("white.300", "gray.700");
    return (React.createElement(Flex, { alignItems: "center", minH: "78px", justifyContent: "start", mb: "5px" },
        React.createElement(Flex, { direction: "column", h: "100%" },
            React.createElement(Icon, { as: logo, bg: bgIconColor, color: color, h: "30px", w: "26px", pe: "6px", zIndex: "1", position: "relative", right: "", left: "-8px" }),
            React.createElement(Box, { w: "2px", bg: "gray.200", h: index === arrLength - 1 ? "15px" : "100%" })),
        React.createElement(Flex, { direction: "column", justifyContent: "flex-start", h: "100%" },
            React.createElement(Text, { fontSize: "sm", color: textColor, fontWeight: "bold" }, title),
            React.createElement(Text, { fontSize: "sm", color: "gray.400", fontWeight: "normal" }, date))));
}
export default TimelineRow;
