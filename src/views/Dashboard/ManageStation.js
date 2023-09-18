// Chakra imports
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { getStationByUser } from "common/api";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import StationModal from "components/Modal/StationModal";
import StationRow from "components/Tables/StationRow";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "store/AuthContext";

const ManageStation = () => {
  const {
    user: { username, token },
  } = useAuth();
  const [stations, setStations] = useState([]);
  const [stationToEdit, setStationToEdit] = useState(null);
  const stationModalRef = useRef();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const openStationModal = (station) => {
    setStationToEdit(station);
    stationModalRef.current.openModal();
  };

  const submitModalHandler = (station) => {
    console.log(station);
    if (station.id) {
      // async call to update existing station
    } else {
      // async call to create new station
    }

    setStations((prev) => [station, ...stations]);
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

      setStations([...formattedStations]);
    };

    getAllStations();
  }, []);

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card my={{ lg: "24px" }} me={{ lg: "24px" }}>
          <Flex direction="column">
            <CardHeader py="12px">
              <Flex align="center" justify="space-between" p="22px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Manage Stations
                </Text>
                <Button
                  variant="primary"
                  maxH="30px"
                  onClick={() => openStationModal()}
                >
                  CREATE STATION
                </Button>
              </Flex>
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
                      onEdit={() => openStationModal(row)}
                      key={key}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
      </Flex>
      <StationModal
        station={stationToEdit}
        onSubmit={submitModalHandler}
        ref={stationModalRef}
      />
    </>
  );
};

export default ManageStation;
