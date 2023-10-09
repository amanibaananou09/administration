import React from "react";
import {
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  CSSObject,
} from "@chakra-ui/react";

interface TankDeliveryRowProps {
  tank: string;
  fuelGradeName: string;
  productHeight: string;
  waterHeight: string;
  temperature: string;
  productVolume: string;
}

const TankDeliveryRow: React.FC<TankDeliveryRowProps> = ({
  tank,
  fuelGradeName,
  productHeight,
  waterHeight,
  temperature,
  productVolume,
}: TankDeliveryRowProps) => {
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const tdStyle: CSSObject = {
    borderColor: borderColor,
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "50px" }} pl="45px" {...tdStyle}>
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
      <Td {...tdStyle}>
        <Text fontSize="sm" align="center" color={textColor} fontWeight="bold" pb=".5rem">
          {productVolume}
        </Text>
      </Td>
      <Td {...tdStyle}>
        <Flex direction="column">
          <Text fontSize="sm" align="center" color={textColor} fontWeight="bold">
            {fuelGradeName}
          </Text>
        </Flex>
      </Td>
      <Td {...tdStyle}>
        <Flex direction="column">
          <Text fontSize="sm" align="center" color={textColor} fontWeight="bold">
            {productHeight}
          </Text>
        </Flex>
      </Td>
      <Td {...tdStyle}>
        <Text fontSize="sm" align="center" color={textColor} fontWeight="bold" pb=".5rem">
          {waterHeight}
        </Text>
      </Td>
      <Td {...tdStyle}>
        <Text fontSize="sm" align="center" color={textColor} fontWeight="bold" pb=".5rem">
          {temperature}
        </Text>
      </Td>
    </Tr>
  );
};

export default TankDeliveryRow;
