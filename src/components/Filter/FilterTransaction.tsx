import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Flex,
  Box,
  FormControl,
  Button,
  Text,
  Heading,
  Input,Stack
} from "@chakra-ui/react";
import { getAllPump, getAllFuelGrades } from "common/api/configuration-api";
import { useESSContext } from "store/ESSContext";
import { useAuth } from "store/AuthContext";
import { pump, fuelGrade } from "common/model";
import { useTranslation } from "react-i18next";

interface FilterTransactionProps {
  selectedFilterTransactions: string;
  onFilterChange: (filterType: string) => void;
  onChange: (value: string | null) => void;
  onSearch: (fromDate: string, toDate: string) => void;
}

function FilterTransaction(props: FilterTransactionProps) {
  const {
    onFilterChange,
    selectedFilterTransactions,
    onChange,
    onSearch,
  } = props;
  const [selectedPump, setSelectedPump] = useState<string | null>("");
  const [selectedfuel, setSelectedfuel] = useState<string | null>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { user } = useAuth();
  const { selectedStation } = useESSContext();
  const { t } = useTranslation("dashboard");

  const handleStartDateChange = (date: string) => setStartDate(date);
  const handleEndDateChange = (date: string) => setEndDate(date);
  const searchFilters = () => {
    onSearch(startDate, endDate);
  };
  const [liste, setListe] = useState<{
    pumps: pump[];
    fuelGrades: fuelGrade[];
  }>({
    pumps: [],
    fuelGrades: [],
  });

  useEffect(() => {
    const fetchConfig = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const pumps = await getAllPump(selectedStation);
        const fuelGrades = await getAllFuelGrades(selectedStation);
        setListe({
          pumps,
          fuelGrades,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchConfig();
  }, [selectedStation]);

  const handleFilterChange = (filterType: string) => {
    if (filterType === "pump") {
      onFilterChange(filterType);
    } else if (filterType === "fuelGrade") {
      onFilterChange(filterType);
    } else {
      onFilterChange(filterType);
    }
  };
  const handleCheckboxChange = (value: string | null) => {
    setSelectedPump(value);
    setSelectedfuel(value);
    onChange(value);
  };
  return (
    <Flex direction={{ base: "column", lg: "row"  }} alignItems="center" p="5">
    <Stack
      direction={{ base: "column", lg: "row" }}
      spacing={{ base: "0", lg: "4" }}
      mb={{ base: "0", lg: "4" }}
    >
        <Button
          colorScheme={selectedFilterTransactions === "pump" ? "blue" : "gray"}
          onClick={() => handleFilterChange("pump")}
          mb={{ base: "2", lg: "0" }}
        >
          {t("common.pump")}
        </Button>
      
     
        <Button
          colorScheme={
            selectedFilterTransactions === "fuelGrade" ? "blue" : "gray"
          }
          onClick={() => handleFilterChange("fuelGrade")}
          mb={{ base: "2", lg: "0" }}
        >
          {t("common.fuelGrades")}
        </Button>
      
      
        <Button
          colorScheme={
            selectedFilterTransactions === "volume" ? "blue" : "gray"
          }
          onClick={() => handleFilterChange("volume")}
          mb={{ base: "2", lg: "0" }}
        >
          {t("common.volume")}
        </Button>
     
     
        <Button
          colorScheme={
            selectedFilterTransactions === "period" ? "blue" : "gray"
          }
          onClick={() => handleFilterChange("period")}
          mb={{ base: "2", lg: "0" }}
        >
          {t("common.period")}
        </Button>
        </Stack>

      {selectedFilterTransactions === "pump" && (
        <FormControl p="3">
          {liste.pumps.map((pump: pump) => (
            <Checkbox
              p="2"
              key={pump.id}
              isChecked={selectedPump === pump.id}
              onChange={() =>
                handleCheckboxChange(
                  selectedPump === pump.id ? null : pump.id,
                )
              }
            >
              {t("common.pump")} {pump.id}
            </Checkbox>
          ))}
        </FormControl>
      )}
      {selectedFilterTransactions === "fuelGrade" && (
        <FormControl p="3">
          {liste.fuelGrades.map((fuel: fuelGrade) => (
            <Checkbox
              p="2"
              key={fuel.idConf}
              isChecked={selectedfuel === fuel.idConf}
              onChange={() =>
                handleCheckboxChange(
                  selectedfuel === fuel.idConf
                    ? null
                    : fuel.idConf,
                )
              }
            >
              {fuel.name}
            </Checkbox>
          ))}
        </FormControl>
      )}

      {selectedFilterTransactions === "volume" && (
        <FormControl>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="blue.500"
            textAlign="center"
          >
            {t("transactions.volumeGreater")}
          </Text>
        </FormControl>
      )}

      {selectedFilterTransactions === "period" && (
        <>
          <Box p="3">
            <Heading as="h1" fontSize="lg">
            {t("common.from")} :
            </Heading>
          </Box>
          <Box p="3">
            <FormControl>
              <Input
                type="datetime-local"
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box p="3">
            <Heading as="h1" fontSize="lg">
            {t("common.to")} :
            </Heading>
          </Box>
          <Box>
            <FormControl>
              <Input
                type="datetime-local"
                lang="en"
                value={endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box p="3">
            <Button onClick={searchFilters} colorScheme="telegram" size="md">
            {t("common.search")}
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
}

export default FilterTransaction;
