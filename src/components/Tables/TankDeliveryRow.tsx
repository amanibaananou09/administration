import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import { TankDeliveryRowProps } from "common/react-props";

const TankDeliveryRow = ({
  tank,
  fuelGradeName,
  productHeight,
  waterHeight,
  temperature,
  productVolume,
}: TankDeliveryRowProps) => {
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
            pb=".5rem"
          >
            {tank}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Text
          fontSize="sm"
          align="center"
          color={textColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {productVolume}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Flex direction="column">
          <Text
            fontSize="sm"
            align="center"
            color={textColor}
            fontWeight="bold"
          >
            {fuelGradeName}
          </Text>
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
            {productHeight}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Text
          fontSize="sm"
          align="center"
          color={textColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {waterHeight}
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
          {temperature}
        </Text>
      </Td>
    </Tr>
  );
};

export default TankDeliveryRow;
