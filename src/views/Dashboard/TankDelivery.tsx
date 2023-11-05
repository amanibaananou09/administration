import {
  Button,
  ButtonGroup,
  Flex,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { getAllTankDelivery } from "common/api/configuration-api";
import { TankDeliveryProps } from "common/model";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import TankDeliveryRow from "components/Tables/TankDeliveryRow";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";

const TankDelivery = () => {
  const textColor: string = useColorModeValue("gray.700", "white");
  const borderColor: string = useColorModeValue("gray.200", "gray.600");
  const [tankdelivery, setTankDelivery] = useState<TankDeliveryProps[]>([]);
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { selectedStation } = useESSContext();

  useEffect(() => {
    const allTankDelivery = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getAllTankDelivery(currentPage, selectedStation);
        const { content, totalPages } = result;
        setTankDelivery(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    allTankDelivery();
  }, [currentPage, selectedStation, user]);

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Tank Delivery
          </Text>
        </CardHeader>
        <CardBody>
          <Table
            variant="simple"
            color={textColor}
            size="sm"
            textAlign="center"
          >
            <Thead>
              <Tr color="gray.400">
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  tank
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  product Volume
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  fuel Grade
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  product Height
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  water Height
                </Th>
                <Th
                  borderColor={borderColor}
                  color="gray.400"
                  textAlign="center"
                >
                  temperature
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {tankdelivery.map((row: TankDeliveryProps, key: number) => {
                return (
                  <TankDeliveryRow
                    tank={row.tank}
                    fuelGradeName={row.fuelGradeName}
                    productHeight={row.productHeight}
                    waterHeight={row.waterHeight}
                    temperature={row.temperature}
                    productVolume={row.productVolume}
                    key={key}
                  />
                );
              })}
            </Tbody>
          </Table>

          {tankdelivery.length === 0 && (
            <Stack width="100%" margin="20px 0px">
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
              <Skeleton height="50px" borderRadius="10px" />
            </Stack>
          )}
        </CardBody>
      </Card>
      <ButtonGroup mt={4} spacing={4}>
        <Button
          isDisabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button>{currentPage + 1}</Button>
        <Button
          isDisabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default TankDelivery;
