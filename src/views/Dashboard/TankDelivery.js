// Chakra imports
import {
  Flex,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TankDeliveryRow from "components/Tables/TankDeliveryRow";
import React, { useState, useEffect } from "react";
import { useAuth } from "store/AuthContext";
import { getAllTankDelivery } from "common/api.js";

function Transaction() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [tankdelivery, setTankDelivery] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const { token } = user;
    const allTankDelivery = async () => {
      try {
        const result = await getAllTankDelivery(token);
        setTankDelivery(result);
      } catch (error) {
        console.error(error);
      }
    };
    allTankDelivery();
  }, [user]);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Tank Delivery
          </Text>
        </CardHeader>
        <CardBody>
          <Table
            variant="simple"
            color={textColor}
            size="sm"
            textAlign="center"
          >
            <Thead>
              <Tr color="gray.400">
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  tank
                </Th>
                <Th
                    borderColor={borderColor}
                    color="gray.400"
                    textAlign="center"
                >
                  product Volume
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  fuel Grade
                </Th>
                <Th
                    borderColor={borderColor}
                    color="gray.400"
                    textAlign="center"
                >
                  product Height
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  water Height
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  temperature
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {tankdelivery.map((row, key) => {
                return (
                  <TankDeliveryRow
                    tank={row.tank}
                    fuelGradeName={row.fuelGradeName}
                    productHeight={row.productHeight}
                    waterHeight={row.waterHeight}
                    temperature={row.temperature}
                    productVolume={row.productVolume}
                    key={key}
                  />
                );
              })}
            </Tbody>
          </Table>
          {tankdelivery.length === 0 && (
            <Stack width="100%" margin="20px 0px">
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
            </Stack>
          )}
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Transaction;
