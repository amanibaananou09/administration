import React, { useState, useEffect } from "react";
import {
  Flex,Box
} from "@chakra-ui/react";
import { useESSContext } from "store/ESSContext";
import { useAuth } from "store/AuthContext";
import { getStatTankMeasurment } from "common/api";
import { TankStat } from "common/model";
import {TankMeasurementRow} from "../components/Tables/TankMeasurementRow";

function TankMeasurement() {
  const [tankStat, setTankStat] = useState<TankStat[]>([]);
  const { user } = useAuth();
  const {
    selectedStation: {
      controllerPts: { id: controllerId },
    },
  } = useESSContext();

  const token = user?.token || "";
  useEffect(() => {
    const getAllTankStat = async () => {
      try {
        const result = await getStatTankMeasurment(controllerId, token);
        setTankStat(result);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTankStat();
  }, [controllerId]);


  return (
    <Flex >
    {tankStat.map((row, key) => (
        <TankMeasurementRow row={row} />
    ))}
  </Flex>
  );
}

export default TankMeasurement;