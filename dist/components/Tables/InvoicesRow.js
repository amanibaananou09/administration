import { Box, Button, Flex, Icon, Spacer, Text, useColorModeValue, } from "@chakra-ui/react";
import React from "react";
function InvoicesRow(props) {
    const textColor = useColorModeValue("gray.700", "white");
    const { date, code, price, format, logo } = props;
    return (React.createElement(Flex, { my: { sm: "1rem", xl: "10px" }, alignItems: "center" },
        React.createElement(Flex, { direction: "column" },
            React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold" }, date),
            React.createElement(Text, { fontSize: "sm", color: "gray.400", fontWeight: "semibold", me: "16px" }, code)),
        React.createElement(Spacer, null),
        React.createElement(Box, { me: "12px" },
            React.createElement(Text, { fontSize: "md", color: "gray.400", fontWeight: "semibold" }, price)),
        React.createElement(Button, { p: "0px", bg: "transparent", variant: "no-effects" },
            React.createElement(Flex, { alignItems: "center", p: "12px" },
                React.createElement(Icon, { as: logo, w: "20px", h: "auto", me: "5px", color: textColor }),
                React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold" }, format)))));
}
export default InvoicesRow;
