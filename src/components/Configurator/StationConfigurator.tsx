import {
  Button,
  Text,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  useColorModeValue,
} from "@chakra-ui/react";
import { getStations } from "common/api/station-api";
import { Station } from "common/model";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { StationConfiguratorProps } from "common/react-props";
import { useTranslation } from "react-i18next";

const StationConfigurator = (props: StationConfiguratorProps) => {
  const { user } = useAuth();
  const { selectedStation, selectStation } = useESSContext();
  const { t } = useTranslation("dashboard");

  const [stations, setStations] = useState<Station[]>([]);

  let bgButton: string = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white",
  );
  let colorButton: string = useColorModeValue("white", "gray.700");

  const secondaryButtonBg: string = useColorModeValue("white", "transparent");
  const secondaryButtonBorder: string = useColorModeValue("gray.700", "white");
  const secondaryButtonColor: string = useColorModeValue("gray.700", "white");
  const settingsRef = useRef<HTMLDivElement>(null);
  const bgDrawer = useColorModeValue("white", "navy.800");

  useEffect(() => {
    const getAllStations = async () => {
      const retrievedStations: Station[] = await getStations(user!!);
      setStations(retrievedStations);
    };

    getAllStations();
  }, []);

  return (
    <>
      {stations.length > 0 ? (
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
                      bg={bgButton}
                      color={colorButton}
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
