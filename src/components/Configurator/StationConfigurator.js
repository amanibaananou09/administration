import { Button, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { getStationByUser } from "common/api";
import { useState } from "react";

const { useEffect } = require("react");
const { useAuth } = require("store/AuthContext");
const { useEss } = require("store/ESSContext");

const StationConfigurator = () => {
  const { user } = useAuth();
  const { selectedStation, selectStation } = useEss();

  const [stations, setStations] = useState([]);

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white",
  );
  let colorButton = useColorModeValue("white", "gray.700");

  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    const getAllStations = async () => {
      const retrievedStations = await getStationByUser(
        user.username,
        user.token,
      );

      const formattedStations = retrievedStations.map((station) => {
        const controller = station.controllerPts[0];
        return {
          stationId: station.id,
          stationName: station.name,
          stationAdress: station.address,
          controllerId: controller.id,
          controllerPtsId: controller.ptsId,
        };
      });

      setStations(formattedStations);
    };

    getAllStations();
  }, []);

  return (
    <>
      <Text fontSize="md" fontWeight="bold" my="16px">
        Select A Station:
      </Text>
      {selectedStation &&
        stations.map((station, key) => {
          if (station.stationId === selectedStation.stationId) {
            return (
              <Button
                key={key}
                w="100%"
                mb="16px"
                bg={bgButton}
                color={colorButton}
                fontSize="xs"
                variant="no-effects"
                px="30px"
                cursor="default"
              >
                {station.stationName}
              </Button>
            );
          } else {
            return (
              <Button
                key={key}
                w="100%"
                bg={secondaryButtonBg}
                border="1px solid"
                borderColor={secondaryButtonBorder}
                color={secondaryButtonColor}
                fontSize="xs"
                variant="no-effects"
                px="20px"
                mb="16px"
                onClick={() => selectStation(station)}
              >
                <Text textDecorationColor="none">{station.stationName}</Text>
              </Button>
            );
          }
        })}
    </>
  );
};

export default StationConfigurator;
