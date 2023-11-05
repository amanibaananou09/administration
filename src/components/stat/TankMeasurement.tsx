import { Flex } from "@chakra-ui/react";
import { getStatTankMeasurment } from "common/api/stat-api";
import { TankStat } from "common/model";
import { TankMeasurementRow } from "components/Tables/TankMeasurementRow";
import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
function TankMeasurement() {
  const [tankStat, setTankStat] = useState<TankStat[]>([]);
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

  useEffect(() => {
    const getAllTankStat = async () => {
      if (!selectedStation || !user) {
        return;
      }
      try {
        const result = await getStatTankMeasurment(selectedStation);
        setTankStat(result);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTankStat();
  }, [selectedStation, user]);

  return (
    <Flex>
      {tankStat.map((row, key) => (
        <TankMeasurementRow key={key} row={row} />
      ))}
    </Flex>
  );
}

export default TankMeasurement;
