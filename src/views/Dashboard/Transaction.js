// Chakra imports
import {
  Flex,
  Skeleton,
  Stack,
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
import TransactionTableRow from "components/Tables/TransactionTableRow";
import React, { useState, useEffect } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { getallTransactionPump } from "common/api.js";

function Transaction() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();
  const {
    selectedStation: { controllerId },
  } = useESSContext();
  useEffect(() => {
    const { token } = user;
    const getAllTransaction = async () => {
      try {
        const result = await getallTransactionPump(controllerId, token);
        const tranpumpWithId = result.map((item, index) => {
          return { ...item, id: index + 1 };
        });
        setTransactions(tranpumpWithId);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTransaction();
  }, [controllerId, user]);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Transactions
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor} size="sm" textAlign="center">
            <Thead>
              <Tr color="gray.400" >
                <Th borderColor={borderColor} color="gray.400">
                  ID
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Pump
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
                  Date time start
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Date time
                </Th>
                <Th borderColor={borderColor} color="gray.400" >
                  State
                </Th>
                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((row, key) => {
                return (
                  <TransactionTableRow
                    id={row.id}
                    pump={row.pump}
                    fuelGrade={row.fuelName}
                    volume={row.volume}
                    price={row.price}
                    amount={row.amount}
                    totalVolume={row.totalVolume}
                    totalAmount={row.totalAmount}
                    DateTimeStart={row.dateTimeStart}
                    DateTime={row.dateTime}
                    state={row.state}
                    key={key}
                  />
                );
              })}
            </Tbody>
          </Table>
          {transactions.length === 0 && (
            <Stack width="100%" margin="20px 0px">
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
            </Stack>
          )}
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Transaction;
