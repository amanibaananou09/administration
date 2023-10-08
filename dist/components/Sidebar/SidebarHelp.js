import { Stack, useColorMode, useColorModeValue, } from "@chakra-ui/react";
import React from "react";
export function SidebarHelp(props) {
    // Pass the computed styles into the `__css` prop
    const { children, sidebarVariant, ...rest } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const { colorMode } = useColorMode();
    return (React.createElement(Stack, { justify: "center", direction: "column", align: "center", spacing: "20px", mb: "22px", mt: "auto", mx: "20px" }));
}
