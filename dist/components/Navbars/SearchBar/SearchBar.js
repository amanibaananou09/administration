import React from "react";
import { IconButton, Input, InputGroup, InputLeftElement, useColorModeValue, } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export function SearchBar(props) {
    // Pass the computed styles into the `__css` prop
    const { variant, children, ...rest } = props;
    // Chakra Color Mode
    const searchIconColor = useColorModeValue("gray.700", "gray.200");
    const inputBg = useColorModeValue("white", "navy.800");
    return (React.createElement(InputGroup, Object.assign({ borderRadius: "8px", w: "200px" }, rest),
        React.createElement(InputLeftElement, { children: React.createElement(IconButton, { bg: "inherit", borderRadius: "inherit", _hover: "none", _active: {
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                }, _focus: {
                    boxShadow: "none",
                }, icon: React.createElement(SearchIcon, { color: searchIconColor, w: "15px", h: "15px" }) }) }),
        React.createElement(Input, { variant: "search", fontSize: "xs", bg: inputBg, placeholder: "Type here..." })));
}
