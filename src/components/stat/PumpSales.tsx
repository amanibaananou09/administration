import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Circle, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";

import { getAllSalesByPump } from "common/api/statistique-api";
import { SalesPump } from "common/model";
import { PeriodeProps } from "common/react-props";
import Card from "components/Card/Card";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import pump from "../../assets/img/pump.png";
import SalesByGrades from "./SalesPump";
import { useTranslation } from "react-i18next";

export const PumpSales = ({ periode, startDate, endDate }: PeriodeProps) => {
  const [salesPumps, setSalesPumps] = useState<SalesPump[]>([]);
  const { user } = useAuth();
  const { selectedStation } = useESSContext();
  const { t } = useTranslation("dashboard");

  useEffect(() => {
    const fetchSalesByPump = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getAllSalesByPump(
          selectedStation,
          periode,
          startDate,
          endDate,
        );
        setSalesPumps(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSalesByPump();
  }, [selectedStation, user, periode, startDate, endDate]);
  const [isContentVisible, setIsContentVisible] = useState(true);
  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="normal" display="inline">
          <Text as="span" fontWeight="bold" color="blue.700">
          {t("pumpSales.totalSales")} :
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
            {t("common.pump")} :
            {isContentVisible ? <TriangleUpIcon /> : <TriangleDownIcon />}
          </Text>
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <GridItem colSpan={1}></GridItem>
        </Grid>
        <br />
      </Flex>
      {isContentVisible && (
        <Flex flexWrap="wrap">
          {salesPumps.map((salesPump, index) => (
            <Card key={index} minH="100px" m="5" width="400px">
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
                    {t("pumpSales.total")} :
                  </Text>
                  {salesPump.pumpSales}
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
                <SalesByGrades
                  pumpId={salesPump.pumpId}
                  periode={periode}
                  startDate={startDate}
                  endDate={endDate}
                />
              </Text>
            </Card>
          ))}
        </Flex>
      )}
    </>
  );
};

export default PumpSales;
