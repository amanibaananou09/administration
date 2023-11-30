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
import { useESSContext } from "store/ESSContext";
import { useAuth } from "store/AuthContext";
import { getAllTankByIdc } from "../../common/api/chart-api";
import { Tank } from "../../common/model";
import { useTranslation } from "react-i18next";

interface FilterDeliveryProps {
  selectedFilterDelivery: string;
  onFilterChange: (filterType: string) => void;
  onChange: (value: string | null) => void;
  onSearch: (fromDate: string, toDate: string) => void;
}

function FilterDelivery(props: FilterDeliveryProps) {
  const { onFilterChange, selectedFilterDelivery, onChange, onSearch } = props;
  const [selectedTank, setSelectedTank] = useState<string | null>(null);
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
    tanks: Tank[];
  }>({
    tanks: [],
  });

  useEffect(() => {
    const fetchConfig = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const tanks = await getAllTankByIdc(selectedStation);
        setListe({
          tanks,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchConfig();
  }, [selectedStation]);

  const handleFilterChange = (filterType: string) => {
    if (filterType === "tank") {
      onFilterChange(filterType);
    } else {
      onFilterChange(filterType);
    }
  };
  const handleCheckboxChange = (value: string | null) => {
    setSelectedTank(value);
    onChange(value);
  };
  useEffect(() => {
    if (selectedFilterDelivery !== "tank") {
      setSelectedTank(null);
      onChange(null);
    }
    if (selectedFilterDelivery !== "period") {
      setStartDate("");
      setEndDate("");
    }
  }, [selectedFilterDelivery, onChange]);

  return (
    <Flex alignItems="center" p="5">
      <Box>
        <Button
          colorScheme={selectedFilterDelivery === "tank" ? "blue" : "gray"}
          onClick={() => handleFilterChange("tank")}
        >
          {t("common.tank")}
        </Button>
      </Box>

      <Box ml={4}>
        <Button
          colorScheme={selectedFilterDelivery === "period" ? "blue" : "gray"}
          onClick={() => handleFilterChange("period")}
        >
          {t("common.period")}
        </Button>
      </Box>

      {selectedFilterDelivery === "tank" && (
        <FormControl p="3">
          {liste.tanks.map((tank: Tank) => (
            <Checkbox
              p="2"
              key={tank.idConf}
              isChecked={selectedTank === tank.idConf}
              onChange={() =>
                handleCheckboxChange(
                  selectedTank === tank.idConf ? null : tank.idConf,
                )
              }
            >
              {t("common.tank")} {tank.idConf}
            </Checkbox>
          ))}
        </FormControl>
      )}
      {selectedFilterDelivery === "period" && (
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

export default FilterDelivery;
