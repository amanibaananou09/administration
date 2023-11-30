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
import { TankDelivery } from "common/model";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import TankDeliveryRow from "components/Tables/TankDeliveryRow";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { useTranslation } from "react-i18next";
import FilterDelivery from "../../components/filter/FilterDelivery";
import * as XLSX from "xlsx";
import { DownloadIcon } from "@chakra-ui/icons";

const TankDeliveries = () => {
  const textColor: string = useColorModeValue("gray.700", "white");
  const borderColor: string = useColorModeValue("gray.200", "gray.600");
  const [tankDelivery, setTankDelivery] = useState<TankDelivery[]>();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { selectedStation } = useESSContext();
  const [tank, setTank] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [selectedFilterDelivery, setSelectedFilterDelivery] = useState<string>(
    "",
  );
  const { t } = useTranslation("dashboard");

  const exportAllToExcel = async () => {
    if (!selectedStation || !totalPages) {
      return;
    }

    let allDelivery: TankDelivery[] = [];

    try {
      // Fetch delivery from all pages
      for (let page = 0; page < totalPages; page++) {
        const result = await getAllTankDelivery(
          page,
          selectedStation,
          selectedFilterDelivery,
          tank,
          startDate,
          endDate,
        );
        const { content } = result;
        allDelivery = allDelivery.concat(content);
      }

      // Convert transactions to Excel and export
      const data = allDelivery.map((tankDelivery) => ({
        Tank: tankDelivery.tank,
        "Product Volume": tankDelivery.productVolume,
        "Fuel Grade": tankDelivery.fuelGradeName,
        "Product Height": tankDelivery.productHeight,
        "Water Height": tankDelivery.waterHeight,
        Temperature: tankDelivery.temperature,
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Deliveries");
      XLSX.writeFile(wb, "all_deliveries.xlsx");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const allTankDelivery = async () => {
      if (!selectedStation) {
        return;
      }
      try {
        const result = await getAllTankDelivery(
          currentPage,
          selectedStation,
          selectedFilterDelivery,
          tank,
          startDate,
          endDate,
        );
        const { content, totalPages } = result;
        setTankDelivery(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    allTankDelivery();
  }, [
    currentPage,
    selectedStation,
    user,
    tank,
    selectedFilterDelivery,
    startDate,
    endDate,
  ]);

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };
  const handleFilterChange = (filterType: string) => {
    setSelectedFilterDelivery(filterType);
  };

  const handleChange = (value: string | null) => {
    if (selectedFilterDelivery === "tank") {
      setTank(value || "");
    }
  };
  const handleSearchFilters = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setTank("");
  };
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader
          p="6px 0px 22px 0px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {t("tankDeliveries.header")}
          </Text>
          <Button
            colorScheme="blue"
            leftIcon={<DownloadIcon />}
            onClick={exportAllToExcel}
          >
            {t("common.export")}
          </Button>
        </CardHeader>
        <CardBody>
          <FilterDelivery
            selectedFilterDelivery={selectedFilterDelivery}
            onFilterChange={handleFilterChange}
            onChange={handleChange}
            onSearch={handleSearchFilters}
          />
          {tankDelivery && tankDelivery.length === 0 ? (
            <Text color={textColor} mt={4} textAlign="center" fontSize="2xl">
              {t("tankDeliveries.noTankDelivery")}
            </Text>
          ) : (
            <Table
              variant="simple"
              color={textColor}
              size="lg"
              textAlign="center"
            >
              <Thead>
                <Tr color="teal.700">
                  <Th
                    borderColor={borderColor}
                    color="teal.700"
                    textAlign="center"
                  >
                    {t("common.tank")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color="teal.700"
                    textAlign="center"
                  >
                    {t("common.productVolume")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color="teal.700"
                    textAlign="center"
                  >
                    {t("common.fuelGrades")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color="teal.700"
                    textAlign="center"
                  >
                    {t("common.productHeight")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color="teal.700"
                    textAlign="center"
                  >
                    {t("common.waterHeight")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color="teal.700"
                    textAlign="center"
                  >
                    {t("common.temperature")}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {tankDelivery &&
                  tankDelivery.map((row: TankDelivery, key: number) => {
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
          )}
          {!tankDelivery && (
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
          {t("common.previous")}
        </Button>
        <Button>{currentPage + 1}</Button>
        <Button
          isDisabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {t("common.next")}
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default TankDeliveries;
