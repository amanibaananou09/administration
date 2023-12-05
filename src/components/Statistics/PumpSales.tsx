import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Circle, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";

import { getAllSalesByPump } from "common/api/statistique-api";
import { SalesPump } from "common/model";
import Card from "components/Card/Card";
import { Filter } from "components/Filter/DashBoardFilter";
import useRefresher from "hooks/use-refresher";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import pump from "../../assets/img/pump.png";
import SalesByGrades from "./SalesPump";

export const PumpSales = ({ period, fromDate, toDate }: Filter) => {
  const { refresh } = useRefresher();
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
          period,
          fromDate,
          toDate,
        );
        setSalesPumps(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSalesByPump();
  }, [selectedStation, user, period, fromDate, toDate, refresh]);
  const [isContentVisible, setIsContentVisible] = useState(true);
  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="normal" display="inline">
          <Text
            as="span"
            fontSize="3xl"
            fontWeight="blod"
            color="white"
            fontFamily="monospace"
          >
            {t("pumpSales.totalSales")} :
          </Text>{" "}
          <Text
            as="span"
            fontSize="40px"
            fontWeight="blod"
            color="greenyellow"
            fontFamily="monospace"
          >
            {salesPumps
              .reduce((total, pump) => pump.allSales, 0)
              .toLocaleString()}{" "}
            {selectedStation?.country?.currency?.code}
          </Text>
        </Text>
        <br />
        <Flex display="flex" alignItems="center" justifyContent="space-between">
          <Text
            as="span"
            fontSize="3xl"
            fontWeight="blod"
            color="white"
            fontFamily="monospace"
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
                    {t("pumpSales.total")} :{" "}
                  </Text>
                  {salesPump.pumpSales.toLocaleString()}{" "}
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
                  period={period}
                  startDate={fromDate}
                  endDate={toDate}
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
