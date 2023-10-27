import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Heading,
  Divider,
} from "@chakra-ui/react";

interface FilterPeriodProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onSearch: (fromDate: string, toDate: string) => void;
}

function FilterPeriod(props: FilterPeriodProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { selectedFilter, onFilterChange, onSearch } = props;

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
            colorScheme={selectedFilter === "Today" ? "blue" : "gray"}
            onClick={() => onFilterChange("Today")}
          >
            Today
          </Button>
        </Box>
        <Box>
          <Button
            colorScheme={selectedFilter === "Yesterday" ? "blue" : "gray"}
            onClick={() => onFilterChange("Yesterday")}
          >
            Yesterday
          </Button>
        </Box>
        <Box>
          <Button
            colorScheme={selectedFilter === "Week" ? "blue" : "gray"}
            onClick={() => onFilterChange("Week")}
          >
            Week
          </Button>
        </Box>
        <Box>
          <Button
            colorScheme={selectedFilter === "Month" ? "blue" : "gray"}
            onClick={() => onFilterChange("Month")}
          >
            Month
          </Button>
        </Box>
        <Box>
          <Heading as="h1" fontSize="lg">
            From :
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
            To :
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
          <Button onClick={searchFilters} colorScheme="telegram"
    size="md">Search</Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default FilterPeriod;
