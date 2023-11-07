import { Flex } from "@chakra-ui/react";
import { getStatTankMeasurment } from "common/api/statistique-api";
import { TankMeasurement as TankMeasurementModel } from "common/model";
import { TankMeasurement } from "components/Tables/TankMeasurement";
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
    <Flex>
      {tankMeasurements.map((tankMeasurement, key) => (
        <TankMeasurement key={key} tankMeasurement={tankMeasurement} />
      ))}
    </Flex>
  );
};

export default TankMeasurementSection;
