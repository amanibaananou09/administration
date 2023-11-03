import React, { useState, useEffect } from "react";
import { useESSContext } from "store/ESSContext";
import { useAuth } from "store/AuthContext";
import { SalesPumpGrades, SalesPumpGradesRowProps } from "common/model";
import { getAllSalesByPumpAndGrades } from "common/api";
import { Box, Heading, Text } from "@chakra-ui/react";

export const SalesByGrades = ({ pumpId }: SalesPumpGradesRowProps) => {
  const [pumpGrades, setPumpGrades] = useState<SalesPumpGrades[]>([]);
  const { user } = useAuth();
  const { selectedStation} = useESSContext();

  useEffect(() => {
    const getAllLastTankDelivery = async () => {
    if (!selectedStation|| !user) {
            return;
          }
      try {
        const result = await getAllSalesByPumpAndGrades(pumpId, selectedStation, user);
        const tankArray = Array.isArray(result) ? result : [result];
        setPumpGrades(tankArray);
      } catch (error) {
        console.error(error);
      }
    };
    getAllLastTankDelivery();
  }, [selectedStation,pumpId, selectedStation]);

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Box borderBottom="1px solid #e5e5e5" my={4} />
      {pumpGrades.map((pumpGrade, index) => (
        <div key={pumpGrade.pumpId}>
          <Text fontWeight="normal" mb={2}>
            {pumpGrade.fuelGrade} : {pumpGrade.totalSalesParAmount} {" "}
            <Text as="span" fontWeight="bold" color="blue.600" display="inline">
              {selectedStation?.country?.currency?.code}
            </Text>
          </Text>
        </div>
      ))}
    </Box>
  );
};

export default SalesByGrades;
