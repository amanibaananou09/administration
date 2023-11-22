import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface FilterPeriodProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onSearch: (fromDate: string, toDate: string) => void;
}

function FilterPeriod(props: FilterPeriodProps) {
  const [fromDate, setFromDate] =  useState<string>("");
  const [toDate, setToDate] =  useState<string>("");
  const { selectedFilter, onFilterChange, onSearch } = props;
  const { t } = useTranslation("dashboard");

  const handleFromDateChange = (date: string) => setFromDate(date);
  const handleToDateChange = (date: string) => setToDate(date);
  const searchFilters = () => {
    onSearch(fromDate, toDate);
  };

  return (
    <Box p={1}>
      <Stack direction="row" spacing={4} align="center">
        <Box>
          <Button
            colorScheme={selectedFilter === "today" ? "blue" : "gray"}
            onClick={() => onFilterChange("today")}
          >
             {t("common.today")}
          </Button>
        </Box>
        <Box>
          <Button
            colorScheme={selectedFilter === "yesterday" ? "blue" : "gray"}
            onClick={() => onFilterChange("yesterday")}
          >
            {t("common.yesterday")}
          </Button>
        </Box>
        <Box>
          <Button
            colorScheme={selectedFilter === "weekly" ? "blue" : "gray"}
            onClick={() => onFilterChange("weekly")}
          >
            {t("common.weekly")}
          </Button>
        </Box>
        <Box>
          <Button
            colorScheme={selectedFilter === "monthly" ? "blue" : "gray"}
            onClick={() => onFilterChange("monthly")}
          >
            {t("common.monthly")}
          </Button>
        </Box>
        <Box>
          <Button
            colorScheme={selectedFilter === "yearly" ? "blue" : "gray"}
            onClick={() => onFilterChange("yearly")}
          >
            {t("common.yearly")}
          </Button>
        </Box>
        <Box>
          <Heading as="h1" fontSize="lg">
          {t("common.from")} :
          </Heading>
        </Box>
        <Box>
          <FormControl>
            <Input
              type="datetime-local"
              value={fromDate}
              onChange={(e) => handleFromDateChange(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box>
          <Heading as="h1" fontSize="lg">
          {t("common.to")} :
          </Heading>
        </Box>
        <Box>
          <FormControl>
            <Input
              type="datetime-local"
              lang="en"
              value={toDate}
              onChange={(e) => handleToDateChange(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box>
          <Button onClick={searchFilters} colorScheme="telegram" size="md">
          {t("common.search")}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default FilterPeriod;
