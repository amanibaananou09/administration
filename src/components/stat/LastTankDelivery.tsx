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
export const LastTankDelivery = ({ tank }: LastTankRowProps) => {
  const [lastTank, setLastTank] = useState<TankDelivery[]>([]);
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

  useEffect(() => {
    const getAllLastTankDelivery = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getLastTankDelivery(selectedStation, tank);
        const tankArray = Array.isArray(result) ? result : [result];
        setLastTank(tankArray);
      } catch (error) {
        console.error(error);
      }
    };
    getAllLastTankDelivery();
  }, [selectedStation]);
  return (
    <Box p={4} maxW="600px" mx="auto">
      <Heading fontSize="l" fontWeight="semibold" textAlign="center">
        Last Tank Delivery
      </Heading>
      <Box borderBottom="1px solid #e5e5e5" my={4} />

      {lastTank.map((tank, index) => (
        <>
          <Heading fontSize="m" fontWeight="medium" mb={4}>
            - Date :
          </Heading>
          <Text textAlign="center" mb={2}>
            {tank.dateTime}
          </Text>
          <Heading fontSize="m" fontWeight="medium" mb={4}>
            - Delivery absolute values:
          </Heading>
          <List spacing={2}>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Product height: {tank.productHeight} mm</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Water height: {tank.waterHeight} mm</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Temperature: {tank.temperature} °C</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Product volume: {tank.productVolume} L</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Product TC volume: {tank.productTCVolume} L</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text> Product density: {tank.productDensity} kg/m³</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>Product mass: {tank.productMass} kg</Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                <Text>
                  {" "}
                  Pumps Dispensed Volume:{tank.pumpsDispensedVolume} L
                </Text>
              </Flex>
            </ListItem>
          </List>
        </>
      ))}
    </Box>
  );
};

export default LastTankDelivery;
