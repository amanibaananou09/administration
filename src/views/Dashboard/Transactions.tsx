import { useEffect, useState } from "react";
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

import { getallTransactionPump } from "common/api/configuration-api";
import { Transaction } from "common/model";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import TransactionTableRow from "components/Tables/TransactionTableRow";
import FilterTransaction from "components/filter/FilterTransaction";

const Transactions = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pumpId, setPumpId] = useState<number>(0);
  const [fuelGradeName, setFuelGradeName] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const { selectedStation } = useESSContext();
  const [selectedFilterTransactions,setSelectedFilterTransactions]= useState<string>("");
  
  useEffect(() => {
    const getAllTransaction = async () => {
      if (!selectedStation) {
        return;
      }
      try {
        const result = await getallTransactionPump(
          currentPage,
          selectedStation,
          selectedFilterTransactions,
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
  }, [currentPage, selectedStation, pumpId, fuelGradeName,selectedFilterTransactions,startDate,endDate]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (filterType: string) => {
    setSelectedFilterTransactions(filterType);
  };

  const handleChange = (value: number | null) => {
    if (selectedFilterTransactions === "pump") {
      setPumpId(value || 0);
      setFuelGradeName(0);
    } else if (selectedFilterTransactions === "fuelGrade") {
      setPumpId(0);
      setFuelGradeName(value || 0);
    }
  };
  const handleSearchFilters = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setFuelGradeName(0);
    setPumpId(0);
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
          <FilterTransaction
            selectedFilterTransactions={selectedFilterTransactions}
            onFilterChange={handleFilterChange}
            onChange={handleChange}
            onSearch={handleSearchFilters}
          />
          <Table
            variant="simple"
            color={textColor}
            size="sm"
            textAlign="center"
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
              {transactions &&
                transactions.map((row, key) => {
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
          {!transactions && (
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
