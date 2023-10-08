import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
function TransactionRow(props) {
    const textColor = useColorModeValue("gray.700", "white");
    const { name, date, logo, price } = props;
    return (React.createElement(Flex, { my: "1rem", justifyContent: "space-between" },
        React.createElement(Flex, { alignItems: "center" },
            React.createElement(Box, { me: "12px", borderRadius: "50%", color: price[0] === "+"
                    ? "green.400"
                    : price[0] === "-"
                        ? "red.400"
                        : "gray.400", border: "1px solid", display: "flex", alignItems: "center", justifyContent: "center", w: "35px", h: "35px" },
                React.createElement(Icon, { as: logo })),
            React.createElement(Flex, { direction: "column" },
                React.createElement(Text, { fontSize: { sm: "md", md: "lg", lg: "md" }, color: textColor, fontWeight: "bold" }, name),
                React.createElement(Text, { fontSize: { sm: "xs", md: "sm", lg: "xs" }, color: "gray.400", fontWeight: "semibold" }, date))),
        React.createElement(Box, { color: price[0] === "+"
                ? "green.400"
                : price[0] === "-"
                    ? "red.400"
                    : { textColor } },
            React.createElement(Text, { fontSize: { sm: "md", md: "lg", lg: "md" }, fontWeight: "bold" }, price))));
}
export default TransactionRow;
