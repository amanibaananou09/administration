import { Flex, SimpleGrid } from "@chakra-ui/react";
import { getStatTankMeasurment } from "common/api/statistique-api";
import { TankMeasurement as TankMeasurementModel } from "common/model";
import { TankMeasurement } from "components/stat/TankMeasurement";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";

const TankMeasurementSection = () => {
  const [tankMeasurements, setTankMeasurements] = useState<
    TankMeasurementModel[]
  >([]);
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getStatTankMeasurment(selectedStation);
        setTankMeasurements(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedStation, user]);

  return (
    <SimpleGrid
    columns={{ base: 1, sm: 1, md: 1, lg: 3 }}
    spacing="0" 
    flexDirection={{ base: "column", sm: "row", md: "row", lg: "column" }} 
  >
    {tankMeasurements.map((tankMeasurement, key) => (
      <Flex
        key={key}
        p={{ base: "1em", md: "1.5em", lg: "2em" }}
        w="100%"
      >
        <TankMeasurement tankMeasurement={tankMeasurement} />
      </Flex>
    ))}
  </SimpleGrid>
  );
};

export default TankMeasurementSection;
