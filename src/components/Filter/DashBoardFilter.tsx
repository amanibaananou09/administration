import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  useBreakpointValue
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createPeriod, truncateText } from "utils/utils";

interface FilterPeriodProps {
  onFilterChange: (filter: Filter) => void;
}

export type Filter = {
  fromDate?: string;
  toDate?: string;
};

const DashBoardFilter = ({ onFilterChange }: FilterPeriodProps) => {
  const [toDate, setToDate] = useState<string>(
    moment().hour(0).minute(0).format("YYYY-MM-DDTHH:mm"),
  );
  const [fromDate, setFromDate] = useState<string>(
    moment().hour(23).minute(59).format("YYYY-MM-DDTHH:mm"),
  );
  const [period, setPeriod] = useState<string>("today");

  const { t } = useTranslation("dashboard");

  const handleFromDateChange = (date: string) => setFromDate(date);
  const handleToDateChange = (date: string) => setToDate(date);

  const handlePeriodChange = (period: string) => {
    const { fromDate, toDate } = createPeriod(period);

    setFromDate(fromDate);
    setToDate(toDate);

    onFilterChange({ fromDate, toDate });
    setPeriod(period);
  };

  const searchHandler = () => {
    onFilterChange({ fromDate, toDate });
  };

  //styles
  const buttonSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const buttonFontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  const buttonTextLimit = useBreakpointValue({ base: 3, md: 4, lg: 8, xl: 12 });
  const defaultButtonTextLimit = 10;
  const truncatedButtonTextLimit = buttonTextLimit || defaultButtonTextLimit;

  return (
    <Box p={1}>
      <Box display="flex" flexDirection={{ base: "row" }} gap={3}>
        <Button
          colorScheme={period === "today" ? "blue" : "gray"}
          onClick={() => handlePeriodChange("today")}
          size={buttonSize}
          fontSize={buttonFontSize}
          flex="2"
        >
          {truncateText(t("common.today"), truncatedButtonTextLimit)}
        </Button>

        <Button
          colorScheme={period === "yesterday" ? "blue" : "gray"}
          onClick={() => handlePeriodChange("yesterday")}
          size={buttonSize}
          fontSize={buttonFontSize}
          flex="2"
        >
          {truncateText(t("common.yesterday"), truncatedButtonTextLimit)}
        </Button>

        <Button
          colorScheme={period === "weekly" ? "blue" : "gray"}
          onClick={() => handlePeriodChange("weekly")}
          size={buttonSize}
          fontSize={buttonFontSize}
          flex="1"
        >
          {truncateText(t("common.weekly"), truncatedButtonTextLimit)}
        </Button>

        <Button
          colorScheme={period === "monthly" ? "blue" : "gray"}
          onClick={() => handlePeriodChange("monthly")}
          size={buttonSize}
          fontSize={buttonFontSize}
          flex="1"
        >
          {truncateText(t("common.monthly"), truncatedButtonTextLimit)}
        </Button>

        <Button
          colorScheme={period === "yearly" ? "blue" : "gray"}
          onClick={() => handlePeriodChange("yearly")}
          size={buttonSize}
          fontSize={buttonFontSize}
          flex="1"
        >
          {truncateText(t("common.yearly"), truncatedButtonTextLimit)}
        </Button>
        <Box gridColumn={{ base: "1 / -1", md: "auto" }} textAlign="center">
          <Heading as="h1" fontSize={{ base: "sm", md: "lg" }}>
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
              size={useBreakpointValue({ base: "xs", md: "md" })}
            />
          </FormControl>
        </Box>
        <Box gridColumn={{ base: "1 / -1", md: "auto" }} textAlign="center">
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
              size={useBreakpointValue({ base: "xs", md: "md" })}
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
