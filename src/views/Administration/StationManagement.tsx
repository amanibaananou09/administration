import { Box, Flex, Text, useToast } from "@chakra-ui/react";

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
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import useHttp from "hooks/use-http";
import useQueryParams from "hooks/use-query-params";
import { useEffect, useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import { Mode } from "../../common/enums";

const StationManagement = () => {
  const { data: stations, isLoading, makeRequest: fetchStations } = useHttp<
    GeneralStations[]
  >(listStation, false);
  const { makeRequest: desactivate } = useHttp<void>(deactivateStation, false);
  const { makeRequest: activate } = useHttp<void>(activateStation, false);
  const history = useHistory();

  const { t } = useTranslation();
  let { path } = useRouteMatch();
  const { user } = useAuth();
  const toast = useToast({
    status: "success",
    position: "top",
    isClosable: true,
  });

  const [selectedStation, setSelectedStation] = useState<GeneralStations>();
  const confirmationDialogRef = useRef<ConfirmationDialogRefType>(null);

  const currentUserAccountId = user?.customerAccountId;

  const query = useQueryParams();
  const name = query.get("name");
  const creator = query.get("creator");
  const parent = query.get("parent");

  const getStations = async () => {
    try {
      const searchCriteria = {
        customerAccountId: currentUserAccountId,
        name,
        creator,
        parent,
      };
      await fetchStations(searchCriteria);
    } catch (error) {
      console.error("Error when fetching stations");
    }
  };

  const submitModalHandler = async () => {
    await getStations();
  };

  const openConfirmationDialog = (station: GeneralStations) => {
    setSelectedStation(station);

    const title = t("stationManagement.updateStatusDialog.title");
    const message = station.actif
      ? t("stationManagement.updateStatusDialog.desativationMessage")
      : t("stationManagement.updateStatusDialog.activationMessage");

    confirmationDialogRef.current?.open(title, message);
  };

  useEffect(() => {
    getStations();
  }, [query, name, creator, parent, currentUserAccountId]);

  const updateStatusHandler = async () => {
    if (selectedStation) {
      let item = selectedStation;
      let message = "";
      try {
        if (item.actif && item.id) {
          await desactivate(currentUserAccountId, item.id);
          message = t("stationManagement.stationDeactivated", {
            stationName: item.name,
          });
        } else if (item.id) {
          await activate(currentUserAccountId, item.id);
          message = t("stationManagement.stationActivated", {
            stationName: item.name,
          });
        }

        await getStations();

        toast({
          description: message,
        });
      } catch (error) {
        console.error("Error while updating station status");
      }
    }
  };

  const columns: UIColumnDefinitionType<GeneralStations>[] = [
    {
      header: "#",
      key: "#",
    },
    {
      header: t("stationManagement.name"),
      key: "name",
      render: (item) => (
        <div
          style={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            const clickedStation = stations?.find(
              (station) => station && station.id === item.id,
            );

            if (clickedStation) {
              setSelectedStation(clickedStation);
              history.push(`${path}/details/${item.id}`);
            }
          }}
        >
          {item.name}
        </div>
      ),
    },
    {
      header: t("common.creator"),
      key: "creatorCustomerAccountName",
    },
    {
      header: t("stationManagement.compte"),
      key: "customerAccountName",
    },
    {
      header: t("stationManagement.deactivation"),
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
      key: "controllerPts.controllerType",
    },
    {
      header: t("stationManagement.controllerId"),
      key: "controllerPts.ptsId",
    },
    {
      header: t("common.phone"),
      key: "controllerPts.phone",
    },
    {
      header: t("stationManagement.created"),
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
      key: "country.name",
    },
    {
      header: t("common.action"),
      render: (item: GeneralStations) => (
        <Flex justifyContent="center">
          <Box pr={6}>
            <Status value={false} />
          </Box>
          <FaPencilAlt
            style={{ cursor: "pointer" }}
            onClick={() => {
              const clickedStation = stations?.find(
                (station) => station && station.id === item.id,
              );

              if (clickedStation) {
                setSelectedStation(clickedStation);
                history.push(`${path}/edit/${item.id}`);
              }
            }}
          />
        </Flex>
      ),
    },
  ];

  //styles
  const textColor = "gray.700";

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
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

              {isLoading && <SkeletonTable />}
            </Flex>
          </CardBody>
        </Card>
      </Flex>
      <Switch>
        <Route path={`${path}/new`}>
          <StationModal onSubmit={submitModalHandler} mode={Mode.CREATE} />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <StationModal onSubmit={submitModalHandler} mode={Mode.EDIT} />
        </Route>
        <Route path={`${path}/details/:id`}>
          <StationModal onSubmit={submitModalHandler} mode={Mode.VIEW} />
        </Route>
      </Switch>
      <ConfirmationDialog
        onConfirm={updateStatusHandler}
        ref={confirmationDialogRef}
      />
    </>
  );
};

export default StationManagement;