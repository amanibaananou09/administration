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
} from "@chakra-ui/react";
// Custom components
import Card from "src/components/Card/Card";
//import ReportSalesChart from "src/components/Charts/ReportSalesChart";
//import TankLevelChart from "src/components/Charts/TankLevelChart";
//import TankSalesChart from "src/components/Charts/TankSalesChart";
//import UserSalesChart from "src/components/Charts/UserSalesChart";
import IconBox from "src/components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "src/components/Icons/Icons";
import React from "react";

import { useESSContext } from "src/store/ESSContext";

export default function Dashboard() {
  const context = useESSContext();

  // Chakra Color Mode
  const iconBlue: string = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside: string = useColorModeValue("white", "white");
  const textColor: string = useColorModeValue("gray.700", "white");

  const { colorMode } = useColorMode();

  if (!context.selectedStation) {
    return <div>No Station</div>;
  }

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="20px">
        <Card variant={""} minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Today's Money
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    $53,897
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox borderRadius="50%" h={"45px"} w={"45px"} bg={iconBlue}>
                <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +3.48%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card variant={""} minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Today's Users
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    $3,200
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox borderRadius="50%" h={"45px"} w={"45px"} bg={iconBlue}>
                <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +5.2%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px" variant={""}>
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  New Clients
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    +2,503
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox borderRadius="50%" h={"45px"} w={"45px"} bg={iconBlue}>
                <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="red.500" fontWeight="bold">
                -2.82%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
        <Card minH="125px" variant={""}>
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Total Sales
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    $173,000
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox borderRadius="50%" h={"45px"} w={"45px"} bg={iconBlue}>
                <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +8.12%{" "}
              </Text>
              Since last month
            </Text>
          </Flex>
        </Card>
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
          variant={""}
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
          {/*<Box minH="300px">
            <ReportSalesChart />
          </Box>*/}
        </Card>
        <Card variant={""} p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column" mb="-10px" p="28px 0px 0px 22px">
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              Users Sales
            </Text>
          </Flex>
          {/*<Box minH="300px">
            <UserSalesChart />
          </Box>*/}
        </Card>
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
      >
        <Card variant={""} p="0px" maxW={{ sm: "320px", md: "100%" }}>
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
          {/*    <Box minH="300px">
            <TankLevelChart />
          </Box>*/}
        </Card>
        <Card variant={""} p="0px" maxW={{ sm: "320px", md: "100%" }}>
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
          {/* <Box minH="300px">
            <TankSalesChart />
          </Box>*/}
        </Card>
      </Grid>
    </Flex>
  );
}
