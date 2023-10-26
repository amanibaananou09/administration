import { SimpleGrid, Stat, StatLabel, Text } from "@chakra-ui/react";
import Card from "../components/Card/Card";
import React, { useEffect, useState } from "react";
import { SalesPump } from "../common/model";
import { useAuth } from "../store/AuthContext";
import { useESSContext } from "../store/ESSContext";
import { getAllSalesByPump } from "../common/api";


function PumpSales() {

  const [SalesPump, setSalesPump] = useState<SalesPump[]>([]);
  const { user } = useAuth();
  const [pumpId, setPumpId] = useState<number>(0);
  const [allSales, setAllSales] = useState<number>(0);
  const [pumpSales, setPumpSales] = useState<number>(0);

  const {
    selectedStation: {
      controllerPts: { id: controllerId },
      country: { currency: { code } }
    },
  } = useESSContext();
  const token = user?.token || "";

  useEffect(() => {
    const allStatByPump = async () => {
      try {
        const result = await getAllSalesByPump(
          pumpId,
          allSales,
          pumpSales,
          controllerId,
          token,
        );
        setSalesPump(result);
      } catch (error) {
        console.error(error);
      }
    };
    allStatByPump();
  }, [pumpId, allSales, pumpSales, controllerId, token]);


  return (
  <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="20px">
    {SalesPump.map((SalesPump, index) => (
      <Card key={index} minH="125px" borderWidth="2px" borderColor="gray.500">
        <Stat me="auto">
          <StatLabel fontSize="lg" color="teal.500" fontWeight="semibold" textTransform="capitalize" >
            Pump : {SalesPump.pumpId}
          </StatLabel>
        </Stat>
        <Text as="span" color="blue.600" fontWeight="normal" p="3" fontSize="sm">
          Total Sales : {SalesPump.allSales}{' '}
          <Text as="span" fontWeight="bold" color="blue.600" display="inline">
            {code}
          </Text>
          <br />
          Sales By Pump : {SalesPump.pumpSales}{' '}
          <Text as="span" fontWeight="bold" color="blue.600" display="inline">
            {code}
          </Text>
        </Text>
      </Card>
    ))}
  </SimpleGrid>
);
};

export default PumpSales;