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

interface FilterDeliveryProps {
  selectedFilterDelivery: string;
  onFilterChange: (filterType: string) => void;
  onChange: (value: number | null) => void;
  onSearch: (fromDate: string, toDate: string) => void;
}

function FilterDelivery(props: FilterDeliveryProps) {
  const { onFilterChange, selectedFilterDelivery, onChange, onSearch } = props;
  const [selectedTank, setSelectedTank] = useState<number | null>(null);
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
  const handleCheckboxChange = (value: number | null) => {
    setSelectedTank(value);
    onChange(value);
  };
  return (
    <Flex alignItems="center" p="5">
      <Box>
        <Button
          colorScheme={selectedFilterDelivery === "tank" ? "blue" : "gray"}
          onClick={() => handleFilterChange("tank")}
        >
          Tank
        </Button>
      </Box>

      <Box ml={4}>
        <Button
          colorScheme={selectedFilterDelivery === "period" ? "blue" : "gray"}
          onClick={() => handleFilterChange("period")}
        >
          Period
        </Button>
      </Box>

      {selectedFilterDelivery === "tank" && (
        <FormControl>
          {liste.tanks.map((tank: Tank) => (
            <Checkbox
              key={tank.idConf}
              isChecked={selectedTank === Number(tank.idConf)}
              onChange={() =>
                handleCheckboxChange(
                  selectedTank === Number(tank.idConf)
                    ? null
                    : Number(tank.idConf),
                )
              }
            >
              Tank {tank.idConf}
            </Checkbox>
          ))}
        </FormControl>
      )}
      {selectedFilterDelivery === "period" && (
        <>
          <Box>
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

export default FilterDelivery;
