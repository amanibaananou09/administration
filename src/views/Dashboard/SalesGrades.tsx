import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, Stat, StatLabel, Text } from "@chakra-ui/react";
import { getAllSalesByGrades } from "common/api/statistique-api";
import { PeriodeProps } from "common/react-props";
import { useEffect, useState } from "react";
import { Grades } from "../../common/model";
import Card from "../../components/Card/Card"; // Update the path to the Card component
import { useAuth } from "../../store/AuthContext";
import { useESSContext } from "../../store/ESSContext";
import { useTranslation } from "react-i18next";

export const SalesGrades = ({ periode, startDate, endDate }: PeriodeProps) => {
  const [grades, setGrades] = useState<Grades[]>([]);
  const { user } = useAuth();

  const { selectedStation } = useESSContext();
  const { t } = useTranslation("dashboard");

  useEffect(() => {
    const allStatGrades = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getAllSalesByGrades(
          selectedStation,
          periode,
          startDate,
          endDate,
        );
        setGrades(result);
      } catch (error) {
        console.error(error);
      }
    };
    allStatGrades();
  }, [selectedStation, user, periode, startDate, endDate]);
  const [isContentVisible, setIsContentVisible] = useState(true);

  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Text
        as="span"
        fontSize="3xl"
        fontWeight="blod"
        color="white"
        fontFamily="monospace"
        display="inline"
        onClick={() => setIsContentVisible(!isContentVisible)}
      >
        {t("common.fuelGrades")} :{" "}
        {isContentVisible ? <TriangleUpIcon /> : <TriangleDownIcon />}
      </Text>
      <br />
      {isContentVisible && (
        <Flex flexWrap="wrap">
          {grades.map((grade, index) => (
            <Card key={index} minH="125px" m="5" width="500px">
              <Stat me="auto">
                <Flex justify="center" align="center">
                  <StatLabel
                    fontSize="2xl"
                    color="teal.500"
                    fontWeight="semibold"
                    textTransform="capitalize"
                  >
                    {grade.fuelGrade}
                  </StatLabel>
                </Flex>
              </Stat>
              <br />
              <Text
                as="span"
                fontWeight="bold"
                color="blue.600"
                display="inline"
                fontSize="xl"
              >
                {t("salesGrades.totalSalesVolume")}:{" "}
                {grade.totalSalesParVolume.toFixed(2)} Litres{" "}
              </Text>
              <Text
                as="span"
                color="blue.600"
                fontWeight="normal"
                p="3"
                fontSize="sm"
              >
                {t("salesGrades.totalSalesAmount")}:{" "}
                {grade.totalSalesParAmount.toLocaleString()}{" "}
                <Text
                  as="span"
                  fontWeight="bold"
                  color="blue.600"
                  display="inline"
                  fontSize="sm"
                >
                  {selectedStation?.country.currency.code}
                </Text>
                <br />
              </Text>
            </Card>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default SalesGrades;
