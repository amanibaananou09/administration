import {
  Box,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { getLastTankDelivery } from "common/api/statistique-api";
import { LastTankRowProps, TankDelivery } from "common/model";
import { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { formatDate } from "utils/utils";
export const LastTankDelivery = ({ tankId }: LastTankRowProps) => {
  const [lastTankDelivery, setLastTankDelivery] = useState<TankDelivery>();
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getLastTankDelivery(selectedStation, tankId);
        setLastTankDelivery(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedStation]);
  return (
    <Box p={4} maxW="600px" mx="auto">
      <Heading fontSize="l" fontWeight="semibold" textAlign="center">
        Last Tank Delivery
      </Heading>
      <Box borderBottom="1px solid #e5e5e5" my={4} />

      {lastTankDelivery && (
        <>
          <Flex mb={4} alignItems="center">
            <Heading fontSize="m" fontWeight="medium" mr={2}>
              - Date:
            </Heading>
            <Text textAlign="center">
              {formatDate(lastTankDelivery.dateTime)}
            </Text>
          </Flex>

          <Heading fontSize="m" fontWeight="medium" mb={4}>
            - Delivery absolute values:
          </Heading>
          <List spacing={2}>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Product height: {lastTankDelivery.productHeight} mm</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Water height: {lastTankDelivery.waterHeight} mm</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Temperature: {lastTankDelivery.temperature} °C</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Product volume: {lastTankDelivery.productVolume} L</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>
                  Product TC volume: {lastTankDelivery.productTCVolume} L
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>
                  {" "}
                  Product density: {lastTankDelivery.productDensity} kg/m³
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Product mass: {lastTankDelivery.productMass} kg</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>
                  Pumps Dispensed Volume:{lastTankDelivery.pumpsDispensedVolume}{" "}
                  L
                </Text>
              </Flex>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );
};

export default LastTankDelivery;
