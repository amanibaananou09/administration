import React from "react";
import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

interface TablesTableRowProps {
  pump: string;
  fuelGrade: string;
  volume: number;
  price: number;
  amount: number;
  DateTimeStart: string;
}

function formatDate(DateTimeStart: string): string {
  return new Date(DateTimeStart).toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const TablesTableRow: React.FC<TablesTableRowProps> = ({
  pump,
  fuelGrade,
  volume,
  price,
  amount,
  DateTimeStart,
}: TablesTableRowProps) => {
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const formattedDateTimeStart = formatDate(DateTimeStart);

  return (
    <Tr>
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
            color={textColor}
            fontWeight="bold"
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
    </Tr>
  );
};

export default TablesTableRow;
