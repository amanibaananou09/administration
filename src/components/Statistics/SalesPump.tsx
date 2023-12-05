import { Box, Flex, Text } from "@chakra-ui/react";
import { getAllSalesByPumpAndGrades } from "common/api/statistique-api";
import { REFRESHER_TOPIC } from "common/api/WebSocketTopics";
import { SalesPumpGrades } from "common/model";
import { SalesPumpGradesRowProps } from "common/react-props";
import { useEffect, useState } from "react";
import { useSubscription } from "react-stomp-hooks";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import Card from "../Card/Card";

export const SalesByGrades = ({
  pumpId,
  period,
  startDate,
  endDate,
}: SalesPumpGradesRowProps) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pumpGrades, setPumpGrades] = useState<SalesPumpGrades[]>([]);
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

  useSubscription(REFRESHER_TOPIC, () => {
    setRefresh((prev) => !prev);
  });

  useEffect(() => {
    const getAllLastTankDelivery = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getAllSalesByPumpAndGrades(
          pumpId,
          selectedStation,
          period,
          startDate,
          endDate,
        );
        setPumpGrades(result);
      } catch (error) {
        console.error(error);
      }
    };
    getAllLastTankDelivery();
  }, [selectedStation, pumpId, period, startDate, endDate, refresh]);
  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Card minH="125px" m="5" width="300px">
        <Box borderBottom="2px solid #e5e5e5" my={2} />
        {pumpGrades.map((pumpGrade, index) => (
          <Flex key={index}>
            <Text fontWeight="normal" mb={2}>
              {pumpGrade.fuelGrade} :{" "}
              {pumpGrade.totalSalesParAmount.toLocaleString()}{" "}
              <Text
                as="span"
                fontWeight="bold"
                color="blue.600"
                display="inline"
              >
                {selectedStation?.country?.currency?.code}
              </Text>
            </Text>
          </Flex>
        ))}
      </Card>
    </Flex>
  );
};

export default SalesByGrades;
