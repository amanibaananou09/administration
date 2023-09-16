// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { getStationByUser } from "common/api";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import EditStationModal from "components/Modal/EditStationModal";
import StationRow from "components/Tables/StationRow";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "store/AuthContext";

const ManageStation = () => {
  const {
    user: { username, token },
  } = useAuth();
  const [stations, setStations] = useState([]);
  const [stationToEdit, setStationToEdit] = useState(null);
  const modalRef = useRef();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const editStation = (station) => {
    setStationToEdit(station);
    modalRef.current.openModal();
  };

  useEffect(() => {
    const getAllStations = async () => {
      const retrievedStations = await getStationByUser(username, token);

      const formattedStations = retrievedStations.map((station) => {
        const controller = station.controllerPts[0];
        return {
          id: station.id,
          name: station.name,
          address: station.address,
          controllerId: controller.id,
          controllerPtsId: controller.ptsId,
        };
      });

      setStations([...formattedStations, ...formattedStations]);
    };

    getAllStations();
  }, []);

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card my={{ lg: "24px" }} me={{ lg: "24px" }}>
          <Flex direction="column">
            <CardHeader py="12px">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Manage Stations
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction="column" w="100%">
                {stations.map((row, key) => {
                  return (
                    <StationRow
                      id={row.id}
                      name={row.name}
                      address={row.address}
                      controllerId={row.controllerId}
                      controllerPtsId={row.controllerPtsId}
                      onEdit={() => editStation(row)}
                      key={key}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
      </Flex>
      <EditStationModal station={stationToEdit} ref={modalRef} />
    </>
  );
};

export default ManageStation;
