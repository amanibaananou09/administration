import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";

import { GeneralStations } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useConfirm } from "components/Dialog/ConfirmationDialog";
import StationModal from "components/Modal/StationModal";
import Status from "components/Sidebar/Status";
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import { useStationQueries, useStations } from "hooks/use-station";
import { FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";

const StationManagement = () => {
  const history = useHistory();
  const { t } = useTranslation();
  let { path } = useRouteMatch();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const { stations, totalPages, totalElements, isLoading } = useStations({
    page: currentPage,
  });
  const { activate, desactivate } = useStationQueries();

  const numberOfElements = stations ? stations.length : 0;

  const { ConfirmationDialog, confirm } = useConfirm({
    onConfirm: (item) => updateStatus(item),
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
          onClick={() => {
            const message = item.actif
              ? t("stationManagement.updateStatusDialog.desativationMessage")
              : t("stationManagement.updateStatusDialog.activationMessage");
            confirm(item, message);
          }}
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
              history.push(`${path}/edit/${item.id}`);
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
          <Box
            display={{ base: "none", md: "flex" }}
            justifyContent="flex-end"
            p="4"
          >
            <ButtonGroup spacing={4}>
              <Button
                isDisabled={currentPage === 0 || totalPages === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {t("common.previous")}
              </Button>
              <Button isDisabled={currentPage === 0 || totalPages === 0}>
                {t("common.page")} {currentPage + 1} {t("common.of")}{" "}
                {totalPages}
              </Button>
              <Button
                isDisabled={currentPage === totalPages - 1 || totalPages === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {t("common.next")}
              </Button>
              <Button isDisabled={currentPage === 0 || totalPages === 0}>
                {t("common.report")} {numberOfElements} {t("common.on")}{" "}
                {totalElements}
              </Button>
            </ButtonGroup>
          </Box>
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
