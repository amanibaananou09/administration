import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { GeneralStationCreteria, GeneralStations } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ColumnSelectionDropdown from "components/ColumnSelector/ColumnSelector";
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
import { useEffect, useState } from "react";
import { FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

const StationManagement = () => {
  const history = useHistory();
  const { t } = useTranslation();
  let { path } = useRouteMatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [creteria, setCreteria] = useState<GeneralStationCreteria>({
    page: 0,
    size: 25,
  });

  const { stations, totalPages, totalElements, isLoading } =
    useStations(creteria);
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
      header: t("stationManagement.name"),
      key: "name",
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
          {item.name}
        </div>
      ),
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
          {new Date(item.dateStatusChange).toLocaleString()}
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

  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [displayedColumns, setDisplayedColumns] = useState<
    UIColumnDefinitionType<GeneralStations>[]
  >([]);
  useEffect(() => {
    setDisplayedColumns(
      visibleColumns.length > 0
        ? columns.filter((col) => visibleColumns.includes(col.key as string))
        : columns,
    );
  }, [columns, visibleColumns]);
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
          <ColumnSelectionDropdown
            columns={columns}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            setDisplayedColumns={setDisplayedColumns}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
          <CardBody>
            <Flex overflowX="auto">
              {!isLoading && (
                <UITable
                  data={stations}
                  columns={displayedColumns}
                  emptyListMessage={t("stationManagement.isLoading")}
                />
              )}

              {isLoading && <SkeletonTable />}
              <Button
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                bg="white"
                mr={50}
                mt={3}
              >
                <FaEllipsisV />
              </Button>
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
      </Switch>
      <ConfirmationDialog />
    </>
  );
};
export default StationManagement;
