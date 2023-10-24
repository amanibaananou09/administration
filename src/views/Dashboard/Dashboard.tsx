// Chakra imports
import {
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorMode,
  useColorModeValue,
  CircularProgress,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import ReportSalesChart from "components/Charts/ReportSalesChart";
import UserSalesChart from "components/Charts/UserSalesChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons";
import React, { useState, useEffect } from "react";
import { useESSContext } from "store/ESSContext";
import TankLevelChart from "../../components/Charts/TankLevelChart";
import TankSalesChart from "../../components/Charts/TankSalesChart";
import { useAuth } from "../../store/AuthContext";
import TankMeasurement from "../../stat/TankMeasurement";
export default function Dashboard() {
  const context = useESSContext();

  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const { colorMode } = useColorMode();

  if (!context.selectedStation) {
    return <div>No Station</div>;
  }

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="20">
        <TankMeasurement  />
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
      >
        <Card
          bg={
            colorMode === "dark"
              ? "navy.800"
              : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          }
          p="0px"
          maxW={{ sm: "320px", md: "100%" }}
        >
          <Flex
            direction="column"
            mb="-32px"
            p="28px 0px 0px 22px"
            marginLeft="30%"
          >
            <Text color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
              Month Wise Sales Report
            </Text>
          </Flex>
          <Box minH="300px">
            <ReportSalesChart />
          </Box>
        </Card>
        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column" mb="-10px" p="28px 0px 0px 22px">
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              Users Sales
            </Text>
          </Flex>
          <Box minH="300px">
            <UserSalesChart />
          </Box>
        </Card>
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
      >
        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column" mb="-33px" p="28px 0px 0px 22px">
            <Text
              color={textColor}
              fontSize="lg"
              fontWeight="bold"
              mb="6px"
              marginLeft="10%"
            >
              Tank Level
            </Text>
          </Flex>
          {
            <Box minH="300px">
              <TankLevelChart />
            </Box>
          }
        </Card>
        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column" mb="-33px" p="28px 0px 0px 22px">
            <Text
              color={textColor}
              fontSize="lg"
              fontWeight="bold"
              mb="6px"
              marginLeft="10%"
            >
              Sales
            </Text>
          </Flex>
          <Box minH="300px">
            <TankSalesChart />
          </Box>
        </Card>
      </Grid>
    </Flex>
  );
}
