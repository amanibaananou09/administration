// Chakra imports
import { Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue, } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import React from "react";
import { tablesProjectData, tablesTableData } from "variables/general";
function Tables() {
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    return (React.createElement(Flex, { direction: "column", pt: { base: "120px", md: "75px" } },
        React.createElement(Card, { overflowX: { sm: "scroll", xl: "hidden" }, pb: "0px" },
            React.createElement(CardHeader, { p: "6px 0px 22px 0px" },
                React.createElement(Text, { fontSize: "xl", color: textColor, fontWeight: "bold" }, "Authors Table")),
            React.createElement(CardBody, null,
                React.createElement(Table, { variant: "simple", color: textColor },
                    React.createElement(Thead, null,
                        React.createElement(Tr, { my: ".8rem", pl: "0px", color: "gray.400" },
                            React.createElement(Th, { pl: "0px", borderColor: borderColor, color: "gray.400" }, "Author"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400" }, "Function"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400" }, "Status"),
                            React.createElement(Th, { borderColor: borderColor, color: "gray.400" }, "Employed"),
                            React.createElement(Th, { borderColor: borderColor }))),
                    React.createElement(Tbody, null, tablesTableData.map((row, index, arr) => {
                        return (React.createElement(TablesTableRow, { name: row.name, logo: row.logo, email: row.email, subdomain: row.subdomain, domain: row.domain, status: row.status, date: row.date, isLast: index === arr.length - 1 ? true : false, key: index }));
                    }))))),
        React.createElement(Card, { my: "22px", overflowX: { sm: "scroll", xl: "hidden" }, pb: "0px" },
            React.createElement(CardHeader, { p: "6px 0px 22px 0px" },
                React.createElement(Flex, { direction: "column" },
                    React.createElement(Text, { fontSize: "lg", color: textColor, fontWeight: "bold", pb: ".5rem" }, "Projects Table"))),
            React.createElement(CardBody, null,
                React.createElement(Table, { variant: "simple", color: textColor },
                    React.createElement(Thead, null,
                        React.createElement(Tr, { my: ".8rem", pl: "0px" },
                            React.createElement(Th, { pl: "0px", color: "gray.400", borderColor: borderColor }, "Companies"),
                            React.createElement(Th, { color: "gray.400", borderColor: borderColor }, "Budget"),
                            React.createElement(Th, { color: "gray.400", borderColor: borderColor }, "Status"),
                            React.createElement(Th, { color: "gray.400", borderColor: borderColor }, "Completion"),
                            React.createElement(Th, null))),
                    React.createElement(Tbody, null, tablesProjectData.map((row, index, arr) => {
                        return (React.createElement(TablesProjectRow, { name: row.name, logo: row.logo, status: row.status, budget: row.budget, progression: row.progression, isLast: index === arr.length - 1 ? true : false, key: index }));
                    })))))));
}
export default Tables;
