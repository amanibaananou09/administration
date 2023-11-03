import React, { useState, useEffect } from "react";
import {
  Flex,Box
} from "@chakra-ui/react";
import { useESSContext } from "store/ESSContext";
import { useAuth } from "store/AuthContext";
import { getStatTankMeasurment } from "common/api";
import { TankStat } from "common/model";
import { TankMeasurementRow } from "components/Tables/TankMeasurementRow";
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
        const result = await getStatTankMeasurment(selectedStation, user);
        setTankStat(result);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTankStat();
  }, [selectedStation]);

  return (
    <Flex>
      {tankStat.map((row, key) => (
        <TankMeasurementRow row={row} />
      ))}
    </Flex>
  );
}

export default TankMeasurement;