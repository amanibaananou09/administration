import {
  Alert,
  AlertIcon,
  Flex,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

import { GeneralStations } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import {
  activateStation,
  deactivateStation,
  listStation,
} from "common/api/station-api";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ConfirmationDialog, {
  ConfirmationDialogRefType,
} from "components/Dialog/ConfirmationDialog";
import StationModal from "components/Modal/StationModal";
import Status from "components/Sidebar/Status";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import useHttp from "hooks/use-http";
import useQuery from "hooks/use-query";
import { useEffect, useRef, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { useAuth } from "store/AuthContext";

const StationManagement = () => {
  const { data: stations, isLoading, makeRequest: fetchStations , error} = useHttp<
    GeneralStations[]
  >(listStation, false);
  const { t } = useTranslation("administration");
  let { path } = useRouteMatch();
  const { user } = useAuth();
  const currentUserAccountId = user?.customerAccountId;
  const [alertMessage, setAlertMessage] = useState<string>("");
  const confirmationDialogRef = useRef<ConfirmationDialogRefType>(null);
  const [selectedStation, setSelectedStation] = useState<GeneralStations>();

  const query = useQuery();
  const name = query.get("name");
  const creator = query.get("creator");
  const parent = query.get("parent");
  const submitModalHandler = async () => {
    const searchCriteria = {
      customerAccountId: currentUserAccountId,
      name,
      creator,
      parent,
    };
    await fetchStations(searchCriteria);
  };
  const openConfirmationDialog = (station: GeneralStations) => {
    setSelectedStation(station);
    confirmationDialogRef.current?.open();
  };
  //styles
  const textColor = "gray.700";

  useEffect(() => {
    const noSearchParams = !name && !creator && !parent;

    const searchCriteria = {
      customerAccountId: currentUserAccountId,
      name,
      creator,
      parent,
    };

    fetchStations(searchCriteria);
  }, [query, name, creator, parent, currentUserAccountId]);

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
      const searchCriteria = {
        customerAccountId: currentUserAccountId,
        name,
        creator,
        parent,
      };

      await fetchStations(searchCriteria);
      setAlertMessage(message);
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    }
  };

  const columns: UIColumnDefinitionType<GeneralStations>[] = [
    {
      header: "#",
      key: "#",
    },
    {
      header: t("stationModal.name"),
      key: "name",
    },
    {
      header: t("common.creatorAccount"),
      key: "creatorAccountId",
      render: (item) => item.creatorCustomerAccountName,
    },
    {
      header: t("stationManagement.compte"),
      key: "customerAccountId",
      render: (item) => item.customerAccountName,
    },
    {
      header: t("stationManagement.deactivation"),
      key: "actif",
      render: (item) => (
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
      render: (item) => (
        <Text textAlign="center">
          {item.controllerPts?.controllerType || " "}
        </Text>
      ),
    },
    {
      header: t("stationManagement.controllerId"),
      key: "controllerPts",
      render: (item) => (
        <Text textAlign="center">{item.controllerPts?.ptsId || " "}</Text>
      ),
    },
    {
      header: t("common.phone"),
      key: "controllerPts",
      render: (item) => (
        <Text textAlign="center">{item.controllerPts?.phone || " "}</Text>
      ),
    },
    {
      header: t("stationManagement.created"),
      key: "dateStatusChange",
      render: (item) => (
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
      render: (item) => (
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
        <StationModal onSubmit={submitModalHandler} />
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
