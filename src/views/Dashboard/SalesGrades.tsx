import React, { useState } from "react";
import Card from "../../components/Card/Card"; // Update the path to the Card component
import { SimpleGrid, Flex, Stat, StatLabel, Text } from "@chakra-ui/react";
import { Grades } from "../../common/model";
import { useAuth } from "../../store/AuthContext";
import { getAllSalesByGrades } from "common/api";
import { useESSContext } from "../../store/ESSContext";

const [grades, setGrades] = useState<Grades[]>([]);
const { user } = useAuth();
const [fuelGrade, setFuelGrade] = useState<string>("");
const [totalSalesParAmount, setTotalSalesParAmount] = useState<number>(0);
const [totalSalesParVolume, setTotalSalesParVolume] = useState<number>(0);

const {
  selectedStation: {
    controllerPts: { id: controllerId },
  },
} = useESSContext();

const token = user?.token || "";
function SalesGrades() {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="20px">
      <Card minH="125px">
        <Flex direction="column">
          <Flex flexDirection="row" align="center" justify="center" w="100%" mb="25px">
            <Stat me="auto">
              <StatLabel fontSize="xl" color="gray.70" fontWeight="bold" textTransform="uppercase">
                Gasoil
              </StatLabel>
            </Stat>
          </Flex>
          <Text as="span" color="blue.600" fontWeight="normal" p="3">
            Total Sales Amount: $123,500
          </Text>
          <Text as="span" color="blue.600" fontWeight="normal" p="3" fontSize="sm">
            Total Sales Volume: 500 units
          </Text>
        </Flex>
      </Card>
      <Card minH="125px">
        <Flex direction="column">
          <Flex flexDirection="row" align="center" justify="center" w="100%" mb="25px">
            <Stat me="auto">
              <StatLabel fontSize="xl" color="gray.70" fontWeight="bold" textTransform="uppercase">
                Super Sans Soufre
              </StatLabel>
            </Stat>
          </Flex>
          <Text as="span" color="blue.600" fontWeight="normal" p="3">
            Total Sales Amount: $123,500
          </Text>
          <Text as="span" color="blue.600" fontWeight="normal" p="3" fontSize="sm">
            Total Sales Volume: 500 units
          </Text>
        </Flex>
      </Card>

      <Card minH="125px">
        <Flex direction="column">
          <Flex flexDirection="row" align="center" justify="center" w="100%" mb="25px">
            <Stat me="auto">
              <StatLabel fontSize="xl" color="gray.70" fontWeight="bold" textTransform="uppercase">
                Gasoil Sans Plombe
              </StatLabel>
            </Stat>
          </Flex>
          <Text as="span" color="blue.600" fontWeight="normal" p="3">
            Total Sales Amount: $123,500
          </Text>
          <Text as="span" color="blue.600" fontWeight="normal" p="3" fontSize="sm">
            Total Sales Volume: 500 units
          </Text>
        </Flex>
      </Card>
    </SimpleGrid>
  );
};

export default SalesGrades;
