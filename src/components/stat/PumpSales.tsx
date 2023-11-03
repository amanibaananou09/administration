import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Circle,
  Flex,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { getAllSalesByPump } from "common/api/statistique-api";
import { periodeProps, SalesPump } from "common/model";
import Card from "components/Card/Card";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import pump from "../../assets/img/pump.png";
import SalesByGrades from "./SalesPump";

export const PumpSales = ({ periode }: periodeProps) => {
  const [salesPumps, setSalesPumps] = useState<SalesPump[]>([]);
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

  useEffect(() => {
    const fetchSalesByPump = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getAllSalesByPump(selectedStation, periode);
        setSalesPumps(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSalesByPump();
  }, [selectedStation, user, periode]);
  const [isContentVisible, setIsContentVisible] = useState(true);
  return (
    <>
      <Flex flexDirection="column">
        <Text fontSize="2xl" fontWeight="normal" display="inline">
          <Text as="span" fontWeight="bold" color="blue.700">
            Total Sales :
          </Text>{" "}
          {salesPumps.reduce((total, pump) => total + pump.allSales, 0)}{" "}
          {selectedStation?.country?.currency?.code}
        </Text>

        <br />
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
          <GridItem colSpan={1}></GridItem>
        </Grid>
        <br />
      </Flex>
      {isContentVisible && (
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="20px">
          {salesPumps.map((salesPump, index) => (
            <Card
              key={index}
              minH="125px"
              borderWidth="2px"
              borderColor="gray.500"
            >
              <Flex
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Circle size="25px" bg="yellow.600" color="white">
                  {salesPump.pumpId}
                </Circle>
                <Text
                  as="span"
                  color="blue.600"
                  fontWeight="normal"
                  p="3"
                  fontSize="lg"
                >
                  <Text
                    as="span"
                    fontWeight="bold"
                    color="blue.600"
                    display="inline"
                  >
                    Total :
                  </Text>{" "}
                  {salesPump.pumpSales}{" "}
                  <Text
                    as="span"
                    fontWeight="bold"
                    color="blue.600"
                    display="inline"
                  >
                    {selectedStation?.country?.currency?.code}
                  </Text>
                </Text>
                <Image src={pump} height="75%" width="15%" />
              </Flex>
              <Text as="span" fontWeight="bold" color="blue.600">
                <SalesByGrades pumpId={salesPump.pumpId} periode={periode} />
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default PumpSales;
