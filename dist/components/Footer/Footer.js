/*eslint-disable*/
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
export default function Footer(props) {
    return (React.createElement(Flex, { flexDirection: {
            base: "column",
            xl: "row",
        }, alignItems: {
            base: "center",
            xl: "start",
        }, justifyContent: "space-between", px: "30px", pb: "20px" },
        React.createElement(Text, { color: "gray.400", textAlign: {
                base: "center",
                xl: "start",
            }, mb: { base: "20px", xl: "0px" } })));
}
