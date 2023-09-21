// Chakra imports
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { updateStation } from "common/api";
import { deleteStation } from "common/api";
import { createStation } from "common/api";
import { getStations } from "common/api";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import ConfirmationModal from "components/Modal/ConfirmationModal";
import StationModal from "components/Modal/StationModal";
import StationRow from "components/Tables/StationRow";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";

const ManageStation = () => {
  const { user } = useAuth();
  const { selectStation, clearContext, selectedStation } = useESSContext();
  const [stations, setStations] = useState([]);
  const stationModalRef = useRef();
  const confirmationModalRef = useRef();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const openStationModal = (station) => {
    stationModalRef.current.open(station);
  };

  const openConfirmationToDeleteModal = (station) => {
    confirmationModalRef.current.open(station);
  };

  const deleteStationHandler = async (station) => {
    try {
      await deleteStation(station.id, user);

      setStations((prev) => prev.filter((st) => st.id !== station.id));

      // set an other station in context if chosen one is deleted
      if (stations.length > 0 && selectedStation.id === station.id) {
        selectStation(stations.find((st) => st.id !== station.id));
      }

      confirmationModalRef.current.close();
    } catch (error) {
      console.error(error);
    }
  };

  const submitModalHandler = async (station) => {
    try {
      if (station.id) {
        // async call to update an existing station

        await updateStation(station, user);

        const newStations = stations.map((oldStation) => {
          if (oldStation.id === station.id) {
            return {
              ...station,
            };
          }
          return oldStation;
        });

        setStations(newStations);

        // sync station in context if chosen one is updated
        if (selectedStation.id === station.id) {
          selectStation(station);
        }
      } else {
        // async call to create new station
        const newStation = await createStation(station, user);
        setStations((prev) => [newStation, ...prev]);
      }

      stationModalRef.current.close();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getAllStations = async () => {
      const retrievedStations = await getStations(user);

      setStations([...retrievedStations]);
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
                      firmwareVersion={row.version}
                      onEdit={() => openStationModal(row)}
                      onDelete={() => openConfirmationToDeleteModal(row)}
                      key={key}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
      </Flex>
      <StationModal onSubmit={submitModalHandler} ref={stationModalRef} />
      <ConfirmationModal
        message="Are you sure you want to delete this station ?"
        onConfirm={deleteStationHandler}
        ref={confirmationModalRef}
      />
    </>
  );
};

export default ManageStation;
