import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  useBreakpointValue
} from "@chakra-ui/react";
import { useState } from "react";
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
  const [fromDate, setFromDate] = useState<string>(
    `${new Date().toISOString().substring(0, 10)}T00:00`,
  );
  const [toDate, setToDate] = useState<string>(
    `${new Date().toISOString().substring(0, 10)}T23:59`,
  );
  const [period, setPeriod] = useState<string>("today");

  const { t } = useTranslation("dashboard");

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

  const handleFromDateChange = (date: string) => setFromDate(date);
  const handleToDateChange = (date: string) => setToDate(date);

  const handlePeriodChange = (period: string) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let fromDate: string = "";
    let toDate: string = "";

    switch (period) {
      case "today":
        fromDate = `${today.toISOString().substring(0, 10)}T00:00`;
        toDate = `${today.toISOString().substring(0, 10)}T23:59`;

        break;
      case "yesterday":
        fromDate = `${yesterday.toISOString().substring(0, 10)}T00:00`;
        toDate = `${yesterday.toISOString().substring(0, 10)}T23:59`;

        break;
      case "weekly":
        const startOfWeek = new Date(today);
        const currentDay = today.getDay();
        const diff = currentDay === 0 ? 6 : currentDay - 0;
        startOfWeek.setDate(startOfWeek.getDate() - diff);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        fromDate = `${startOfWeek.toISOString().substring(0, 10)}T00:00`;
        toDate = `${endOfWeek.toISOString().substring(0, 10)}T23:59`;

        break;
      case "monthly":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          1,
        );
        fromDate = `${startOfMonth.toISOString().substring(0, 10)}T00:00`;
        toDate = `${endOfMonth.toISOString().substring(0, 10)}T23:59`;

        break;
      case "yearly":
        const startOfYear = new Date(today.getFullYear(), 0, 2);
        const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
        fromDate = `${startOfYear.toISOString().substring(0, 10)}T00:00`;
        toDate = `${endOfYear.toISOString().substring(0, 10)}T23:59`;

      default:
        break;
    }

    setFromDate(fromDate);
    setToDate(toDate);

    onFilterChange({
      fromDate,
      toDate,
    });

    setPeriod(period);
  };

  const searchHandler = () => {
    onFilterChange({ fromDate, toDate });
  };

  const truncateText = (text: string, limit: number) => {
    if (text.length <= limit) {
      return text;
    } else {
      return text.slice(0, limit) + "...";
    }
  };

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
