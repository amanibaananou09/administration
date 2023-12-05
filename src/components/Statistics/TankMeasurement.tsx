import { Box, Circle, Flex, Stat, Text } from "@chakra-ui/react";
import { TankMeasurementRowProps } from "common/react-props";
import Card from "components/Card/Card";
import LastTankDeliveryTooltip from "components/Statistics/LastTankDeliveryTooltip";
import { useTranslation } from "react-i18next";
import { getColorForTankLevel } from "utils/utils";

export const TankMeasurement = ({
  tankMeasurement,
}: TankMeasurementRowProps) => {
  const tankLevel = tankMeasurement.percentage;
  const { t } = useTranslation("dashboard");

  //styles
  const textColor = "gray.700";
  const boxHeight = `${tankMeasurement.percentage}%`;
  const circleColor = tankMeasurement.percentage <= 20 ? "red" : "green";
  const boxColor = getColorForTankLevel(tankLevel);

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
        <LastTankDeliveryTooltip tankId={tankMeasurement.tank} />
      </Flex>

      <Flex direction="row">
        <Flex
          flexDirection="column"
          justifyContent="center"
          w="100%"
          height="150px"
        >
          <Flex alignItems="center">
            <Text fontSize="sm" fontWeight="semibold" color={textColor}>
              <Text
                as="span"
                textAlign="center"
                color="gray.600"
                fontWeight="normal"
                display="inline"
                fontSize="sm"
                p="0"
              >
                {t("common.productVolume")}:{" "}
              </Text>
              {tankMeasurement.productVolume} {""} L
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Text fontSize="sm" fontWeight="semibold" color={textColor}>
              <Text
                as="span"
                textAlign="center"
                color="gray.600"
                fontWeight="normal"
                display="inline"
                fontSize="sm"
                p="0"
              >
                {t("tankMeasurement.watervolume")}:{" "}
              </Text>
              {tankMeasurement.waterVolume}
              {""} L
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Text fontSize="sm" fontWeight="semibold" color={textColor}>
              <Text
                as="span"
                textAlign="center"
                color="gray.600"
                fontWeight="normal"
                display="inline"
                fontSize="sm"
                p="0"
              >
                {t("common.temperature")}:{" "}
              </Text>
              {tankMeasurement.temperature}
              {""} °C
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
