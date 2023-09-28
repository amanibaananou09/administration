import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
function formatDate(dateTime) {
  return new Date(dateTime).toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function TablesTableRow(props) {
  const {
    id,
    pump,
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
  const formattedDateTime = formatDate(DateTime);
  const formattedDateTimeStart = formatDate(DateTimeStart);
  return (
    <Tr>
      <Td minWidth={{ sm: "50px" }} pl="15px" borderColor={borderColor}>
        <Flex py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="sm"
              color={titleColor}
              fontWeight="bold"
              minWidth="100%"
              align="center"
            >
              {id}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td borderColor={borderColor}>
        <Flex direction="column">
          <Text
            fontSize="sm"
            align="center"
            color={textColor}
            fontWeight="bold"
          >
            {pump}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Button p="0px" bg="transparent" variant="no-effects">
          <Text
            fontSize="sm"
            align="center"
            color={titleColor}
            fontWeight="bold"
            pb=".5rem"
          >
            {fuelGrade}
          </Text>
        </Button>
      </Td>
      <Td borderColor={borderColor}>
        <Text
          fontSize="sm"
          align="center"
          color={textColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {volume}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Text
          fontSize="sm"
          align="center"
          color={textColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {price}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Text
          fontSize="sm"
          align="center"
          color={textColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {amount}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Text
          fontSize="sm"
          align="center"
          color={titleColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {formattedDateTimeStart}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Text
          fontSize="sm"
          align="center"
          color={titleColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {formattedDateTime}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
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
