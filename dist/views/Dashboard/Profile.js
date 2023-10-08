// Chakra imports
import { Avatar, Flex, Grid, Text, useColorModeValue, } from "@chakra-ui/react";
// Assets
import { useESSContext } from "store/ESSContext";
import avatar5 from "assets/img/avatars/avatar5.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
function Profile() {
    const { selectedStation } = useESSContext();
    // Chakra color mode
    const textColor = useColorModeValue("gray.700", "white");
    const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
    const borderProfileColor = useColorModeValue("white", "transparent");
    const emailColor = useColorModeValue("gray.400", "gray.300");
    return (React.createElement(Flex, { direction: "column", pt: { base: "120px", md: "75px", lg: "100px" } },
        React.createElement(Flex, { direction: { sm: "column", md: "row" }, mb: "24px", maxH: "330px", justifyContent: { sm: "center", md: "space-between" }, align: "center", backdropFilter: "blur(21px)", boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.02)", border: "1.5px solid", borderColor: borderProfileColor, bg: bgProfile, p: "24px", borderRadius: "20px" },
            React.createElement(Flex, { align: "center", mb: { sm: "10px", md: "0px" }, direction: { sm: "column", md: "row" }, w: { sm: "100%" }, textAlign: { sm: "center", md: "start" } },
                React.createElement(Avatar, { me: { md: "22px" }, src: avatar5, w: "80px", h: "80px", borderRadius: "15px" }),
                React.createElement(Flex, { direction: "column", maxWidth: "100%", my: { sm: "14px" } },
                    React.createElement(Text, { fontSize: { sm: "lg", lg: "xl" }, color: textColor, fontWeight: "bold", ms: { sm: "8px", md: "0px" } }, selectedStation.userLogin),
                    React.createElement(Text, { fontSize: { sm: "sm", md: "md" }, color: emailColor, fontWeight: "semibold" }, selectedStation.user.email))),
            React.createElement(Flex, { direction: { sm: "column", lg: "row" }, w: { sm: "100%", md: "50%", lg: "auto" } })),
        React.createElement(Grid, { pt: { base: "10px", md: "75px", lg: "30px" }, gap: "22px", justifyContent: "center", alignItems: "center" },
            React.createElement(Card, { p: "16px", my: { sm: "24px", xl: "0px" } },
                React.createElement(CardHeader, { p: "12px 5px", mb: "12px" },
                    React.createElement(Text, { fontSize: "lg", color: textColor, fontWeight: "bold" }, "Profile Information")),
                React.createElement(CardBody, { px: "5px" },
                    React.createElement(Flex, { direction: "column" },
                        React.createElement(Flex, { align: "center", mb: "18px" },
                            React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold", me: "10px" },
                                "first Name:",
                                " "),
                            React.createElement(Text, { fontSize: "md", color: "gray.400", fontWeight: "400" }, selectedStation.user.firstName)),
                        React.createElement(Flex, { align: "center", mb: "18px" },
                            React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold", me: "10px" },
                                "last Name:",
                                " "),
                            React.createElement(Text, { fontSize: "md", color: "gray.400", fontWeight: "400" }, selectedStation.user.lastName)),
                        React.createElement(Flex, { align: "center", mb: "18px" },
                            React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold", me: "10px" },
                                "Email:",
                                " "),
                            React.createElement(Text, { fontSize: "md", color: "gray.400", fontWeight: "400" }, selectedStation.user.email)),
                        React.createElement(Flex, { align: "center", mb: "18px" },
                            React.createElement(Text, { fontSize: "md", color: textColor, fontWeight: "bold", me: "10px" },
                                "Location:",
                                " "),
                            React.createElement(Text, { fontSize: "md", color: "gray.400", fontWeight: "400" }, selectedStation.address))))))));
}
export default Profile;
