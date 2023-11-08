import { Box, Flex, Text } from "@chakra-ui/react";
import { getAllSalesByPumpAndGrades } from "common/api/statistique-api";
import { SalesPumpGrades, SalesPumpGradesRowProps } from "common/model";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import Card from "../Card/Card";

export const SalesByGrades = ({
                                pumpId,
                                periode,
                                startDate,
                                endDate
                              }: SalesPumpGradesRowProps) => {
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
          periode,
          startDate,
          endDate
        );
        setPumpGrades(result);
      } catch (error) {
        console.error(error);
      }
    };
    getAllLastTankDelivery();
  }, [selectedStation, pumpId, periode, startDate, endDate]);
  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Card minH="125px" m="5" width="300px">
        <Box borderBottom="2px solid #e5e5e5" my={2} />
        {pumpGrades.map((pumpGrade, index) => (
          <Flex key={index}>
            <Text fontWeight="normal" mb={2}>
              {pumpGrade.fuelGrade} : {pumpGrade.totalSalesParAmount}{" "}
              <Text as="span" fontWeight="bold" color="blue.600" display="inline">
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
