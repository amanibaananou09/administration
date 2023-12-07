import { Flex, Text } from "@chakra-ui/react";
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

      <Flex flexDirection="column" mt={{ base: "120px", md: "75px" }}>
        <SalesGrades fromDate={filter?.fromDate} toDate={filter?.toDate} />
        <PumpSales fromDate={filter?.fromDate} toDate={filter?.toDate} />
      </Flex>
      <Flex flexDirection={{ base: "column", lg: "row" }} gap="3" mt="30px">
        <Card
          bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          position="relative"
        >
          <Text color="#fff" fontSize="lg" fontWeight="bold" textAlign="center">
            {t("dashboard.sales")}
          </Text>

          <ReportSalesChart
            fromDate={filter?.fromDate}
            toDate={filter?.toDate}
          />
        </Card>
        <Card>
          <Text
            color={textColor}
            fontSize="lg"
            fontWeight="bold"
            textAlign="center"
          >
            {t("dashboard.usersSales")}
          </Text>

          <UserSalesChart fromDate={filter?.fromDate} toDate={filter?.toDate} />
        </Card>
      </Flex>
      <Flex mt="30px">
        <Card my="5">
          <Text
            color={textColor}
            fontSize="lg"
            fontWeight="bold"
            textAlign="center"
          >
            {t("dashboard.tankLevel")}
          </Text>

          <TankLevelChart fromDate={filter?.fromDate} toDate={filter?.toDate} />
        </Card>
      </Flex>
    </Flex>
  );
}
