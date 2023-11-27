import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card"; // Update the path to the Card component
import ReportSalesChart from "components/Charts/ReportSalesChart"; // Update the path to the Chart component
import TankLevelChart from "components/Charts/TankLevelChart";
import UserSalesChart from "components/Charts/UserSalesChart"; // Update the path to the Chart component
import FilterPeriod from "components/filter/FilterPeriod";
import PumpSales from "components/stat/PumpSales";
import TankMeasurementSection from "components/stat/TankMeasurementSection";
import { useState } from "react";
import SalesGrades from "./SalesGrades";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const [selectedFilter, setSelectedFilter] = useState<string>("today");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const { t } = useTranslation("dashboard");
  const handleSearchFilters = (fromDate: string, toDate: string) => {
    setFromDate(fromDate);
    setToDate(toDate);
    setSelectedFilter("");
  };
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 2, md: 2, xl: 1 }} spacing="24px" mb="20">
        <TankMeasurementSection />
      </SimpleGrid>
      <FilterPeriod
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        onSearch={handleSearchFilters}
      />
      <br />
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <SalesGrades
          periode={selectedFilter}
          startDate={fromDate}
          endDate={toDate}
        />
        <PumpSales
          periode={selectedFilter}
          startDate={fromDate}
          endDate={toDate}
        />
      </Flex>
      <Flex flexDirection="row" pt={{ base: "120px", md: "75px" }}>
        <Card
          minH="125px"
          m="5"
          width="900px"
          bg={
            colorMode === "dark"
              ? "navy.800"
              : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          }
        >
          <Flex
            direction="column"
            mb="-32px"
            p="28px 0px 0px 22px"
            marginLeft="30%"
          >
            <Text color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
              {t("dashboard.sales")}
            </Text>
          </Flex>
          <Box minH="300px">
            <ReportSalesChart
              periode={selectedFilter}
              startDate={fromDate}
              endDate={toDate}
            />
          </Box>
        </Card>
        <Card minH="125px" m="5" width="700px">
          <Flex direction="column">
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              {t("dashboard.usersSales")}
            </Text>
          </Flex>
          <Box minH="300px">
            <UserSalesChart
              periode={selectedFilter}
              startDate={fromDate}
              endDate={toDate}
            />
          </Box>
        </Card>
      </Flex>
      <Card minH="125px" m="5" width="1650px">
        <Flex direction="column" mb="-33px" p="28px 0px 0px 22px">
          <Text
            color={textColor}
            fontSize="lg"
            fontWeight="bold"
            mb="30px"
            marginLeft="0%"
          >
            {t("dashboard.tankLevel")}
          </Text>
        </Flex>
        <Box minH="300px">
          <TankLevelChart
            periode={selectedFilter}
            startDate={fromDate}
            endDate={toDate}
          />
        </Box>
      </Card>
    </Flex>
  );
}
