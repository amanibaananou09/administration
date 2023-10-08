import React from "react";
import { Flex } from "@chakra-ui/react";
export default function IconBox(props) {
    const { children, ...rest } = props;
    return (React.createElement(Flex, Object.assign({ alignItems: "center", justifyContent: "center", borderRadius: "8px" }, rest), children));
}
