import React, { useState, useEffect } from "react";
import { useAuth } from "src/store/AuthContext";
import { useESSContext } from "src/store/ESSContext";
import { getallTransactionPump } from "src/common/api";

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
  Button,
} from "@chakra-ui/react";

import Card from "src/components/Card/Card";
import CardBody from "src/components/Card/CardBody";
import CardHeader from "src/components/Card/CardHeader";
import TransactionTableRow from "src/components/Tables/TransactionTableRow";

interface TransactionProps {}

interface Transaction {
  id: string;
  pump: string;
  fuelGrade: string;
  volume: number;
  price: number;
  amount: number;
  totalVolume: number;
  totalAmount: number;
  DateTimeStart: string;
}

const Transaction: React.FC<TransactionProps> = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filterType, setFilterType] = useState<string>("");
  const [pumpId, setPumpId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const { user } = useAuth();
  const {
    selectedStation: { controllerId },
  } = useESSContext();

  const token = user?.token || "";

  useEffect(() => {
    const getAllTransaction = async () => {


      try {
        const result = await getallTransactionPump(
          currentPage,
          controllerId,
          token,
          filterType,
          pumpId,
          startDate,
          endDate,
        );
        const { content, totalPages } = result; // Assuming the API response structure

        setTransactions(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTransaction();
  }, [currentPage, controllerId, user]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px" variant={""}>
        <CardHeader p="6px 0px 22px 0px" variant={""}>
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Transactions
          </Text>
        </CardHeader>
        <CardBody variant={""}>
          <Table variant="simple" color={textColor} size="sm">
            <Thead>
              <Tr color="gray.400">
                <Th borderColor={borderColor} color="gray.400">
                  ID
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  Pump
                </Th>
                <Th borderColor={borderColor} color="gray.400">
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
                    pump={row.pump}
                    fuelGrade={row.fuelGrade}
                    volume={row.volume}
                    price={row.price}
                    amount={row.amount}
                    DateTimeStart={row.DateTimeStart}
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
      <ButtonGroup mt={4} spacing={4}>
        <Button
          isDisabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button>{currentPage + 1}</Button>
        <Button
          isDisabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Transaction;
