import {
  Box,
  Circle,
  Flex,
  Image,
  Stat,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { TankMeasurementRowProps } from "common/model";
import Card from "components/Card/Card";
import LastTankDelivery from "components/stat/LastTankDelivery";
import tankImg from "../../assets/img/tank.png";

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

export const TankMeasurement = ({
  tankMeasurement,
}: TankMeasurementRowProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const boxHeight = `${tankMeasurement.percentage}%`;
  const circleColor = tankMeasurement.percentage <= 20 ? "red" : "green";
  const tankLevel = tankMeasurement.percentage;
  const boxColor = getColorForLevel(tankLevel);

  return (
    <Card minH="125px" m="5" width="500px">
      <Flex alignItems="center">
        <Circle size="25px" bg={circleColor} color="white">
          {tankMeasurement.tank}
        </Circle>

        <Stat flex="1" textAlign="left">
          <Text
            as="span"
            fontWeight="semibold"
            textAlign="center"
            p="10px"
            borderBottom="1px solid black"
          >
            {tankMeasurement.fuelGrade}
          </Text>
        </Stat>
        <Tooltip
          label={<LastTankDelivery tankId={tankMeasurement.tank} />}
          placement="auto"
          hasArrow
        >
          <Image src={tankImg} height="75%" width="15%" />
        </Tooltip>
      </Flex>

      <Flex direction="row">
        <Flex
          flexDirection="column"
          justifyContent="center"
          w="100%"
          height="150px"
        >
          <Flex alignItems="center">
            <Text fontSize="xl" fontWeight="semibold" color={textColor}>
              <Text
                as="span"
                textAlign="center"
                color="gray.600"
                fontWeight="normal"
                p="0"
              >
                Product volume:
              </Text>
              {tankMeasurement.productVolume}L
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Text fontSize="xl" fontWeight="semibold" color={textColor}>
              <Text
                as="span"
                textAlign="center"
                color="gray.600"
                fontWeight="normal"
                p="0"
              >
                Water volume:
              </Text>
              {tankMeasurement.waterVolume}L
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Text fontSize="xl" fontWeight="semibold" color={textColor}>
              <Text
                as="span"
                textAlign="center"
                color="gray.600"
                fontWeight="normal"
                p="0"
              >
                Temperature:
              </Text>
              {tankMeasurement.temperature}°C
            </Text>
          </Flex>
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
            {tankMeasurement.percentage}%
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};
