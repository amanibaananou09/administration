import React, { FC } from 'react';
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
import Card from "src/components/Card/Card";
import CardBody from "src/components/Card/CardBody";
import CardHeader from "src/components/Card/CardHeader";
import TablesProjectRow from "src/components/Tables/TablesProjectRow";
import TablesTableRow from "src/components/Tables/TablesTableRow";
import { tablesProjectData, tablesTableData } from "src/variables/general";

interface TablesProps {}

const Tables: FC<TablesProps> = () => {
  const textColor: string = useColorModeValue("gray.700", "white");
  const borderColor: string = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Authors Table
          </Text>
        </CardHeader>
        <CardBody >
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  Author
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Function
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Status
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Employed
                </Th>
                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      <Card  my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader  p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Projects Table
            </Text>
          </Flex>
        </CardHeader>
        <CardBody >
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px">
                <Th pl="0px" color="gray.400" borderColor={borderColor}>
                  Companies
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Budget
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Status
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Completion
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesProjectData.map((row, index, arr) => {
                return (
                  <TablesProjectRow
                    name={row.name}
                    logo={row.logo}
                    status={row.status}
                    budget={row.budget}
                    progression={row.progression}
                    isLast={index === arr.length - 1 ? true : false}
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