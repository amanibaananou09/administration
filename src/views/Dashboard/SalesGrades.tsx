import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, Stat, StatLabel, Text } from "@chakra-ui/react";
import { getAllSalesByGrades } from "common/api/statistique-api";
import { Filter } from "components/Filter/DashBoardFilter";
import useRefresher from "hooks/use-refresher";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Grades } from "../../common/model";
import Card from "../../components/Card/Card"; // Update the path to the Card component
import { useAuth } from "../../store/AuthContext";
import { useESSContext } from "../../store/ESSContext";

export const SalesGrades = (filter: Filter) => {
  const { period, fromDate, toDate } = filter;
  const { refresh } = useRefresher();
  const [grades, setGrades] = useState<Grades[]>([]);
  const [isContentVisible, setIsContentVisible] = useState(true);

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
          period,
          fromDate,
          toDate,
        );
        setGrades(result);
      } catch (error) {
        console.error(error);
      }
    };
    allStatGrades();
  }, [selectedStation, user, period, fromDate, toDate, refresh]);

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
                {Number(grade.totalSalesParVolume).toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                {t("common.litres")}{" "}
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
