import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { getStations } from "common/api/station-api";
import { Station } from "common/model";
import { StationConfiguratorProps } from "common/react-props";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";

const StationConfigurator = (props: StationConfiguratorProps) => {
  const { user } = useAuth();
  const { selectedStation, selectStation } = useESSContext();
  const { t } = useTranslation("dashboard");
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState<Station[]>([]);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getAllStations = async () => {
      const retrievedStations: Station[] = await getStations(user!!);
      setStations(retrievedStations);
      setLoading(false);
    };

    getAllStations();
  }, []);

  //styles
  const bgDrawer = "white";

  return (
    <>
      {loading ? (
        <Drawer
          isOpen={props.isOpen}
          onClose={props.onClose}
          placement={"right"}
          finalFocusRef={settingsRef}
          blockScrollOnMount={false}
        >
          <DrawerContent bg={bgDrawer}>
            <DrawerHeader pt="24px" px="24px">
              <DrawerCloseButton />
              <Spinner size="xl" color="blue.500" />
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      ) : stations.length > 0 ? (
        <Drawer
          isOpen={props.isOpen}
          onClose={props.onClose}
          placement={"right"}
          finalFocusRef={settingsRef}
          blockScrollOnMount={false}
        >
          <DrawerContent bg={bgDrawer}>
            <DrawerHeader pt="24px" px="24px">
              <DrawerCloseButton />
              <Text fontSize="md" fontWeight="bold" my="16px">
                {t("stationConfigurator.selectStation")}:
              </Text>
              {selectedStation &&
                stations.map((station: Station, key: number) => {
                  return station.id === selectedStation.id ? (
                    <Button
                      key={key}
                      w="100%"
                      mb="16px"
                      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                      color="white"
                      fontSize="xs"
                      variant="no-effects"
                      px="30px"
                      cursor="default"
                    >
                      {station.name}
                    </Button>
                  ) : (
                    <Button
                      key={key}
                      w="100%"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.700"
                      color="gray.700"
                      fontSize="xs"
                      variant="no-effects"
                      px="20px"
                      mb="16px"
                      onClick={() => selectStation(station)}
                    >
                      <Text textDecorationColor="none">{station.name}</Text>
                    </Button>
                  );
                })}
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      ) : (
        <Drawer
          isOpen={props.isOpen}
          onClose={props.onClose}
          placement={"right"}
          finalFocusRef={settingsRef}
          blockScrollOnMount={false}
        >
          <DrawerContent bg={bgDrawer}>
            <DrawerHeader pt="24px" px="24px">
              <DrawerCloseButton />
              <Text fontSize="md" fontWeight="bold" my="16px">
                {t("stationConfigurator.text")}
              </Text>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default StationConfigurator;
