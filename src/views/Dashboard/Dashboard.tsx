import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "components/Card/Card"; // Update the path to the Card component
import ReportSalesChart from "components/Charts/ReportSalesChart"; // Update the path to the Chart component
import TankLevelChart from "components/Charts/TankLevelChart";
import UserSalesChart from "components/Charts/UserSalesChart"; // Update the path to the Chart component
import DashBoardFilter, { Filter } from "components/Filter/DashBoardFilter";
import PumpSales from "components/Statistics/PumpSales";
import TankMeasurementSection from "components/Statistics/TankMeasurementSection";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SalesGrades from "./SalesGrades";

export default function Dashboard() {
  const [filter, setFilter] = useState<Filter>({
    fromDate: moment().hour(0).minute(0).format("YYYY-MM-DDTHH:mm"),
    toDate: moment().hour(23).minute(59).format("YYYY-MM-DDTHH:mm"),
  });

  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation("dashboard");

  const handleFilterChange = (filter: Filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        setIsSticky(window.pageYOffset > stickyRef.current.offsetTop);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        setIsSticky(window.pageYOffset > stickyRef.current.offsetTop);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //styles
  const textColor = "gray.700";
  const stickyStyles: React.CSSProperties = {
    width: isSticky ? "80%" : "auto",
    position: isSticky ? "fixed" : "static",
    top: isSticky ? "2%" : "auto",
    left: isSticky ? "59%" : "auto",
    transform: isSticky ? "translateX(-50%)" : "none",
    borderRadius: "16px",
    zIndex: isSticky ? 1000 : "auto",
    backgroundColor: isSticky ? "rgba(255, 255, 255, 0.5)" : "transparent",
    padding: isSticky ? "5px" : "0",
    boxShadow: isSticky ? "0px 7px 23px rgba(0, 0, 0, 0.05)" : "none",
  };

  return (
    <Flex
      flexDirection="column"
      pt={{ base: "120px", md: "75px" }}
      px={{ base: "1vw", md: "1vw", lg: "1vw" }}
    >
      <TankMeasurementSection />
      <div ref={stickyRef} style={stickyStyles}>
        <DashBoardFilter onFilterChange={handleFilterChange} />
      </div>

      <br />
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <SalesGrades fromDate={filter?.fromDate} toDate={filter?.toDate} />
        <PumpSales fromDate={filter?.fromDate} toDate={filter?.toDate} />
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
          bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
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
              fromDate={filter?.fromDate}
              toDate={filter?.toDate}
            />
          </Box>
        </Card>
      </Flex>
    </Flex>
  );
}
