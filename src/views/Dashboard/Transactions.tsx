import { getallTransactionPump } from "common/api";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";

import {
  Button,
  ButtonGroup,
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

import { Transaction } from "common/model";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import TransactionTableRow from "components/Tables/TransactionTableRow";

const Transactions = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filterType, setFilterType] = useState<string>("");
  const [pumpId, setPumpId] = useState<number>(0);
  const [fuelGradeName, setFuelGradeName] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

  const token = user?.token || "";

  useEffect(() => {
    const getAllTransaction = async () => {
      if (!selectedStation) {
        return;
      }
      try {
        const result = await getallTransactionPump(
          currentPage,
          selectedStation,
          token,
          filterType,
          pumpId,
          fuelGradeName,
          startDate,
          endDate,
        );
        const { content, totalPages } = result;

        setTransactions(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTransaction();
  }, [currentPage, selectedStation, user]);

  const handlePageChange = (newPage: number) => {
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
          <Table variant="simple" color={textColor} size="sm" textAlign="center"
          >
            <Thead>
              <Tr color="gray.400">
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
                  textAlign="center"
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
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((row, key) => {
                return (
                  <TransactionTableRow
                    pump={row.pump}
                    fuelGrade={row.fuelGradeName}
                    volume={row.volume}
                    price={row.price}
                    amount={row.amount}
                    dateTimeStart={row.dateTimeStart}
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

export default Transactions;
