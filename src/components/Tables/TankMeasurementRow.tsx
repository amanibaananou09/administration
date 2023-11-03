import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Stat,
  useColorModeValue,
  Circle,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import LastTankDelivery from "components/stat/LastTankDelivery";
import tank from "../../assets/img/tank.png";
import { TankMeasurementRowProps } from "common/model";

export const TankMeasurementRow = ({ row }: TankMeasurementRowProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const boxHeight = `${row.percentage}%`;
  const circleColor = row.percentage <= 20 ? "red" : "green";
  const [tankLevel, setTankLevel] = useState<number>(row.percentage);
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
  useEffect(() => {
    setBoxColor(getColorForLevel(tankLevel));
  }, [tankLevel]);
  return (
    <Card minH="125px" m="5">
      <Flex>
        <Circle size="25px" bg={circleColor} color="white">
          {row.tank}
        </Circle>

        <Stat flex="1" textAlign="left">
          <Text
            as="span"
            fontWeight="semibold"
            textAlign="center"
            p="10px"
            borderBottom="1px solid black"
          >
            {row.fuelGrade}
          </Text>
        </Stat>
        <Tooltip label={<LastTankDelivery tank={row.tank} />} hasArrow>
          <Image src={tank} height="75%" width="15%" />
        </Tooltip>
      </Flex>

      <Flex direction="row" >
        <Flex flexDirection="column" justify="center" w="550%" height="150px">
          <Flex >
            <Text fontSize="m" fontWeight="semibold" color={textColor}>
              <Text as="span" color="gray.600" fontWeight="normal" p="0">
                Product volume:
              </Text>
              {row.productVolume}L
            </Text>
          </Flex>
          <Flex >
            <Text fontSize="m" fontWeight="semibold" color={textColor}>
              <Text as="span" color="gray.600" fontWeight="normal" p="0">
                Water volume:
              </Text>
              {row.waterVolume}L
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="m" fontWeight="semibold" color={textColor} >
              <Text as="span" color="gray.600" fontWeight="normal" p="0">
                Temperature:
              </Text>
              {row.temperature}°C
            </Text>
          </Flex>
        </Flex>

        <Box mr={10}></Box>
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
            {row.percentage}%
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};
