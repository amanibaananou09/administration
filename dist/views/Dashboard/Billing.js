// Chakra imports
import { Box, Button, Flex, Grid, Icon, Spacer, Text, useColorMode, useColorModeValue, } from "@chakra-ui/react";
// Assets
import BackgroundCard1 from "assets/img/BackgroundCard1.png";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import { MastercardIcon, VisaIcon } from "components/Icons/Icons";
import { HSeparator } from "components/Separator/Separator";
import BillingRow from "components/Tables/BillingRow";
import InvoicesRow from "components/Tables/InvoicesRow";
import TransactionRow from "components/Tables/TransactionRow";
import React from "react";
import { FaPaypal, FaPencilAlt, FaRegCalendarAlt, FaWallet, } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import { billingData, invoicesData, newestTransactions, olderTransactions, } from "variables/general";
function Billing() {
    // Chakra color mode
    const iconBlue = useColorModeValue("blue.500", "blue.500");
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("#dee2e6", "transparent");
    const { colorMode } = useColorMode();
    return (React.createElement(Flex, { direction: "column", pt: { base: "120px", md: "75px" } },
        React.createElement(Grid, { templateColumns: { sm: "1fr", lg: "2fr 1.2fr" }, templateRows: "1fr" },
            React.createElement(Box, null,
                React.createElement(Grid, { templateColumns: {
                        sm: "1fr",
                        md: "1fr 1fr",
                        xl: "1fr 1fr 1fr 1fr",
                    }, templateRows: { sm: "auto auto auto", md: "1fr auto", xl: "1fr" }, gap: "26px" },
                    React.createElement(Card, { backgroundImage: colorMode === "dark"
                            ? "linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
                            : BackgroundCard1, backgroundRepeat: "no-repeat", background: "cover", bgPosition: "10%", p: "16px", h: { sm: "220px", xl: "100%" }, gridArea: { md: "1 / 1 / 2 / 3", xl: "1 / 1 / 2 / 3" } },
                        React.createElement(CardBody, { h: "100%", w: "100%" },
                            React.createElement(Flex, { direction: "column", color: "white", h: "100%", p: "0px 10px 20px 10px", w: "100%" },
                                React.createElement(Flex, { justify: "space-between", align: "center" },
                                    React.createElement(Text, { fontSize: "md", fontWeight: "bold" }, "Argon x Chakra"),
                                    React.createElement(Icon, { as: RiMastercardFill, w: "48px", h: "auto", color: "gray.400" })),
                                React.createElement(Spacer, null),
                                React.createElement(Flex, { direction: "column" },
                                    React.createElement(Box, null,
                                        React.createElement(Text, { fontSize: "2xl", letterSpacing: "2px", fontWeight: "bold" }, "7812 2139 0823 XXXX")),
                                    React.createElement(Flex, { mt: "14px" },
                                        React.createElement(Flex, { direction: "column", me: "34px" },
                                            React.createElement(Text, { fontSize: "xs" }, "VALID THRU"),
                                            React.createElement(Text, { fontSize: "xs", fontWeight: "bold" }, "05/24")),
                                        React.createElement(Flex, { direction: "column" },
                                            React.createElement(Text, { fontSize: "xs" }, "CVV"),
                                            React.createElement(Text, { fontSize: "xs", fontWeight: "bold" }, "09X"))))))),
                    React.createElement(Card, { p: "16px", display: "flex", align: "center", justify: "center" },
                        React.createElement(CardBody, null,
                            React.createElement(Flex, { direction: "column", align: "center", w: "100%", py: "14px" },
                                React.createElement(IconBox, { as: "Box", h: "60px", w: "60px", bg: iconBlue },
                                    React.createElement(Icon, { h: "24px", w: "24px", color: "white", as: FaWallet })),
                                React.createElement(Flex, { direction: "column", m: "14px", justify: "center", textAlign: "center", align: "center", w: "100%" },
                                    React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold" }, "Salary"),
                                    React.createElement(Text, { mb: "24px", fontSize: "xs", color: "gray.400", fontWeight: "semibold" }, "Belong Interactive"),
                                    React.createElement(HSeparator, null)),
                                React.createElement(Text, { fontSize: "lg", color: textColor, fontWeight: "bold" }, "+$2000")))),
                    React.createElement(Card, { p: "16px", display: "flex", align: "center", justify: "center" },
                        React.createElement(CardBody, null,
                            React.createElement(Flex, { direction: "column", align: "center", justify: "center", w: "100%", py: "14px" },
                                React.createElement(IconBox, { as: "Box", h: "60px", w: "60px", bg: iconBlue },
                                    React.createElement(Icon, { h: "24px", w: "24px", color: "white", as: FaPaypal })),
                                React.createElement(Flex, { direction: "column", m: "14px", justify: "center", textAlign: "center", align: "center", w: "100%" },
                                    React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold" }, "Paypal"),
                                    React.createElement(Text, { mb: "24px", fontSize: "xs", color: "gray.400", fontWeight: "semibold" }, "Freelance Payment"),
                                    React.createElement(HSeparator, null)),
                                React.createElement(Text, { fontSize: "lg", color: textColor, fontWeight: "bold" }, "$455.00"))))),
                React.createElement(Card, { p: "16px", mt: "24px" },
                    React.createElement(CardHeader, null,
                        React.createElement(Flex, { justify: "space-between", align: "center", minHeight: "60px", w: "100%" },
                            React.createElement(Text, { fontSize: "lg", color: textColor, fontWeight: "bold" }, "Payment Method"),
                            React.createElement(Button, { variant: colorMode === "dark" ? "primary" : "dark" }, "ADD A NEW CARD"))),
                    React.createElement(CardBody, null,
                        React.createElement(Flex, { direction: { sm: "column", md: "row" }, align: "center", w: "100%", justify: "center", py: "1rem" },
                            React.createElement(Flex, { p: "1rem", bg: colorMode === "dark" ? "navy.900" : "transparent", borderRadius: "15px", width: "100%", border: "1px solid", borderColor: borderColor, align: "center", mb: { sm: "24px", md: "0px" }, me: { sm: "0px", md: "24px" } },
                                React.createElement(IconBox, { me: "10px", w: "25px", h: "22px" },
                                    React.createElement(MastercardIcon, { w: "100%", h: "100%" })),
                                React.createElement(Text, { color: "gray.400", fontSize: "md", fontWeight: "semibold" }, "7812 2139 0823 XXXX"),
                                React.createElement(Spacer, null),
                                React.createElement(Button, { p: "0px", w: "16px", h: "16px", variant: "no-effects" },
                                    React.createElement(Icon, { as: FaPencilAlt, color: colorMode === "dark" && "white" }))),
                            React.createElement(Flex, { p: "16px", bg: colorMode === "dark" ? "navy.900" : "transparent", borderRadius: "15px", width: "100%", border: "1px solid", borderColor: borderColor, align: "center" },
                                React.createElement(IconBox, { me: "10px", w: "25px", h: "25px" },
                                    React.createElement(VisaIcon, { w: "100%", h: "100%" })),
                                React.createElement(Text, { color: "gray.400", fontSize: "md", fontWeight: "semibold" }, "7812 2139 0823 XXXX"),
                                React.createElement(Spacer, null),
                                React.createElement(Button, { p: "0px", bg: "transparent", w: "16px", h: "16px", variant: "no-effects" },
                                    React.createElement(Icon, { as: FaPencilAlt, color: colorMode === "dark" && "white" }))))))),
            React.createElement(Card, { p: "22px", my: { sm: "24px", lg: "0px" }, ms: { sm: "0px", lg: "24px" } },
                React.createElement(CardHeader, null,
                    React.createElement(Flex, { justify: "space-between", align: "center", mb: "1rem", w: "100%" },
                        React.createElement(Text, { fontSize: "lg", color: textColor, fontWeight: "bold" }, "Invoices"),
                        React.createElement(Button, { variant: "outlined", color: colorMode === "dark" && "white", borderColor: colorMode === "dark" && "white", _hover: colorMode === "dark" && "none", minW: "110px", maxH: "35px" }, "VIEW ALL"))),
                React.createElement(CardBody, null,
                    React.createElement(Flex, { direction: "column", w: "100%" }, invoicesData.map((row, idx) => {
                        return (React.createElement(InvoicesRow, { date: row.date, code: row.code, price: row.price, logo: row.logo, format: row.format, key: idx }));
                    }))))),
        React.createElement(Grid, { templateColumns: { sm: "1fr", lg: "1.6fr 1.2fr" } },
            React.createElement(Card, { my: { lg: "24px" }, me: { lg: "24px" } },
                React.createElement(Flex, { direction: "column" },
                    React.createElement(CardHeader, { py: "12px" },
                        React.createElement(Text, { color: textColor, fontSize: "lg", fontWeight: "bold" }, "Billing Information")),
                    React.createElement(CardBody, null,
                        React.createElement(Flex, { direction: "column", w: "100%" }, billingData.map((row, key) => {
                            return (React.createElement(BillingRow, { name: row.name, company: row.company, email: row.email, number: row.number, key: key }));
                        }))))),
            React.createElement(Card, { my: "24px", ms: { lg: "24px" } },
                React.createElement(CardHeader, { mb: "12px" },
                    React.createElement(Flex, { direction: "column", w: "100%" },
                        React.createElement(Flex, { direction: { sm: "column", lg: "row" }, justify: { sm: "center", lg: "space-between" }, align: { sm: "center" }, w: "100%", my: { md: "12px" } },
                            React.createElement(Text, { color: textColor, fontSize: { sm: "lg", md: "xl", lg: "lg" }, fontWeight: "bold" }, "Your Transactions"),
                            React.createElement(Flex, { align: "center" },
                                React.createElement(Icon, { as: FaRegCalendarAlt, color: "gray.400", fontSize: "md", me: "6px" }),
                                React.createElement(Text, { color: "gray.400", fontSize: "sm", fontWeight: "semibold" }, "23 - 30 March 2022"))))),
                React.createElement(CardBody, null,
                    React.createElement(Flex, { direction: "column", w: "100%" },
                        React.createElement(Text, { color: "gray.400", fontSize: { sm: "sm", md: "md" }, fontWeight: "semibold", my: "12px" }, "NEWEST"),
                        newestTransactions.map((row, idx) => {
                            return (React.createElement(TransactionRow, { name: row.name, logo: row.logo, date: row.date, price: row.price, key: idx }));
                        }),
                        React.createElement(Text, { color: "gray.400", fontSize: { sm: "sm", md: "md" }, fontWeight: "semibold", my: "12px" }, "OLDER"),
                        olderTransactions.map((row, idx) => {
                            return (React.createElement(TransactionRow, { name: row.name, logo: row.logo, date: row.date, price: row.price, key: idx }));
                        })))))));
}
export default Billing;
