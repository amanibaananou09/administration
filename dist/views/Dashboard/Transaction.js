// Chakra imports
import { Flex, Skeleton, Stack, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue, ButtonGroup, Button, } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TransactionTableRow from "components/Tables/TransactionTableRow";
import React, { useState, useEffect } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { getallTransactionPump } from "common/api.js";
function Transaction() {
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { user } = useAuth();
    const { selectedStation: { controllerId }, } = useESSContext();
    useEffect(() => {
        const { token } = user;
        const getAllTransaction = async () => {
            try {
                const result = await getallTransactionPump(currentPage, controllerId, token);
                const { content, totalPages, totalElements } = result; // Assuming the API response structure
                setTransactions(content);
                setTotalPages(totalPages);
            }
            catch (error) {
                console.error(error);
            }
        };
        getAllTransaction();
    }, [currentPage, controllerId, user]);
    console.log("transaction", transactions);
    console.log("total", totalPages);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (React.createElement(Flex, { direction: "column", pt: { base: "120px", md: "75px" } },
        React.createElement(Card, { overflowX: { sm: "scroll", xl: "hidden" }, pb: "0px" },
            React.createElement(CardHeader, { p: "6px 0px 22px 0px" },
                React.createElement(Text, { fontSize: "xl", color: textColor, fontWeight: "bold" }, "Transactions")),
            React.createElement(CardBody, null,
                React.createElement(Table, { variant: "simple", color: textColor, size: "sm" },
                    React.createElement(Thead, null,
                        React.createElement(Tr, { color: "gray.400" },
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400" }, "ID"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "Pump"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400" }, "Fuel Grade"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "Volume"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "Price"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "Amount"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "Date time start"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "Date time"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400", textAlign: "center" }, "State"))),
                    React.createElement(Tbody, null, transactions.map((row, key) => {
                        return (React.createElement(TransactionTableRow, { id: row.id, pump: row.pump, fuelGrade: row.fuelName, volume: row.volume, price: row.price, amount: row.amount, totalVolume: row.totalVolume, totalAmount: row.totalAmount, DateTimeStart: row.dateTimeStart, DateTime: row.dateTime, state: row.state, key: key }));
                    }))),
                transactions.length === 0 && (React.createElement(Stack, { width: "100%", margin: "20px 0px" },
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
export default Transaction;
