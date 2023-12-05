import {
  Box,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card"; // Update the path to the Card component
import ReportSalesChart from "components/Charts/ReportSalesChart"; // Update the path to the Chart component
import TankLevelChart from "components/Charts/TankLevelChart";
import UserSalesChart from "components/Charts/UserSalesChart"; // Update the path to the Chart component
import DashBoardFilter, { Filter } from "components/Filter/DashBoardFilter";
import PumpSales from "components/Statistics/PumpSales";
import TankMeasurementSection from "components/Statistics/TankMeasurementSection";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SalesGrades from "./SalesGrades";

export default function Dashboard() {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");
  const [filter, setFilter] = useState<Filter>({
    period: "today",
  });
  const { t } = useTranslation("dashboard");

  const handleFilterChange = (filter: Filter) => {
    setFilter(filter);
  };

  return (
    <Flex
      flexDirection="column"
      pt={{ base: "120px", md: "75px" }}
      px={{ base: "1vw", md: "1vw", lg: "1vw" }}
    >
      <TankMeasurementSection />

      <DashBoardFilter onFilterChange={handleFilterChange} />

      <br />
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <SalesGrades
          period={filter?.period}
          fromDate={filter?.fromDate}
          toDate={filter?.toDate}
        />
        <PumpSales
          period={filter?.period}
          fromDate={filter?.fromDate}
          toDate={filter?.toDate}
        />
      </Flex>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        pt={{ base: "120px", md: "75px" }}
        mx={{ base: "1vw", md: "0" }}
      >
        <Card
          minH="125px"
          m={{ base: "5px", md: "5", lg: "1px" }}
          width={{ base: "100%", md: "90%", lg: "45%" }}
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
              period={filter?.period}
              fromDate={filter?.fromDate}
              toDate={filter?.toDate}
            />
          </Box>
        </Card>
        <Card
          minH="125px"
          m={{ base: "5px", md: "5", lg: "10px" }}
          width={{ base: "100%", md: "90%", lg: "45%" }}
        >
          <Flex direction="column">
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              {t("dashboard.usersSales")}
            </Text>
          </Flex>
          <Box minH="300px">
            <UserSalesChart
              period={filter?.period}
              fromDate={filter?.fromDate}
              toDate={filter?.toDate}
            />
          </Box>
        </Card>
      </Flex>
      <Flex>
        <Card minH="125px" m="5" width={{ base: "100%", md: "90%" }}>
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
              period={filter?.period}
              fromDate={filter?.fromDate}
              toDate={filter?.toDate}
            />
          </Box>
        </Card>
      </Flex>
    </Flex>
  );
}
