import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function TablesTableRow(props) {
  const {
    totalAmount,
    id,
    totalVolume,
    pump,
    nozzle,
    status,
    fuelGrade,
    state,
    volume,
    price,
    amount,
    DateTimeStart,
    DateTime,
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Tr>
      <Td
        minWidth={{ sm: "50px" }}
        pl="0px"
        borderColor={borderColor}
        //borderBottom={isLast ? "none" : null}
      >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={titleColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {id}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td borderColor={borderColor} >
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {pump}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor} >
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {nozzle}
        </Text>
      </Td>
      <Td borderColor={borderColor} >
        <Button p="0px" bg="transparent" variant="no-effects">
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {fuelGrade}
          </Text>
        </Button>
      </Td>
      <Td borderColor={borderColor} >
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {volume}
        </Text>
      </Td>
      <Td borderColor={borderColor} >
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {price}
        </Text>
      </Td>
      <Td borderColor={borderColor} >
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {amount}
        </Text>
      </Td>
      <Td borderColor={borderColor} >
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {totalVolume}
        </Text>
      </Td>
      <Td borderColor={borderColor} >
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {totalAmount}
        </Text>
      </Td>
      <Td borderColor={borderColor} >
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {DateTimeStart}
        </Text>
      </Td>
      <Td borderColor={borderColor} >
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {DateTime}
        </Text>
      </Td>
      <Td borderColor={borderColor} >
        <Badge
          bg={state === "Online" ? "green.400" : bgStatus}
          color={state === "Online" ? "white" : "white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {state}
        </Badge>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
