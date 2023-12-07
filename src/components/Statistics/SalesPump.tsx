import { Box, Flex, Text } from "@chakra-ui/react";
import { getAllSalesByPumpAndGrades } from "common/api/statistique-api";
import { SalesPumpGrades } from "common/model";
import { SalesPumpGradesRowProps } from "common/react-props";
import useRefresher from "hooks/use-refresher";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import Card from "../Card/Card";

export const SalesByGrades = ({
  pumpId,
  startDate,
  endDate,
}: SalesPumpGradesRowProps) => {
  const { refresh } = useRefresher();
  const [pumpGrades, setPumpGrades] = useState<SalesPumpGrades[]>([]);
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

  useEffect(() => {
    const getAllLastTankDelivery = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getAllSalesByPumpAndGrades(
          pumpId,
          selectedStation,
          startDate,
          endDate,
        );
        setPumpGrades(result);
      } catch (error) {
        console.error(error);
      }
    };
    getAllLastTankDelivery();
  }, [selectedStation, pumpId, startDate, endDate, refresh]);
  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Card m="5">
        <Box borderBottom="2px solid #e5e5e5" my={2} />
        {pumpGrades.map((pumpGrade, index) => (
          <Flex key={index}>
            <Text fontWeight="normal" color="blue.600" mb={2}>
              {pumpGrade.fuelGrade} :{" "}
              {pumpGrade.totalSalesParAmount.toLocaleString()}{" "}
              <Text as="span" fontWeight="bold" display="inline">
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
