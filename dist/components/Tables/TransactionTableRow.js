import { Badge, Button, Flex, Td, Text, Tr, useColorModeValue, } from "@chakra-ui/react";
import React from "react";
function formatDate(dateTime) {
    return new Date(dateTime).toLocaleString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}
function TablesTableRow(props) {
    const { id, pump, fuelGrade, state, volume, price, amount, DateTimeStart, DateTime, } = props;
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const formattedDateTime = formatDate(DateTime);
    const formattedDateTimeStart = formatDate(DateTimeStart);
    return (React.createElement(Tr, null,
        React.createElement(Td, { minWidth: { sm: "50px" }, pl: "15px", borderColor: borderColor },
            React.createElement(Flex, { py: ".8rem", minWidth: "100%", flexWrap: "nowrap" },
                React.createElement(Flex, { direction: "column" },
                    React.createElement(Text, { fontSize: "sm", color: titleColor, fontWeight: "bold", minWidth: "100%", align: "center" }, id)))),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Flex, { direction: "column" },
                React.createElement(Text, { fontSize: "sm", align: "center", color: textColor, fontWeight: "bold" }, pump))),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Button, { p: "0px", bg: "transparent", variant: "no-effects" },
                React.createElement(Text, { fontSize: "sm", align: "center", color: textColor, fontWeight: "bold" }, fuelGrade))),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Text, { fontSize: "sm", align: "center", color: textColor, fontWeight: "bold", pb: ".5rem" }, volume)),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Text, { fontSize: "sm", align: "center", color: textColor, fontWeight: "bold", pb: ".5rem" }, price)),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Text, { fontSize: "sm", align: "center", color: textColor, fontWeight: "bold", pb: ".5rem" }, amount)),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Text, { fontSize: "sm", align: "center", color: titleColor, fontWeight: "bold", pb: ".5rem" }, formattedDateTimeStart)),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Text, { fontSize: "sm", align: "center", color: titleColor, fontWeight: "bold", pb: ".5rem" }, formattedDateTime)),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Badge, { bg: state === "Online" ? "green.400" : bgStatus, color: state === "Online" ? "white" : "white", fontSize: "16px", p: "3px 10px", borderRadius: "8px" }, state))));
}
export default TablesTableRow;
