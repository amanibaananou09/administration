import { Box, Button, Flex, Icon, Text, useColorModeValue, } from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
const StationRow = ({ id, name, address, controllerId, controllerPtsId, firmwareVersion, onEdit, onDelete, }) => {
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("#F8F9FA", "navy.900");
    const nameColor = useColorModeValue("gray.500", "white");
    return (React.createElement(Box, { p: "24px", bg: bgColor, my: "22px", borderRadius: "12px" },
        React.createElement(Flex, { justify: "space-between", w: "100%" },
            React.createElement(Flex, { direction: "column", maxWidth: "70%" },
                React.createElement(Text, { color: nameColor, fontSize: "md", fontWeight: "bold", mb: "10px" }, name),
                React.createElement(Text, { color: "gray.400", fontSize: "sm", fontWeight: "semibold" },
                    "Address:",
                    " ",
                    React.createElement(Text, { as: "span", color: nameColor }, address)),
                React.createElement(Text, { color: "gray.400", fontSize: "sm", fontWeight: "semibold" },
                    "Controller Pts Id:",
                    " ",
                    React.createElement(Text, { as: "span", color: nameColor }, controllerPtsId)),
                React.createElement(Text, { color: "gray.400", fontSize: "sm", fontWeight: "semibold" },
                    "Firmware version:",
                    " ",
                    React.createElement(Text, { as: "span", color: nameColor }, firmwareVersion))),
            React.createElement(Flex, { direction: { sm: "column", md: "row" }, align: "flex-start", p: { md: "24px" } },
                React.createElement(Button, { p: "0px", bg: "transparent", variant: "no-effects", mb: { sm: "10px", md: "0px" }, me: { md: "12px" }, onClick: () => onDelete() },
                    React.createElement(Flex, { color: "red.500", cursor: "pointer", align: "center", p: "12px" },
                        React.createElement(Icon, { as: FaTrashAlt, me: "4px" }),
                        React.createElement(Text, { fontSize: "sm", fontWeight: "semibold" }, "DELETE"))),
                React.createElement(Button, { p: "0px", bg: "transparent", variant: "no-effects", onClick: onEdit },
                    React.createElement(Flex, { color: textColor, cursor: "pointer", align: "center", p: "12px" },
                        React.createElement(Icon, { as: FaPencilAlt, me: "4px" }),
                        React.createElement(Text, { fontSize: "sm", fontWeight: "semibold" }, "EDIT")))))));
};
export default StationRow;
