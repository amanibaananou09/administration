import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface FilterPeriodProps {
  onFilterChange: (filter: Filter) => void;
}

export type Filter = {
  fromDate?: string;
  toDate?: string;
  period?: string;
};

const DashBoardFilter = ({ onFilterChange }: FilterPeriodProps) => {
  const [period, setPeriod] = useState<string>("today");
  const fromDateInputRef = useRef<HTMLInputElement>(null);
  const toDateInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation("dashboard");

  const buttonSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  const handlePeriodChange = (period: string) => {
    setPeriod(period);
    onFilterChange({ period });
  };

  const searchHandler = () => {
    const fromDate = fromDateInputRef.current?.value;
    const toDate = toDateInputRef.current?.value;
    onFilterChange({ fromDate, toDate });
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
          colorScheme={period === "today" ? "blue" : "gray"}
          onClick={() => handlePeriodChange("today")}
          size={buttonSize}
          flex="2"
        >
          {t("common.today")}
        </Button>

        <Button
          colorScheme={period === "yesterday" ? "blue" : "gray"}
          onClick={() => handlePeriodChange("yesterday")}
          size={buttonSize}
          flex="2"
        >
          {t("common.yesterday")}
        </Button>

        <Button
          colorScheme={period === "weekly" ? "blue" : "gray"}
          onClick={() => handlePeriodChange("weekly")}
          size={buttonSize}
          flex="1"
        >
          {t("common.weekly")}
        </Button>

        <Button
          colorScheme={period === "monthly" ? "blue" : "gray"}
          onClick={() => handlePeriodChange("monthly")}
          size={buttonSize}
          flex="1"
        >
          {t("common.monthly")}
        </Button>

        <Button
          colorScheme={period === "yearly" ? "blue" : "gray"}
          onClick={() => handlePeriodChange("yearly")}
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
            <Input type="datetime-local" ref={fromDateInputRef} bg="white" />
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
              ref={toDateInputRef}
              bg="white"
            />
          </FormControl>
        </Box>
        <Box>
          <Button
            onClick={searchHandler}
            colorScheme="telegram"
            size={buttonSize}
          >
            {t("common.search")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DashBoardFilter;
