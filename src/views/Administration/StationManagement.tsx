import { Box, Flex, Text } from "@chakra-ui/react";

import { GeneralStationCreteria, GeneralStations } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ColumnSelector from "components/ColumnSelector/ColumnSelector";
import { useConfirm } from "components/Dialog/ConfirmationDialog";
import StationExporter from "components/Exporter/StationExporter";
import StationModal from "components/Modal/StationModal";
import Pagination from "components/Pagination/Pagination";
import Status from "components/Sidebar/Status";
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import { useStationQueries, useStations } from "hooks/use-station";
import "jspdf-autotable";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import UploadInformationModal from "../../components/Modal/UploadInformationModal";

const StationManagement = () => {
  const history = useHistory();
  const { t } = useTranslation();
  let { path } = useRouteMatch();

  const [creteria, setCreteria] = useState<GeneralStationCreteria>({
    page: 0,
    size: 25,
  });

  const { stations, totalPages, totalElements, isLoading } = useStations(
    creteria,
  );
  const { activate, desactivate } = useStationQueries();

  const { ConfirmationDialog, confirm } = useConfirm({
    title: t("stationManagement.updateStatusDialog.title"),
  });
  const updateStatus = async (item: GeneralStations) => {
    if (item.actif && item.id) {
      desactivate(item.id);
    } else if (item.id) {
      activate(item.id);
    }
  };

  const submitModalHandler = async () => {};

  const columns: UIColumnDefinitionType<GeneralStations>[] = [
    {
      header: "#",
      key: "#",
      render: (item) => <div>{item.index}</div>,
    },
    {
      header: t("common.stationIdentifier"),
      key: "identifier",
      render: (item) => (
        <div
          style={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            history.push(`${path}/details/${item.id}`);
          }}
        >
          {item.identifier}
        </div>
      ),
    },
    {
      header: t("stationManagement.name"),
      key: "name",
    },
    {
      header: t("stationManagement.creator"),
      key: "creatorCustomerAccountName",
    },
    {
      header: t("stationManagement.compte"),
      key: "customerAccountName",
    },
    {
      header: t("stationManagement.typeController"),
      key: "controllerPts.controllerType",
    },
    {
      header: t("stationManagement.controllerId"),
      key: "controllerPts.ptsId",
      render: (item) => (
        <div
          style={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            history.push(`${path}/information/${item.controllerPts.ptsId}`);
          }}
        >
          {item.controllerPts.ptsId}
        </div>
      ),
    },
    {
      header: t("stationManagement.phone"),
      key: "controllerPts.phone",
    },
    {
      header: t("stationManagement.created"),
      key: "created",
      render: (item) => (
        <Text textAlign="center">
          {new Date(item.createdDate).toLocaleString()}
        </Text>
      ),
    },
    {
      header: t("stationModal.cordonneesGps"),
      key: "cordonneesGps",
    },
    {
      header: t("common.country"),
      key: "country.name",
    },
    {
      header: t("common.city"),
      key: "city",
    },
    {
      header: t("common.address"),
      key: "address",
    },
    {
      header: t("common.phone"),
      key: "phone",
    },
    {
      header: t("stationManagement.deactivation"),
      key: "deactivation",
      render: (item) => (
        <div
          onClick={() => {
            const message = item.actif
              ? t("stationManagement.updateStatusDialog.desativationMessage")
              : t("stationManagement.updateStatusDialog.activationMessage");
            confirm({ message, onConfirm: () => updateStatus(item) });
          }}
          style={{ cursor: "pointer" }}
        >
          <Status value={item.actif!!} />
        </div>
      ),
    },
    {
      header: t("stationManagement.modeAffectation"),
      key: "modeAffectation",
    },

    {
      header: t("common.action"),
      key: "action",
      render: (item: GeneralStations) => (
        <Flex justifyContent="center">
          <Box pr={6}>
            <Status value={false} />
          </Box>
          <FaPencilAlt
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`${path}/edit/${item.id}`);
            }}
          />
        </Flex>
      ),
    },
  ];

  //styles
  const textColor = "gray.700";

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns
      .map((column) => column.key)
      .filter((key): key is string => key !== undefined),
  );

  const filteredColumns =
    visibleColumns.length > 0
      ? columns.filter((col) => visibleColumns.includes(col.key as string))
      : columns;
  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", md: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" p="5px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                {t("stationManagement.header")}
              </Text>
              {stations && <StationExporter stations={stations} />}
            </Flex>
          </CardHeader>

          <CardBody>
            <Flex overflowX="auto">
              {!isLoading ? (
                <Scrollbars style={{ height: "calc(80vh - 185px)" }}>
                  <UITable
                    data={stations}
                    columns={filteredColumns}
                    emptyListMessage={t("stationManagement.isLoading")}
                  />
                </Scrollbars>
              ) : (
                <SkeletonTable />
              )}
              <ColumnSelector
                allColumns={columns.map((column) => ({
                  ...column,
                  key: column.key ?? "defaultKey",
                }))}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
              />
            </Flex>
          </CardBody>
          {!isLoading && (
            <Pagination
              defaultPage={creteria.page}
              defaultsize={creteria.size}
              totalPages={totalPages}
              totalElements={totalElements}
              onChange={(page, size) =>
                setCreteria({
                  page,
                  size,
                })
              }
            />
          )}
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
        <Route path={`${path}/information/:ptsId`}>
          <UploadInformationModal />
        </Route>
      </Switch>
      <ConfirmationDialog />
    </>
  );
};
export default StationManagement;
