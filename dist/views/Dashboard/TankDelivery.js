// Chakra imports
import { Flex, Skeleton, Stack, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue, ButtonGroup, Button, } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TankDeliveryRow from "components/Tables/TankDeliveryRow";
import React, { useState, useEffect } from "react";
import { useAuth } from "store/AuthContext";
import { getAllTankDelivery } from "common/api.js";
import { useESSContext } from "store/ESSContext";
function TankDelivery() {
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const [tankdelivery, setTankDelivery] = useState([]);
    const { user } = useAuth();
    const [tankDeliveryList, setTankDeliveryList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const { selectedStation: { controllerId }, } = useESSContext();
    useEffect(() => {
        const { token } = user;
        const allTankDelivery = async (page) => {
            try {
                const result = await getAllTankDelivery(currentPage, controllerId, token);
                const { content, totalPages, totalElements } = result; // Assuming the API response structure
                setTotalElements(totalElements);
                setTankDelivery(content);
                setTotalPages(totalPages);
            }
            catch (error) {
                console.error(error);
            }
        };
        allTankDelivery();
    }, [currentPage, controllerId, user]);
    console.log("current", currentPage);
    console.log("total", totalPages);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    console.log("total element ", totalElements);
    return (React.createElement(Flex, { direction: "column", pt: { base: "120px", md: "75px" } },
        React.createElement(Card, { overflowX: { sm: "scroll", xl: "hidden" }, pb: "0px" },
            React.createElement(CardHeader, { p: "6px 0px 22px 0px" },
                React.createElement(Text, { fontSize: "xl", color: textColor, fontWeight: "bold" }, "Tank Delivery")),
            React.createElement(CardBody, null,
                React.createElement(Table, { variant: "simple", color: textColor, size: "sm", textAlign: "center" },
                    React.createElement(Thead, null,
                        React.createElement(Tr, { color: "gray.400" },
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "tank"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "product Volume"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "fuel Grade"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "product Height"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "water Height"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "temperature"))),
                    React.createElement(Tbody, null, tankdelivery.map((row, key) => {
                        return (React.createElement(TankDeliveryRow, { tank: row.tank, fuelGradeName: row.fuelGradeName, productHeight: row.productHeight, waterHeight: row.waterHeight, temperature: row.temperature, productVolume: row.productVolume, key: key }));
                    }))),
                tankdelivery.length === 0 && (React.createElement(Stack, { width: "100%", margin: "20px 0px" },
                    React.createElement(Skeleton, { height: "50px", borderRadius: "10px" }),
                    React.createElement(Skeleton, { height: "50px", borderRadius: "10px" }),
                    React.createElement(Skeleton, { height: "50px", borderRadius: "10px" }),
                    React.createElement(Skeleton, { height: "50px", borderRadius: "10px" }),
                    React.createElement(Skeleton, { height: "50px", borderRadius: "10px" }))))),
        React.createElement(ButtonGroup, { mt: 4, spacing: 4 },
            React.createElement(Button, { isDisabled: currentPage === 0, onClick: () => handlePageChange(currentPage - 1) }, "Previous"),
            React.createElement(Button, null, currentPage + 1),
            React.createElement(Button, { isDisabled: currentPage === totalPages - 1, onClick: () => handlePageChange(currentPage + 1) }, "Next"))));
}
export default TankDelivery;
