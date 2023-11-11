import { Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import { TablesTableRowProps } from "common/model";
import { formatDate } from "utils/utils";

const TransactionTableRow = ({
  pump,
  fuelGrade,
  volume,
  price,
  amount,
  dateTimeStart,
}: TablesTableRowProps) => {
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const formattedDateTimeStart = formatDate(dateTimeStart);

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
        <Text fontSize="sm" align="center" color={textColor} fontWeight="bold">
          {fuelGrade}
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

export default TransactionTableRow;
