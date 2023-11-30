import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface FilterPeriodProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onSearch: (fromDate: string, toDate: string) => void;
}

function FilterPeriod(props: FilterPeriodProps) {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const { selectedFilter, onFilterChange, onSearch } = props;
  const { t } = useTranslation("dashboard");

  const buttonSize = useBreakpointValue({ base: "sm", md: "md",lg: "lg" });

  const handleFromDateChange = (date: string) => setFromDate(date);
  const handleToDateChange = (date: string) => setToDate(date);
  const searchFilters = () => {
    onSearch(fromDate, toDate);
  };

  return (
    <Box p={1}>
      <Box
        flex="0"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        gap={3}
      >
        <Button
          colorScheme={selectedFilter === "today" ? "blue" : "gray"}
          onClick={() => onFilterChange("today")}
          size={buttonSize}
          flex="2"
        >
          {t("common.today")}
        </Button>

        <Button
          colorScheme={selectedFilter === "yesterday" ? "blue" : "gray"}
          onClick={() => onFilterChange("yesterday")}
          size={buttonSize}
          flex="2"
        >
          {t("common.yesterday")}
        </Button>

        <Button
          colorScheme={selectedFilter === "weekly" ? "blue" : "gray"}
          onClick={() => onFilterChange("weekly")}
          size={buttonSize}
          flex="1"
        >
          {t("common.weekly")}
        </Button>

        <Button
          colorScheme={selectedFilter === "monthly" ? "blue" : "gray"}
          onClick={() => onFilterChange("monthly")}
          size={buttonSize}
          flex="1"
        >
          {t("common.monthly")}
        </Button>

        <Button
          colorScheme={selectedFilter === "yearly" ? "blue" : "gray"}
          onClick={() => onFilterChange("yearly")}
          size={buttonSize}
          flex="1"
        >
          {t("common.yearly")}
        </Button>
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
              bg="white"
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
              bg="white"
            />
          </FormControl>
        </Box>
        <Box>
          <Button
            onClick={searchFilters}
            colorScheme="telegram"
            size={buttonSize}
          >
            {t("common.search")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default FilterPeriod;
