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
  ButtonGroup,
   Button ,
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
   const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
  const { user } = useAuth();
  const {
    selectedStation: { controllerId },
  } = useESSContext();
  useEffect(() => {
    const { token } = user;
    const getAllTransaction = async () => {
      try {
        const result = await getallTransactionPump(currentPage,controllerId, token);
        const tranpumpWithId = result.map((item, index) => {
          return { ...item, id: index + 1 };
        });
        setTransactions(tranpumpWithId);
        setTotalPages(tranpumpWithId.length);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTransaction();
  }, [currentPage,controllerId, user]);
const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Transactions
          </Text>
        </CardHeader>
        <CardBody>
          <Table
            variant="simple"
            color={textColor}
            size="sm"
          >
            <Thead>
              <Tr color="gray.400">
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                >
                  ID
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  Pump
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                >
                  Fuel Grade
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  Volume
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  Price
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  Amount
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  Date time start
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  Date time
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  State
                </Th>
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
       <ButtonGroup mt={4} spacing={4} >
                              <Button
                                isDisabled={currentPage === 0}
                                onClick={() => handlePageChange(currentPage - 1)}
                              >
                                Previous
                              </Button>
                              <Button>{currentPage +1}</Button>
                              <Button
                                isDisabled={currentPage === totalPages -1}
                                onClick={() => handlePageChange(currentPage + 1)}
                              >
                                Next
                              </Button>
                            </ButtonGroup>
    </Flex>
  );
}

export default Transaction;
