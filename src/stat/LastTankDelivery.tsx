import React from "react";
import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

function LastTankDelivery() {
  return (
    
      
      <Box p={4} maxW="600px" mx="auto">
      <Heading fontSize="l" fontWeight="semibold" textAlign="center">
          Last Tank Delivery
        </Heading>
        <Box borderBottom="1px solid #e5e5e5" my={4} />
        <Heading fontSize="m" fontWeight="medium" mb={4} >
          - Measurements on start:
        </Heading>
        <Text textAlign="center">2022.05.23 15:20:00</Text>

        <Heading fontSize="m" fontWeight="medium" mb={4} >
         - Measurements on end:
        </Heading>
        <Text textAlign="center">2022.05.23 15:30:00</Text>

        <Heading fontSize="m" fontWeight="medium" mb={4}>
         - Delivery absolute values:
        </Heading>
        <List spacing={2}>
          <ListItem>
            <Flex alignItems="center">
              <Icon as={MdCheckCircle} color="green.500" mr={2} />
              <Text>Product height: 250 mm</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex alignItems="center">
              <Icon as={MdCheckCircle} color="green.500" mr={2} />
              <Text>Water height: 10 mm</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex alignItems="center">
              <Icon as={MdCheckCircle} color="green.500" mr={2} />
              <Text>Temperature: 0.2 °C</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex alignItems="center">
              <Icon as={MdCheckCircle} color="green.500" mr={2} />
              <Text>Product volume: 5000 L</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex alignItems="center">
              <Icon as={MdCheckCircle} color="green.500" mr={2} />
              <Text>Product TC volume: 19900 L</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex alignItems="center">
              <Icon as={MdCheckCircle} color="green.500" mr={2} />
              <Text> Product density: 769.3 kg/m³</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex alignItems="center">
              <Icon as={MdCheckCircle} color="green.500" mr={2} />
              <Text>Product mass: 15200 kg</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex alignItems="center">
              <Icon as={MdCheckCircle} color="green.500" mr={2} />
              <Text> Pumps dispensed volume:4032648.17 L</Text>
            </Flex>
          </ListItem>
        </List>
      </Box>
    
  );
}

export default LastTankDelivery;
