import { Box, Circle, Flex, Grid, GridItem, Image, SimpleGrid, Stat, StatLabel, Text } from "@chakra-ui/react";
import Card from "../components/Card/Card";
import React, { useEffect, useState } from "react";
import { SalesPump } from "../common/model";
import { useAuth } from "../store/AuthContext";
import { useESSContext } from "../store/ESSContext";
import { getAllSalesByPump } from "../common/api";
import pump from "../assets/img/pump.png";
import SalesByGrades from "./SalesPump";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

function PumpSales() {
  const [salesPumps, setSalesPumps] = useState<SalesPump[]>([]);
  const { user } = useAuth();
  const [pumpId, setPumpId] = useState<number>(0);
  const [allSales, setAllSales] = useState<number>(0);
  const [pumpSales, setPumpSales] = useState<number>(0);
  const {
    selectedStation: {
      controllerPts: { id: controllerId },
      country: { currency: { code } }
    }
  } = useESSContext();
  const token = user?.token || "";

  useEffect(() => {
    const fetchSalesByPump = async () => {
      try {
        const result = await getAllSalesByPump(
          pumpId,
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
  const [isContentVisible, setIsContentVisible] = useState(true);

  return (
    <>
      <Flex flexDirection="column">
        <Text fontSize="2xl" fontWeight="normal" display="inline">
          <Text as="span" fontWeight="bold" color="blue.700">Total Sales :</Text>{' '}
          {salesPumps.reduce((total, pump) => total + pump.allSales, 0)} {code}
        </Text>

        <br/>
        <Flex display="flex" alignItems="center" justifyContent="space-between">
        <Text
          as="span"
          fontSize="2xl"
          fontWeight="bold"
          color="blue.700"
          display="inline"
          onClick={() => setIsContentVisible(!isContentVisible)}
        >
          Pumps :{" "}
          {isContentVisible ? <TriangleUpIcon /> : <TriangleDownIcon />}
        </Text>
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <GridItem colSpan={1}>
          </GridItem>
        </Grid>
        <br />
      </Flex>
      {isContentVisible && (
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="20px">
        {salesPumps.map((salesPump, index) => (
          <Card key={index} minH="125px" borderWidth="2px" borderColor="gray.500">
            <Flex display="flex" alignItems="center" justifyContent="space-between">
              <Circle size="25px" bg="yellow.600" color="white">
                {salesPump.pumpId}
              </Circle>
              <Text as="span" color="blue.600" fontWeight="normal" p="3" fontSize="lg">
                <Text as="span" fontWeight="bold" color="blue.600" display="inline">
                  Total :
                </Text>{" "}
                {salesPump.pumpSales}{" "}
                <Text as="span" fontWeight="bold" color="blue.600" display="inline">
                  {code}
                </Text>
              </Text>
              <Image src={pump} height="75%" width="15%" />
            </Flex>
            <Text as="span" fontWeight="bold" color="blue.600" >
            <SalesByGrades  pumpId={salesPump.pumpId}/>
            </Text>
          </Card>
        ))}
      </SimpleGrid>
      )}
    </>
  );
}

export default PumpSales;
