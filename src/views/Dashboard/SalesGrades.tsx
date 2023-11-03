import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card"; // Update the path to the Card component
import { SimpleGrid, Flex, Stat, StatLabel, Text } from "@chakra-ui/react";
import { Grades } from "../../common/model";
import { useAuth } from "../../store/AuthContext";
import { getAllSalesByGrades } from "common/api";
import { useESSContext } from "../../store/ESSContext";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

function SalesGrades() {

const [grades, setGrades] = useState<Grades[]>([]);
const { user } = useAuth();
const [fuelGrade, setFuelGrade] = useState<string>("");
const [totalSalesParAmount, setTotalSalesParAmount] = useState<number>(0);
const [totalSalesParVolume, setTotalSalesParVolume] = useState<number>(0);

  const { selectedStation } = useESSContext();

  useEffect(() => {
    const allStatGrades = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getAllSalesByGrades(
          selectedStation,
          user,
        );
        setGrades(result);
      } catch (error) {
        console.error(error);
      }
    };
    allStatGrades();
  }, [ selectedStation, user]);
  const [isContentVisible, setIsContentVisible] = useState(true);


  return (
    <Flex flexDirection="column" justifyContent="space-between">
    <Text
      as="span"
      fontSize="2xl"
      fontWeight="bold"
      color="blue.700"
      display="inline"
      onClick={() => setIsContentVisible(!isContentVisible)}
    >
      FuelGrades :{" "}
      {isContentVisible ? <TriangleUpIcon /> : <TriangleDownIcon />}
    </Text>
      <br />
  {isContentVisible && (
    <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="24px" mb="20px">
      {grades.map((grade, index) => (
        <Card key={index} minH="125px" borderWidth="2px" borderColor="gray.500">
              <Stat me="auto">
                <StatLabel fontSize="lg" color="teal.500" fontWeight="semibold" textTransform="capitalize" >
                  {grade.fuelGrade}
                </StatLabel>
              </Stat>
          <Text as="span" color="blue.600" fontWeight="normal" p="3" fontSize="sm">
            Total Sales Amount: {grade.totalSalesParAmount}{' '}
            <Text as="span" fontWeight="bold" color="blue.600" display="inline">
              {selectedStation?.country.currency.code}
            </Text>
            <br />
            Total Sales Volume: {grade.totalSalesParVolume}{' '}
            <Text as="span" fontWeight="bold" color="blue.600" display="inline">
              Litre
            </Text>
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  )}
    </Flex>
  );
};

export default SalesGrades;
