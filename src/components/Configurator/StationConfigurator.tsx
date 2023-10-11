// Import necessary modules
import React, { FC, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { getStations } from "src/common/api";
import { useState } from "react";
import { useAuth } from "src/store/AuthContext";
import { useESSContext } from "src/store/ESSContext";

interface Station {
  id: string;
  name: string;
}

const StationConfigurator: FC = () => {
  const { user } = useAuth();
  const { selectedStation, selectStation } = useESSContext();

  const [stations, setStations] = useState<Station[]>([]);

  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white",
  );
  const colorButton = useColorModeValue("white", "gray.700");

  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    const getAllStations = async () => {
      if (user) {
        try {
          const retrievedStations: Station[] = await getStations({
            username: user.id,
            token: user.token,
          });
          setStations(retrievedStations);
        } catch (error) {
          console.error("Error fetching stations:", error);
        }
      }
    };

    getAllStations();
  }, [user]);

  return stations.length > 0 ? (
    <>
      <p style={{ fontSize: "md", fontWeight: "bold" }}>
        Select Station:
      </p>
      {selectedStation &&
        stations.map((station: Station, key: number) => {
          if (station.id === String(selectedStation)) {
            return (
              <button
                key={key}
                style={{ background: bgButton, color: colorButton, fontSize: "xs", padding: "30px", cursor: "default" }}
              >
                {station.name}
              </button>
            );
          } else {
            return (
              <button
                key={key}
              
                style={{ background: secondaryButtonBg, border: `1px solid ${secondaryButtonBorder}`, color: secondaryButtonColor, fontSize: "xs", padding: "20px", marginBottom: "16px" }}
                onClick={() => selectStation(station.name)}
              >
               {station.name}
              </button>
            );
          }
        })}
    </>
  ) : (
    <p style={{fontSize:"md" ,fontWeight:"bold"}}>
      No station affected, please contact the administrator
    </p>
  );
};

export default StationConfigurator;
