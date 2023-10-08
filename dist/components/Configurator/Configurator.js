// Chakra Imports
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, Flex, Switch, Text, useColorMode, useColorModeValue, } from "@chakra-ui/react";
import { HSeparator } from "components/Separator/Separator";
import React, { useState } from "react";
import StationConfigurator from "./StationConfigurator";
export default function Configurator(props) {
    const [switched, setSwitched] = useState(props.isChecked);
    const { colorMode, toggleColorMode } = useColorMode();
    const bgDrawer = useColorModeValue("white", "navy.800");
    const settingsRef = React.useRef();
    return (React.createElement(React.Fragment, null,
        React.createElement(Drawer, { isOpen: props.isOpen, onClose: props.onClose, placement: "right", finalFocusRef: settingsRef, blockScrollOnMount: false },
            React.createElement(DrawerContent, { bg: bgDrawer },
                React.createElement(DrawerHeader, { pt: "24px", px: "24px" },
                    React.createElement(DrawerCloseButton, null),
                    React.createElement(Text, { fontSize: "xl", fontWeight: "bold", mt: "16px" }, "Configurator"),
                    React.createElement(Text, { fontSize: "md", mb: "16px" }, "See your dashboard options."),
                    React.createElement(HSeparator, null)),
                React.createElement(DrawerBody, { w: "340px", ps: "24px", pe: "40px" },
                    React.createElement(Flex, { flexDirection: "column" },
                        React.createElement(Flex, { justifyContent: "space-between ", mb: "16px" },
                            React.createElement(Text, { fontSize: "md", fontWeight: "600", mb: "4px" }, "Navbar Fixed"),
                            React.createElement(Switch, { colorScheme: "blue", isChecked: switched, onChange: () => {
                                    if (switched === true) {
                                        props.onSwitch(false);
                                        setSwitched(false);
                                    }
                                    else {
                                        props.onSwitch(true);
                                        setSwitched(true);
                                    }
                                } })),
                        React.createElement(Flex, { justifyContent: "space-between", alignItems: "center", mb: "24px" },
                            React.createElement(Text, { fontSize: "md", fontWeight: "600", mb: "4px" }, "Dark/Light"),
                            React.createElement(Button, { onClick: toggleColorMode, color: colorMode === "light" ? "Dark" : "Light" },
                                "Toggle ",
                                colorMode === "light" ? "Dark" : "Light")),
                        React.createElement(HSeparator, null),
                        React.createElement(StationConfigurator, null)))))));
}
