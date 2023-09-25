// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import React from "react";
import {  tablesTableData } from "variables/general";

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Transaction Table
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  ID
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Pump
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Nozzle
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Fuel Grade
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Volume
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Price
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Amount
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Total Volume
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Total amount
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Date time start
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Date time
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  State
                </Th>
                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesTableData.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    id={row.id}
                    pump={row.pump}
                    nozzle={row.nozzle}
                    fuelGrade={row.fuelGrade}
                    volume={row.volume}
                    price={row.price}
                    amount={row.amount}
                    totalVolume={row.totalVolume}
                    totalAmount={row.totalAmount}
                    DateTimeStart={row.DateTimeStart}
                    DateTime={row.DateTime}
                    state={row.state}
                    //isLast={index === arr.length - 1 ? true : false}
                    key={index}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
