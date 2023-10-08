import { Box, Button, Flex, Icon, Text, useColorModeValue, } from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
function BillingRow(props) {
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("#F8F9FA", "navy.900");
    const nameColor = useColorModeValue("gray.500", "white");
    const { name, company, email, number } = props;
    return (React.createElement(Box, { p: "24px", bg: bgColor, my: "22px", borderRadius: "12px" },
        React.createElement(Flex, { justify: "space-between", w: "100%" },
            React.createElement(Flex, { direction: "column", maxWidth: "70%" },
                React.createElement(Text, { color: nameColor, fontSize: "md", fontWeight: "bold", mb: "10px" }, name),
                React.createElement(Text, { color: "gray.400", fontSize: "sm", fontWeight: "semibold" },
                    "Company Name:",
                    " ",
                    React.createElement(Text, { as: "span", color: nameColor }, company)),
                React.createElement(Text, { color: "gray.400", fontSize: "sm", fontWeight: "semibold" },
                    "Email Address:",
                    " ",
                    React.createElement(Text, { as: "span", color: nameColor }, email)),
                React.createElement(Text, { color: "gray.400", fontSize: "sm", fontWeight: "semibold" },
                    "VAT Number:",
                    " ",
                    React.createElement(Text, { as: "span", color: nameColor }, number))),
            React.createElement(Flex, { direction: { sm: "column", md: "row" }, align: "flex-start", p: { md: "24px" } },
                React.createElement(Button, { p: "0px", bg: "transparent", variant: "no-effects", mb: { sm: "10px", md: "0px" }, me: { md: "12px" } },
                    React.createElement(Flex, { color: "red.500", cursor: "pointer", align: "center", p: "12px" },
                        React.createElement(Icon, { as: FaTrashAlt, me: "4px" }),
                        React.createElement(Text, { fontSize: "sm", fontWeight: "semibold" }, "DELETE"))),
                React.createElement(Button, { p: "0px", bg: "transparent", variant: "no-effects" },
                    React.createElement(Flex, { color: textColor, cursor: "pointer", align: "center", p: "12px" },
                        React.createElement(Icon, { as: FaPencilAlt, me: "4px" }),
                        React.createElement(Text, { fontSize: "sm", fontWeight: "semibold" }, "EDIT")))))));
}
export default BillingRow;
