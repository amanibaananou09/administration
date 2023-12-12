import {
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

const StationConfigurator = (props: StationConfiguratorProps) => {
  const { user } = useAuth();
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
