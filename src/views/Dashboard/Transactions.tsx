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
  Box,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { DownloadIcon } from "@chakra-ui/icons";
import * as XLSX from "xlsx";
import { getallTransactionPump } from "common/api/configuration-api";
import { Transaction } from "common/model";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import TransactionTableRow from "components/Tables/TransactionTableRow";
import FilterTransaction from "components/filter/FilterTransaction";
import { formatNumber } from "utils/utils";

const Transactions = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pumpId, setPumpId] = useState<string>("");
  const [fuelGradeName, setFuelGradeName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const { selectedStation } = useESSContext();
  const [
    selectedFilterTransactions,
    setSelectedFilterTransactions,
  ] = useState<string>("");
  const { t } = useTranslation("dashboard");

  const exportAllToExcel = async () => {
    if (!selectedStation || !totalPages) {
      return;
    }

    let allTransactions: Transaction[] = [];

    try {
      // Fetch transactions from all pages
      for (let page = 0; page < totalPages; page++) {
        const result = await getallTransactionPump(
          page,
          selectedStation,
          selectedFilterTransactions,
          pumpId,
          fuelGradeName,
          startDate,
          endDate,
        );
        const { content } = result;
        allTransactions = allTransactions.concat(content);
      }

      // Convert transactions to Excel and export
      const data = allTransactions.map((transaction) => ({
        Pump: transaction.pump,
        "Fuel Grade": transaction.fuelGradeName,
        Price: transaction.price,
        Volume: transaction.volume,
        "Index Current Volume": transaction.totalVolume,
        Tag: transaction.tag,
        Amount: transaction.amount,
        "Index Current Amount": transaction.totalAmount,
        "Date Time Start": transaction.dateTimeStart,
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Transactions");
      XLSX.writeFile(wb, "all_transactions.xlsx");
    } catch (error) {
      console.error(error);
    }
  };

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
  }, [
    currentPage,
    selectedStation,
    pumpId,
    fuelGradeName,
    selectedFilterTransactions,
    startDate,
    endDate,
  ]);
  console.log("transaction", pumpId);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (filterType: string) => {
    setSelectedFilterTransactions(filterType);
  };

  const handleChange = (value: string | null) => {
    if (selectedFilterTransactions === "pump") {
      setPumpId(value || "");
      setFuelGradeName("");
    } else if (selectedFilterTransactions === "fuelGrade") {
      setPumpId("");
      setFuelGradeName(value || "");
    }
  };
  const handleSearchFilters = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setFuelGradeName("");
    setPumpId("");
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader
          p="6px 0px 22px 0px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {t("transactions.header")}
          </Text>
          <Button
            colorScheme="blue"
            leftIcon={<DownloadIcon />}
            onClick={exportAllToExcel}
          >
            {t("common.export")}
          </Button>
        </CardHeader>

        <CardBody>
          <FilterTransaction
            selectedFilterTransactions={selectedFilterTransactions}
            onFilterChange={handleFilterChange}
            onChange={handleChange}
            onSearch={handleSearchFilters}
          />
          <Box overflowX={{ base: "auto", md: "hidden" }}>
            {transactions && transactions.length === 0 ? (
              <Text color={textColor} mt={4} textAlign="center" fontSize="2xl">
                {t("transactions.noTransactions")}
              </Text>
            ) : (
              <Table
                variant="simple"
                color={textColor}
                size="lg"
                textAlign="center"
              >
                <Thead>
                  <Tr color="teal.700">
                    <Th
                      borderColor={borderColor}
                      color="teal.700"
                      textAlign="center"
                    >
                      {t("common.pump")}
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color="teal.700"
                      textAlign="center"
                    >
                      {t("common.fuelGrades")}
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color="teal.700"
                      textAlign="center"
                    >
                      {t("transactions.price")}
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color="teal.700"
                      textAlign="center"
                    >
                      {t("common.volume")}
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color="teal.700"
                      textAlign="center"
                    >
                      {t("transactions.totalVolume")}
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color="teal.700"
                      textAlign="center"
                    >
                      {t("transactions.tag")}
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color="teal.700"
                      textAlign="center"
                    >
                      {t("common.amount")}
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color="teal.700"
                      textAlign="center"
                    >
                      {t("transactions.totalAmount")}
                    </Th>
                    <Th
                      borderColor={borderColor}
                      color="teal.700"
                      textAlign="center"
                    >
                      {t("common.dateTimeStart")}
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
                          price={row.price}
                          volume={formatNumber(row.volume)}
                          totalVolume={formatNumber(row.totalVolume)}
                          tag={row.tag}
                          amount={row.amount}
                          totalAmount={row.totalAmount}
                          dateTimeStart={row.dateTimeStart}
                          key={key}
                        />
                      );
                    })}
                </Tbody>
              </Table>
            )}
          </Box>
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
          {t("common.previous")}
        </Button>
        <Button>{currentPage + 1}</Button>
        <Button
          isDisabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {t("common.next")}
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Transactions;
