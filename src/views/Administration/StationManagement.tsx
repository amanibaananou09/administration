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
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

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

  const exportToExcelHandler = () => {
    if (stations) {
      const data = stations.map((station) => ({
        ID: station.id || "",
        Name: station.name || "",
        Address: station.address || "",
        Creator: station.creatorCustomerAccountName || "",
        CustomerAccount: station.customerAccountName || "",
        ControllerType: station.controllerPts.controllerType || "",
        PtsId: station.controllerPts.ptsId || "",
        Active: station.actif
          ? t("accountDetailsModel.active")
          : t("accountDetailsModel.inActive"),
        Phone: station.controllerPts.phone || "",
        Country: station.country?.name || "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        t("routes.manageStations"),
      );
      XLSX.writeFile(workbook, "stations.xlsx");
    }
  };

  const exportToPDFHandler = () => {
    const doc = new jsPDF() as any;
    const tableColumn = [
      "ID",
      "Name",
      "Address",
      "Creator",
      "CustomerAccount",
      "ControllerType",
      "PtsId",
      "Active",
      "Phone",
      "Country",
    ];
    const tableRows: any[][] = [];

    if (stations) {
      stations.forEach((station) => {
        const rowData = [
          station.id || "",
          station.name || "",
          station.address || "",
          station.creatorCustomerAccountName || "",
          station.customerAccountName || "",
          station.controllerPts.controllerType || "",
          station.controllerPts.ptsId || "",
          station.actif
            ? t("accountDetailsModel.active")
            : t("accountDetailsModel.inActive"),
          station.controllerPts.phone || "",
          station.country?.name || "",
        ];
        tableRows.push(rowData);
      });
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text(t("routes.manageStations"), 14, 10);
    doc.save("stations.pdf");
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
              <Flex>
                <ButtonGroup spacing={4}>
                  <Button onClick={exportToExcelHandler}>
                    {t("common.exportExcel")}
                  </Button>
                  <Button onClick={exportToPDFHandler}>
                    {t("common.exportPDF")}
                  </Button>
                </ButtonGroup>
              </Flex>
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
