import { Circle, Flex, SimpleGrid, Stat, StatLabel, Text } from "@chakra-ui/react";
import Card from "../components/Card/Card";
import React, { useEffect, useState } from "react";
import { SalesPump } from "../common/model";
import { useAuth } from "../store/AuthContext";
import { useESSContext } from "../store/ESSContext";
import { getAllSalesByPump } from "../common/api";

function PumpSales() {
  const [salesPumps, setSalesPumps] = useState<SalesPump[]>([]);
  const { user } = useAuth();
  const [pumpId, setPumpId] = useState<number>(0);
  const [allSales, setAllSales] = useState<number>(0);
  const [pumpSales, setPumpSales] = useState<number>(0);
  const {
    selectedStation: {
      controllerPts: { id: controllerId },
      country: { currency: { code } },
    },
  } = useESSContext();
  const token = user?.token || "";

  useEffect(() => {
    const fetchSalesByPump = async () => {
      try {
        const result = await getAllSalesByPump(
          pumpId,
          allSales,
          pumpSales,
          controllerId,
          token
        );
        setSalesPumps(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSalesByPump();
  }, [pumpId, allSales, pumpSales, controllerId, token]);

  return (
    <>
      <Flex flexDirection="column">
        <Text as="span" fontSize="2xl" fontWeight="bold" color="blue.600" display="inline">
          Total Sales : {salesPumps.reduce((total, pump) => total + pump.allSales, 0)}{" "}
          {code}
        </Text>
        <br />
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="20px">
        {salesPumps.map((salesPump, index) => (
          <Card key={index} minH="125px" borderWidth="2px" borderColor="gray.500">
            <Stat me="auto">
              <Circle size="25px" bg="yellow.600" color="white">
                {salesPump.pumpId}
              </Circle>
            </Stat>
            <Text as="span" color="blue.600" fontWeight="normal" p="3" fontSize="sm">
              Sales By Pump : {salesPump.pumpSales}{" "}
              <Text as="span" fontWeight="bold" color="blue.600" display="inline">
                {code}
              </Text>
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default PumpSales;
