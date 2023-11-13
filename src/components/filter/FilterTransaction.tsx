import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Flex,
  Box,
  FormControl,
  Button,
  Text,
  Heading,
  Input,
} from "@chakra-ui/react";
import { getAllPump, getAllFuelGrades } from "common/api/configuration-api";
import { useESSContext } from "store/ESSContext";
import { useAuth } from "store/AuthContext";
import { pump, fuelGrade } from "common/model";

interface FilterTransactionProps {
  selectedFilterTransactions: string;
  onFilterChange: (filterType: string) => void;
  onChange: (value: number | null) => void;
  onSearch: (fromDate: string, toDate: string) => void;
}

function FilterTransaction(props: FilterTransactionProps) {
  const {
    onFilterChange,
    selectedFilterTransactions,
    onChange,
    onSearch,
  } = props;
  const [selectedPump, setSelectedPump] = useState<number | null>(null);
  const [selectedfuel, setSelectedfuel] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

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
  const handleCheckboxChange = (value: number | null) => {
    setSelectedPump(value);
    setSelectedfuel(value);
    onChange(value);
  };
  return (
    <Flex alignItems="center" p="5">
      <Box>
        <Button
          colorScheme={selectedFilterTransactions === "pump" ? "blue" : "gray"}
          onClick={() => handleFilterChange("pump")}
        >
          Pump
        </Button>
      </Box>
      <Box ml={4}>
        <Button
          colorScheme={
            selectedFilterTransactions === "fuelGrade" ? "blue" : "gray"
          }
          onClick={() => handleFilterChange("fuelGrade")}
        >
          Fuel Grade
        </Button>
      </Box>
      <Box ml={4}>
        <Button
          colorScheme={
            selectedFilterTransactions === "volume" ? "blue" : "gray"
          }
          onClick={() => handleFilterChange("volume")}
        >
          Volume
        </Button>
      </Box>
      <Box ml={4}>
        <Button
          colorScheme={
            selectedFilterTransactions === "period" ? "blue" : "gray"
          }
          onClick={() => handleFilterChange("period")}
        >
          Period
        </Button>
      </Box>
      
      {selectedFilterTransactions === "pump" && (
        <FormControl>
          {liste.pumps.map((pump: pump) => (
            <Checkbox
              key={pump.id}
              isChecked={selectedPump === Number(pump.id)}
              onChange={() =>
                handleCheckboxChange(
                  selectedPump === Number(pump.id) ? null : Number(pump.id),
                )
              }
            >
              Pump {pump.id}
            </Checkbox>
          ))}
        </FormControl>
      )}
      {selectedFilterTransactions === "fuelGrade" && (
        <FormControl>
          {liste.fuelGrades.map((fuel: fuelGrade) => (
            <Checkbox
              key={fuel.idConf}
              isChecked={selectedfuel === Number(fuel.idConf)}
              onChange={() =>
                handleCheckboxChange(
                  selectedfuel === Number(fuel.idConf)
                    ? null
                    : Number(fuel.idConf),
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
            Transactions with Volume greater than 100
          </Text>
        </FormControl>
      )}

      {selectedFilterTransactions === "period" && (
        <>
          <Box >
            <Heading as="h1" fontSize="lg">
              From :
            </Heading>
          </Box>
          <Box>
            <FormControl>
              <Input
                type="datetime-local"
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <Heading as="h1" fontSize="lg">
              To :
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
          <Box>
            <Button onClick={searchFilters} colorScheme="telegram" size="md">
              Search
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
}

export default FilterTransaction;
