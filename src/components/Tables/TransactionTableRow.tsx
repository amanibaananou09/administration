import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import { TransactionTableRowProps } from "common/react-props";
import { formatDate } from "utils/utils";

const TransactionTableRow = ({
  pump,
  fuelGrade,
  volume,
  totalVolume,
  price,
  //tag,
  amount,
  totalAmount,
  dateTimeStart,
}: TransactionTableRowProps) => {
  const formattedDateTimeStart = formatDate(dateTimeStart);

  //styles
  const textColor = "gray.500";
  const borderColor = "gray.200";

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
          {price.toLocaleString()}
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
          {volume.toLocaleString()}
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
          {totalVolume.toLocaleString()}
        </Text>
      </Td>
      {/*<Td borderColor={borderColor}>
        <Text
          fontSize="sm"
          align="center"
          color={textColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {tag}
        </Text>
      </Td>*/}
      <Td borderColor={borderColor}>
        <Text
          fontSize="sm"
          align="center"
          color={textColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {amount.toLocaleString()}
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
          {totalAmount.toLocaleString()}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Text
          fontSize="sm"
          align="center"
          color="gray.700"
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
