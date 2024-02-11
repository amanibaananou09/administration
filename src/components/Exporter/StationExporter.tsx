import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { GeneralStations } from "common/AdminModel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";

type StationExporterProps = {
  stations: GeneralStations[];
};

const StationExporter = ({ stations }: StationExporterProps) => {
  const { t } = useTranslation();

  const exportToExcelHandler = () => {
    if (stations) {
      const data = stations.map((station) => ({
        ID: station.id || "",
        [t("stationManagement.name")]: station.name || "",
        [t("common.address")]: station.address || "",
        [t("stationManagement.creator")]:
          station.creatorCustomerAccountName || "",
        [t("stationManagement.compte")]: station.customerAccountName || "",
        [t("stationManagement.typeController")]:
          station.controllerPts?.controllerType || "",
        [t("stationManagement.controllerId")]:
          station.controllerPts?.ptsId || "",
        [t("common.status")]: station.actif
          ? t("accountDetailsModel.active")
          : t("accountDetailsModel.inActive"),
        [t("stationManagement.phone")]: station.controllerPts?.phone || "",
        [t("common.country")]: station.country?.name || "",
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
      t("stationManagement.name"),
      t("common.address"),
      t("stationManagement.creator"),
      t("stationManagement.compte"),
      t("stationManagement.typeController"),
      t("stationManagement.controllerId"),
      t("common.status"),
      t("stationManagement.phone"),
      t("common.country"),
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
          station.controllerPts?.controllerType || "",
          station.controllerPts?.ptsId || "",
          station.actif
            ? t("accountDetailsModel.active")
            : t("accountDetailsModel.inActive"),
          station.controllerPts?.phone || "",
          station.country?.name || "",
        ];
        tableRows.push(rowData);
      });
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 6 },
    });

    doc.text(t("routes.manageStations"), 14, 10);
    doc.save("stations.pdf");
  };

  return (
    <Flex>
      <ButtonGroup spacing={4}>
        <Button onClick={exportToExcelHandler}>
          {t("common.exportExcel")}
        </Button>
        <Button onClick={exportToPDFHandler}>{t("common.exportPDF")}</Button>
      </ButtonGroup>
    </Flex>
  );
};

export default StationExporter;
