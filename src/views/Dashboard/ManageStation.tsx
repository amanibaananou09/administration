import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  createStation,
  deleteStation,
  getStations,
  updateStation,
} from "common/api";
import { Station } from "common/model";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ConfirmationModal from "components/Modal/ConfirmationModal";
import StationModal from "components/Modal/StationModal";
import StationRow from "components/Tables/StationRow";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
const ManageStation = () => {
  const { user } = useAuth();
  const { selectStation, selectedStation } = useESSContext();
  const [stations, setStations] = useState<Station[]>([]);
  const stationModalRef = useRef<any>(null);
  const confirmationModalRef = useRef<any>(null);

  const textColor = useColorModeValue("gray.700", "white");

  const openStationModal = (station?: Station) => {
    stationModalRef.current.open(station);
  };

  const openConfirmationToDeleteModal = (station: Station) => {
    confirmationModalRef.current.open(station);
  };

  const deleteStationHandler = async (station: Station) => {
    try {
      await deleteStation(station.id, user?.token);

      setStations((prev) => prev.filter((st) => st.id !== station.id));

      if (stations.length > 0 && selectedStation.id === station.id) {
        selectStation(stations.find((st) => st.id !== station.id));
      }

      confirmationModalRef.current.close();
    } catch (error) {
      console.error(error);
    }
  };

  const submitModalHandler = async (station: Station) => {
    try {
      if (typeof user !== "string") {
        console.error("User is not a string");
        return;
      }
      const token = user;
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

        if (selectedStation.id === station.id) {
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
                  const firmwareInformation =
                    row.controllerPts.firmwareInformations[0];

                  return (
                    <StationRow
                      id={row.id}
                      name={row.name}
                      address={row.address}
                      controllerId={row.controllerId}
                      controllerPtsId={row.controllerPts.ptsId}
                      firmwareInformations={firmwareInformation.dateTime}
                      onEdit={() => openStationModal(row)}
                      onDelete={() => openConfirmationToDeleteModal(row)}
                      key={key}
                    />
                  );
                })}
                {stations.length === 0 && (
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
      <StationModal
        onSubmit={submitModalHandler}
        ref={stationModalRef}
        station={null}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ConfirmationModal
        message="Are you sure you want to delete this station ?"
        onConfirm={deleteStationHandler}
        ref={confirmationModalRef}
      />
    </>
  );
};

export default ManageStation;
