import React, { FC, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { getStations } from "common/api";
import { useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { Station } from "common/model";


const StationConfigurator: FC = () => {
  const { user } = useAuth();
  const { selectedStation, selectStation } = useESSContext();

  const [stations, setStations] = useState<Station[]>([]);

  let bgButton: string = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white",
  );
  let colorButton: string = useColorModeValue("white", "gray.700");

  const secondaryButtonBg: string = useColorModeValue("white", "transparent");
  const secondaryButtonBorder: string = useColorModeValue("gray.700", "white");
  const secondaryButtonColor: string = useColorModeValue("gray.700", "white");

  useEffect(() => {
    const getAllStations = async () => {
      const retrievedStations: Station[] = await getStations(user);

      setStations(retrievedStations);
    };

    getAllStations();
  }, []);

  return stations.length > 0 ? (
    <>
      <Text fontSize="md" fontWeight="bold" my="16px">
        Select Station:
      </Text>
      {selectedStation &&
        stations.map((station: Station, key: number) => {
          if (station.id === selectedStation.id) {
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
                {station.name}
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
                <Text textDecorationColor="none">{station.name}</Text>
              </Button>
            );
          }
        })}
    </>
  ) : (
    <Text fontSize="md" fontWeight="bold" my="16px">
      No station affected, please contact the administrator
    </Text>
  );
};

export default StationConfigurator;
