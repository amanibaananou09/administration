import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "src/store/AuthContext";
import { useESSContext } from "src/store/ESSContext";
import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { updateStation } from "src/common/api";
import { deleteStation } from "src/common/api";
import { createStation } from "src/common/api";
import { getStations } from "src/common/api";
import Card from "src/components/Card/Card";
import CardBody from "src/components/Card/CardBody";
import CardHeader from "src/components/Card/CardHeader";
import ConfirmationModal from "src/components/Modal/ConfirmationModal";
import StationModal from "src/components/Modal/StationModal";
import StationRow from "src/components/Tables/StationRow";

interface Station {
  id: string;
  name: string;
  address: string;
  controllerId: string;
  controllerPtsId: string;
  firmwareVersion: string;
}

const ManageStation: React.FC = () => {
  const { user } = useAuth();
  const { selectStation, selectedStation } = useESSContext();
  const [stations, setStations] = useState<Station[]>([]);
  const stationModalRef = useRef<any>();
  const confirmationModalRef = useRef<any>();

  const textColor = useColorModeValue("gray.700", "white");

  const isStationSelected = selectedStation !== null;

  const openStationModal = (station: Station) => {
    stationModalRef.current.open(station);
  };

  const openConfirmationToDeleteModal = (station: Station) => {
    confirmationModalRef.current.open(station);
  };

  const deleteStationHandler = async (station: Station) => {
    try {
      await deleteStation(station.id, user);

      setStations((prev) => prev.filter((st) => st.id !== station.id));

      if (isStationSelected && stations.length > 0 && selectedStation!.id === station.id) {
        selectStation(stations.find((st) => st.id !== station.id));
      }

      confirmationModalRef.current.close();
    } catch (error) {
      console.error(error);
    }
  };

  const submitModalHandler = async (station: Station) => {
    try {
      if (station.id) {
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

        if (isStationSelected && selectedStation!.id === station.id) {
          selectStation(station);
        }
      } else {
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
        <Card variant="primary" my={{ lg: "24px" }} me={{ lg: "24px" }}>
          <Flex direction="column">
            <CardHeader variant="primary" py="12px">
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
            <CardBody variant="primary">
              <Flex direction="column" w="100%">
                {stations.map((row, key) => {
                  return (
                    <StationRow
                      id={row.id}
                      name={row.name}
                      address={row.address}
                      controllerId={row.controllerId}
                      controllerPtsId={row.controllerPtsId}
                      firmwareVersion={row.firmwareVersion}
                      onEdit={() => openStationModal(row)}
                      onDelete={() => openConfirmationToDeleteModal(row)}
                      key={key}
                    />
                  );
                })}
                {stations.length == 0 && (
                  <Stack width="100%" margin="20px 0px">
                    <Skeleton height="200px" borderRadius="10px" />
                    <Skeleton height="200px" borderRadius="10px" />
                  </Stack>
                )}
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
