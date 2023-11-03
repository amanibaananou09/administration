import { Box, Flex, Text } from "@chakra-ui/react";
import { getAllSalesByPumpAndGrades } from "common/api/statistique-api";
import { SalesPumpGrades, SalesPumpGradesRowProps } from "common/model";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";

export const SalesByGrades = ({ pumpId, periode }: SalesPumpGradesRowProps) => {
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
        );
        setPumpGrades(result);
      } catch (error) {
        console.error(error);
      }
    };
    getAllLastTankDelivery();
  }, [selectedStation, pumpId, periode]);
  return (
    <Box p={4} maxW="600px" mx="auto">
      <Box borderBottom="1px solid #e5e5e5" my={4} />
      {pumpGrades.map((pumpGrade) => (
        <Flex>
          <Text fontWeight="normal" mb={2}>
            {pumpGrade.fuelGrade} : {pumpGrade.totalSalesParAmount}{" "}
            <Text as="span" fontWeight="bold" color="blue.600" display="inline">
              {selectedStation?.country?.currency?.code}
            </Text>
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default SalesByGrades;
