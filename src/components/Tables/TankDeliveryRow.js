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

function TankDeliveryRow(props) {
  const {
    tank,
    fuelGradeName,
    productHeight,
    waterHeight,
    temperature,
    productVolume,
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  return (
    <Tr>
      <Td minWidth={{ sm: "50px" }} pl="45px" borderColor={borderColor}>
        <Flex py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="sm"
              color={titleColor}
              fontWeight="bold"
              minWidth="100%"
              align="center"
            >
              {tank}
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
            {productHeight}
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
            {fuelGradeName}
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
    </Tr>
  );
}

export default TankDeliveryRow;
