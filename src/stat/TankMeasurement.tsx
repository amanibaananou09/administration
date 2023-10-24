import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Stat,
  useColorModeValue,
  Circle,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import RaportTankMeasurement from "../components/Modal/RaportTankMeasurement";

function TankMeasurement() {
  const [tankLevel, setTankLevel] = useState<number>(60);
  const textColor = useColorModeValue("gray.700", "white");
  const boxHeight = `${tankLevel}%`;
  const getColorForLevel = (level: number): string => {
    if (level >= 90) {
      return "#07C100";
    } else if (level >= 60) {
      return "#1FC32F";
    } else if (level >= 50) {
      return "#EAA817";
    } else if (level >= 30) {
      return "#EA8B17";
    } else {
      return "#E02200";
    }
  };

  const [boxColor, setBoxColor] = useState<string>("");
  const circleColor = tankLevel <= 20 ? "red" : "green";

  useEffect(() => {
    setBoxColor(getColorForLevel(tankLevel));
  }, [tankLevel]);

  return (
    <Card minH="125px">
      <Flex>
        <Circle size="25px" bg={circleColor} color="white">
          1
        </Circle>

        <Stat flex="1" textAlign="left">
          <Text
            as="span"
            fontWeight="semibold"
            textAlign="center"
            p="10px"
            borderBottom="1px solid black"
          >
            Gasoil
          </Text>
        </Stat>
      </Flex>
      <Flex direction="row">
        <Flex flexDirection="column" justify="center" w="200%" height="150px">
          <Flex textAlign="left">
            <Text fontSize="m" fontWeight="semibold" color={textColor}>
              <Text as="span" color="gray.600" fontWeight="normal" p="2">
                Product volume:
              </Text>
              5000 L
            </Text>
          </Flex>
          <Text fontSize="m" fontWeight="semibold" color={textColor}>
            <Text as="span" color="gray.600" fontWeight="normal" p="2">
              Water volume:
            </Text>
            100 L
          </Text>
          <Text fontSize="m" fontWeight="semibold" color={textColor}>
            <Text as="span" color="gray.600" fontWeight="normal" p="2">
              Temperature:
            </Text>
            0.2°C
          </Text>
        </Flex>
        <Box
          width="100px"
          height="100%"
          backgroundColor="#e5e5e5"
          borderRadius="10px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box
            width="100px"
            height={boxHeight}
            backgroundColor={boxColor}
            borderRadius="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontWeight="bold"
          >
            {tankLevel}%
          </Box>
        </Box>
      </Flex>
    </Card>
  );
}

export default TankMeasurement;
