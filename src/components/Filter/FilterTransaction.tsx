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
  Stack,
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
  const [selectedFilters, setSelectedFilters] = useState<{
    pump: string | null;
    fuelGrade: string | null;
  }>({
    pump: null,
    fuelGrade: null,
  });

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { user } = useAuth();
  const { selectedStation } = useESSContext();
  const { t } = useTranslation("dashboard");
  const [volumeValue, setVolumeValue] = useState<number | string>("");

  const handleFilterChange = (filterType: string) => {
    onFilterChange(filterType);
  };

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

  const handlePumpCheckboxChange = (value: string | null) => {
    setSelectedFilters({ ...selectedFilters, pump: value });
    onChange(value);
  };

  const handleFuelCheckboxChange = (value: string | null) => {
    setSelectedFilters({ ...selectedFilters, fuelGrade: value });
    onChange(value);
  };

  const incrementVolume = () => {
    let newValue;
    if (!isNaN(Number(volumeValue))) {
      newValue = Number(volumeValue) + 1;
    } else {
      newValue = 1;
    }
    setVolumeValue(newValue);
    onChange(newValue.toString());
  };

  const decrementVolume = () => {
    let newValue;
    if (!isNaN(Number(volumeValue)) && Number(volumeValue) > 0) {
      newValue = Number(volumeValue) - 1;
    } else {
      newValue = 0;
    }
    setVolumeValue(newValue);
    onChange(newValue.toString());
  };
  return (
    <Flex direction={{ base: "column", lg: "row" }} alignItems="center" p="5">
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={{ base: "0", lg: "4" }}
        mb={{ base: "0", lg: "4" }}
      >
        <Button
          colorScheme={selectedFilters.pump !== null ? "blue" : "gray"}
          onClick={() => handleFilterChange("pump")}
          mb={{ base: "2", lg: "0" }}
        >
          {t("common.pump")}
        </Button>

        <Button
          colorScheme={selectedFilters.fuelGrade !== null ? "blue" : "gray"}
          onClick={() => handleFilterChange("fuelGrade")}
          mb={{ base: "2", lg: "0" }}
        >
          {t("common.fuelGrades")}
        </Button>

        <Button
          colorScheme={
            selectedFilterTransactions === "volume" ||
            (selectedFilterTransactions !== "volume" && volumeValue !== "")
              ? "blue"
              : "gray"
          }
          onClick={() => handleFilterChange("volume")}
          mb={{ base: "2", lg: "0" }}
        >
          {t("common.volume")}
        </Button>

        <Button
          colorScheme={
            selectedFilterTransactions === "period" ||
            (selectedFilterTransactions !== "period" &&
              (startDate !== "" || endDate !== ""))
              ? "blue"
              : "gray"
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
              isChecked={selectedFilters.pump === pump.id}
              onChange={() => {
                handlePumpCheckboxChange(
                  selectedFilters.pump === pump.id ? null : pump.id,
                );
              }}
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
              isChecked={selectedFilters.fuelGrade === fuel.idConf}
              onChange={() => {
                handleFuelCheckboxChange(
                  selectedFilters.fuelGrade === fuel.idConf
                    ? null
                    : fuel.idConf,
                );
              }}
            >
              {fuel.name}
            </Checkbox>
          ))}
        </FormControl>
      )}

      {selectedFilterTransactions === "volume" && (
        <Flex align="center" p="5">
          <Text p="3" fontSize="lg" fontWeight="bold" color="blue.500">
            {" "}
            {t("transactions.volumeGreater")} :
          </Text>
          <Button onClick={decrementVolume} mr="3">
            -
          </Button>
          <Input
            type="number"
            fontSize="m"
            fontWeight="bold"
            textAlign="center"
            value={volumeValue}
            onChange={(e) => {
              const newValue = e.target.value;
              setVolumeValue(newValue);
              onChange(newValue.toString());
            }}
            mr="3"
            w="90px"
          />
          <Button onClick={incrementVolume}>+</Button>
        </Flex>
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
