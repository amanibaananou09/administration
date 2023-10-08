import { Flex, Td, Text, Tr, useColorModeValue, } from "@chakra-ui/react";
import React from "react";
function TankDeliveryRow(props) {
    const { tank, fuelGradeName, productHeight, waterHeight, temperature, productVolume, } = props;
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    return (React.createElement(Tr, null,
        React.createElement(Td, { minWidth: { sm: "50px" }, pl: "45px", borderColor: borderColor },
            React.createElement(Flex, { py: ".8rem", minWidth: "100%", flexWrap: "nowrap" },
                React.createElement(Flex, { direction: "column" },
                    React.createElement(Text, { fontSize: "sm", color: titleColor, fontWeight: "bold", minWidth: "100%", align: "center" }, tank)))),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Text, { fontSize: "sm", align: "center", color: textColor, fontWeight: "bold", pb: ".5rem" }, productVolume)),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Flex, { direction: "column" },
                React.createElement(Text, { fontSize: "sm", align: "center", color: textColor, fontWeight: "bold" }, fuelGradeName))),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Flex, { direction: "column" },
                React.createElement(Text, { fontSize: "sm", align: "center", color: textColor, fontWeight: "bold" }, productHeight))),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Text, { fontSize: "sm", align: "center", color: textColor, fontWeight: "bold", pb: ".5rem" }, waterHeight)),
        React.createElement(Td, { borderColor: borderColor },
            React.createElement(Text, { fontSize: "sm", align: "center", color: textColor, fontWeight: "bold", pb: ".5rem" }, temperature))));
}
export default TankDeliveryRow;
