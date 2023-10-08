// Chakra imports
import { Box, Flex, Grid, SimpleGrid, Stat, StatLabel, StatNumber, Text, useColorMode, useColorModeValue, } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import ReportSalesChart from "components/Charts/ReportSalesChart";
import TankLevelChart from "components/Charts/TankLevelChart";
import TankSalesChart from "components/Charts/TankSalesChart";
import UserSalesChart from "components/Charts/UserSalesChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import { CartIcon, DocumentIcon, GlobeIcon, WalletIcon, } from "components/Icons/Icons.js";
import React from "react";
import { useESSContext } from "store/ESSContext";
export default function Dashboard() {
    const context = useESSContext();
    // Chakra Color Mode
    const iconBlue = useColorModeValue("blue.500", "blue.500");
    const iconBoxInside = useColorModeValue("white", "white");
    const textColor = useColorModeValue("gray.700", "white");
    const { colorMode } = useColorMode();
    if (!context.selectedStation) {
        return React.createElement("div", null, "No Station");
    }
    return (React.createElement(Flex, { flexDirection: "column", pt: { base: "120px", md: "75px" } },
        React.createElement(SimpleGrid, { columns: { sm: 1, md: 2, xl: 4 }, spacing: "24px", mb: "20px" },
            React.createElement(Card, { minH: "125px" },
                React.createElement(Flex, { direction: "column" },
                    React.createElement(Flex, { flexDirection: "row", align: "center", justify: "center", w: "100%", mb: "25px" },
                        React.createElement(Stat, { me: "auto" },
                            React.createElement(StatLabel, { fontSize: "xs", color: "gray.400", fontWeight: "bold", textTransform: "uppercase" }, "Today's Money"),
                            React.createElement(Flex, null,
                                React.createElement(StatNumber, { fontSize: "lg", color: textColor, fontWeight: "bold" }, "$53,897"))),
                        React.createElement(IconBox, { borderRadius: "50%", h: "45px", w: "45px", bg: iconBlue },
                            React.createElement(WalletIcon, { h: "24px", w: "24px", color: iconBoxInside }))),
                    React.createElement(Text, { color: "gray.400", fontSize: "sm" },
                        React.createElement(Text, { as: "span", color: "green.400", fontWeight: "bold" },
                            "+3.48%",
                            " "),
                        "Since last month"))),
            React.createElement(Card, { minH: "125px" },
                React.createElement(Flex, { direction: "column" },
                    React.createElement(Flex, { flexDirection: "row", align: "center", justify: "center", w: "100%", mb: "25px" },
                        React.createElement(Stat, { me: "auto" },
                            React.createElement(StatLabel, { fontSize: "xs", color: "gray.400", fontWeight: "bold", textTransform: "uppercase" }, "Today's Users"),
                            React.createElement(Flex, null,
                                React.createElement(StatNumber, { fontSize: "lg", color: textColor, fontWeight: "bold" }, "$3,200"))),
                        React.createElement(IconBox, { borderRadius: "50%", h: "45px", w: "45px", bg: iconBlue },
                            React.createElement(GlobeIcon, { h: "24px", w: "24px", color: iconBoxInside }))),
                    React.createElement(Text, { color: "gray.400", fontSize: "sm" },
                        React.createElement(Text, { as: "span", color: "green.400", fontWeight: "bold" },
                            "+5.2%",
                            " "),
                        "Since last month"))),
            React.createElement(Card, { minH: "125px" },
                React.createElement(Flex, { direction: "column" },
                    React.createElement(Flex, { flexDirection: "row", align: "center", justify: "center", w: "100%", mb: "25px" },
                        React.createElement(Stat, { me: "auto" },
                            React.createElement(StatLabel, { fontSize: "xs", color: "gray.400", fontWeight: "bold", textTransform: "uppercase" }, "New Clients"),
                            React.createElement(Flex, null,
                                React.createElement(StatNumber, { fontSize: "lg", color: textColor, fontWeight: "bold" }, "+2,503"))),
                        React.createElement(IconBox, { borderRadius: "50%", h: "45px", w: "45px", bg: iconBlue },
                            React.createElement(DocumentIcon, { h: "24px", w: "24px", color: iconBoxInside }))),
                    React.createElement(Text, { color: "gray.400", fontSize: "sm" },
                        React.createElement(Text, { as: "span", color: "red.500", fontWeight: "bold" },
                            "-2.82%",
                            " "),
                        "Since last month"))),
            React.createElement(Card, { minH: "125px" },
                React.createElement(Flex, { direction: "column" },
                    React.createElement(Flex, { flexDirection: "row", align: "center", justify: "center", w: "100%", mb: "25px" },
                        React.createElement(Stat, { me: "auto" },
                            React.createElement(StatLabel, { fontSize: "xs", color: "gray.400", fontWeight: "bold", textTransform: "uppercase" }, "Total Sales"),
                            React.createElement(Flex, null,
                                React.createElement(StatNumber, { fontSize: "lg", color: textColor, fontWeight: "bold" }, "$173,000"))),
                        React.createElement(IconBox, { borderRadius: "50%", h: "45px", w: "45px", bg: iconBlue },
                            React.createElement(CartIcon, { h: "24px", w: "24px", color: iconBoxInside }))),
                    React.createElement(Text, { color: "gray.400", fontSize: "sm" },
                        React.createElement(Text, { as: "span", color: "green.400", fontWeight: "bold" },
                            "+8.12%",
                            " "),
                        "Since last month")))),
        React.createElement(Grid, { templateColumns: { sm: "1fr", lg: "2fr 1fr" }, templateRows: { lg: "repeat(2, auto)" }, gap: "20px" },
            React.createElement(Card, { bg: colorMode === "dark"
                    ? "navy.800"
                    : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)", p: "0px", maxW: { sm: "320px", md: "100%" } },
                React.createElement(Flex, { direction: "column", mb: "-32px", p: "28px 0px 0px 22px", marginLeft: "30%" },
                    React.createElement(Text, { color: "#fff", fontSize: "lg", fontWeight: "bold", mb: "6px" }, "Month Wise Sales Report")),
                React.createElement(Box, { minH: "300px" },
                    React.createElement(ReportSalesChart, null))),
            React.createElement(Card, { p: "0px", maxW: { sm: "320px", md: "100%" } },
                React.createElement(Flex, { direction: "column", mb: "-10px", p: "28px 0px 0px 22px" },
                    React.createElement(Text, { color: textColor, fontSize: "lg", fontWeight: "bold" }, "Users Sales")),
                React.createElement(Box, { minH: "300px" },
                    React.createElement(UserSalesChart, null)))),
        React.createElement(Grid, { templateColumns: { sm: "1fr", lg: "1fr 1fr" }, templateRows: { lg: "repeat(2, auto)" }, gap: "20px" },
            React.createElement(Card, { p: "0px", maxW: { sm: "320px", md: "100%" } },
                React.createElement(Flex, { direction: "column", mb: "-33px", p: "28px 0px 0px 22px" },
                    React.createElement(Text, { color: textColor, fontSize: "lg", fontWeight: "bold", mb: "6px", marginLeft: "10%" }, "Tank Level")),
                React.createElement(Box, { minH: "300px" },
                    React.createElement(TankLevelChart, null))),
            React.createElement(Card, { p: "0px", maxW: { sm: "320px", md: "100%" } },
                React.createElement(Flex, { direction: "column", mb: "-33px", p: "28px 0px 0px 22px" },
                    React.createElement(Text, { color: textColor, fontSize: "lg", fontWeight: "bold", mb: "6px", marginLeft: "10%" }, "Sales")),
                React.createElement(Box, { minH: "300px" },
                    React.createElement(TankSalesChart, null))))));
}
