import {
  Flex,
  Skeleton,
  Stack,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { GeneralStations } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import StationModal from "components/Modal/StationModal";
import useHttp from "hooks/use-http";
import { Route, useRouteMatch } from "react-router-dom";
import {
  activateStation,
  deactivateStation,
  getCustomerAccountInformation,
  listStation,
} from "common/api/station-api";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "store/AuthContext";
import { UIColumnDefinitionType } from "components/Table/Types";
import Status from "components/Sidebar/Status";
import UITable from "components/Table/UITable";
import ConfirmationDialog, {
  ConfirmationDialogRefType,
} from "components/Dialog/ConfirmationDialog";

const StationManagement = () => {
  const { data: stations, isLoading, makeRequest: fetchStations } = useHttp<
    GeneralStations[]
  >(listStation, false);
  const { t } = useTranslation("administration");
  let { path } = useRouteMatch();
  const { user } = useAuth();
  const currentUserAccountId = user?.customerAccountId;
  const [alertMessage, setAlertMessage] = useState<string>("");
  const confirmationDialogRef = useRef<ConfirmationDialogRefType>(null);
  const [selectedStation, setSelectedStation] = useState<GeneralStations>();

  const openConfirmationDialog = (station: GeneralStations) => {
    setSelectedStation(station);
    confirmationDialogRef.current?.open();
  };
  //styles
  const textColor = "gray.700";
  useEffect(() => {
    fetchStations(currentUserAccountId);
  }, [fetchStations, currentUserAccountId]);

  const onSubmit = () => {
    fetchStations(currentUserAccountId);
  };
  const handleClick = async () => {
    if (selectedStation) {
      let item = selectedStation;
      let message = "";
      if (item.actif && item.id !== undefined) {
        await deactivateStation(currentUserAccountId, item.id);
        message = t("stationManagement.stationDeactivated").replace(
          "{{stationName}}",
          item.name,
        );
      } else if (item.id !== undefined) {
        await activateStation(currentUserAccountId, item.id);
        message = t("stationManagement.stationActivated").replace(
          "{{stationName}}",
          item.name,
        );
      }
      await fetchStations(currentUserAccountId);
      setAlertMessage(message);
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    }
  };
  const columns: UIColumnDefinitionType<GeneralStations>[] = [
    {
      header: "#",
      key: "id",
    },
    {
      header: t("stationModal.name"),
      key: "name",
    },
    {
      header: t("common.creatorAccount"),
      key: "creatorAccountId",
      render: (item: GeneralStations) => item.creatorCustomerAccountName,
    },
    {
      header: t("stationManagement.compte"),
      key: "customerAccountId",
      render: (item: GeneralStations) => item.customerAccountName,
    },
    {
      header: t("stationManagement.deactivation"),
      key: "actif",
      render: (item: GeneralStations) => (
        <div
          onClick={() => openConfirmationDialog(item)}
          style={{ cursor: "pointer" }}
        >
          <Status value={item.actif!!} />
        </div>
      ),
    },
    {
      header: t("stationManagement.typeController"),
      key: "controllerType",
      render: (item: GeneralStations) => (
        <Text textAlign="center">{item.controllerPts?.controllerType || " "}</Text>
      ),
    },
    {
      header: t("stationManagement.controllerId"),
      key: "controllerPts",
      render: (item: GeneralStations) => (
        <Text textAlign="center">{item.controllerPts?.ptsId || " "}</Text>
      ),
    },
    {
      header: t("common.phone"),
      key: "controllerPts",
      render: (item: GeneralStations) => (
        <Text textAlign="center">{item.controllerPts?.phone || " "}</Text>
      ),
    },
    {
      header: t("stationManagement.created"),
      key: "dateStatusChange",
      render: (item: GeneralStations) => (
        <Text textAlign="center">
          {new Date(item.dateStatusChange).toLocaleString()}
        </Text>
      ),
    },
    {
      header: t("stationModal.cordonneesGps"),
      key: "cordonneesGps",
    },
    {
      header: t("common.address"),
      key: "address",
    },
    {
      header: t("common.country"),
      key: "country",
      render: (item: GeneralStations) => (
        <Text textAlign="center">{item.country?.name || " "}</Text>
      ),
    },
  ];
  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        {alertMessage && (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            position="absolute"
            top="10%"
            left="50%"
            transform="translate(-50%, -50%)"
            width={{ base: "50%", sm: "30%", md: "40%", lg: "40%" }}
            borderRadius="10px"
            boxShadow="0 8px 16px rgba(0,0,0,0.2)"
            zIndex={9999}
          >
            <AlertIcon mr="3" /> {alertMessage}
          </Alert>
        )}
        <Card overflowX={{ sm: "scroll", md: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" p="5px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                {t("stationManagement.header")}
              </Text>
            </Flex>
          </CardHeader>

          <CardBody>
            <Flex overflowX="auto">
              {!isLoading && stations && (
                <UITable
                  data={stations}
                  columns={columns}
                  emptyListMessage={t("stationManagement.isLoading")}
                />
              )}

              {isLoading && (
                <Stack width="100%" margin="20px 0px">
                  <Skeleton height="50px" borderRadius="10px" />
                  <Skeleton height="50px" borderRadius="10px" />
                  <Skeleton height="50px" borderRadius="10px" />
                  <Skeleton height="50px" borderRadius="10px" />
                  <Skeleton height="50px" borderRadius="10px" />
                </Stack>
              )}
            </Flex>
          </CardBody>
        </Card>
      </Flex>
      <Route path={`${path}/new`}>
        <StationModal onSubmit={onSubmit} fetchStations={fetchStations} />
      </Route>
      <ConfirmationDialog
        title={t("stationManagement.updateStatusDialog.title")}
        message={
          selectedStation && selectedStation.actif
            ? t("stationManagement.updateStatusDialog.desativationMessage")
            : t("stationManagement.updateStatusDialog.activationMessage")
        }
        onConfirm={handleClick}
        ref={confirmationDialogRef}
      />
    </>
  );
};

export default StationManagement;
