import { Button, ButtonGroup } from "@chakra-ui/react";
import { GeneralStations } from "common/AdminModel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import { formatDate } from "../../utils/utils";

type StationExporterProps = {
  stations: GeneralStations[];
};

const StationExporter = ({ stations }: StationExporterProps) => {
  const { t } = useTranslation();

  const exportToExcelHandler = () => {
    if (stations) {
      const data = stations.map((station) => ({
        [t("stationManagement.name")]: station.name || "",
        [t("stationManagement.compte")]: station.customerAccountName || "",
        [t("stationManagement.creator")]:
          station.creatorCustomerAccountName || "",
        [t("stationManagement.typeController")]:
          station.controllerPts?.controllerType || "",
        [t("stationManagement.controllerId")]:
          station.controllerPts?.ptsId || "",
        [t("stationManagement.phone")]: station.controllerPts?.phone || "",
        [t("stationManagement.created")]: station.dateStatusChange || "",
        [t("stationModal.cordonneesGps")]: station.cordonneesGps || "",
        [t("common.address")]: station.address || "",
        [t("common.country")]: station.country?.name || "",
        [t("common.status")]: station.actif
          ? t("accountDetailsModel.active")
          : t("accountDetailsModel.inActive"),
        [t("stationManagement.modeAffectation")]: station.modeAffectation || "",
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
      "#",
      t("stationManagement.name"),
      t("stationManagement.creator"),
      t("stationManagement.compte"),
      t("stationManagement.typeController"),
      t("stationManagement.controllerId"),
      t("stationManagement.phone"),
      t("stationManagement.created"),
      t("stationModal.cordonneesGps"),
      t("common.address"),
      t("common.country"),
      t("common.status"),
      t("stationManagement.modeAffectation"),
    ];
    const tableRows: any[][] = [];

    if (stations) {
      stations.forEach((station, index) => {
        const rowData = [
          index + 1,
          station.name || "",
          station.customerAccountName || "",
          station.creatorCustomerAccountName || "",
          station.controllerPts?.controllerType || "",
          station.controllerPts?.ptsId || "",
          station.controllerPts?.phone || "",
          formatDate(station.dateStatusChange) || "",
          station.cordonneesGps || "",
          station.address || "",
          station.country?.name || "",
          station.actif
            ? t("accountDetailsModel.active")
            : t("accountDetailsModel.inActive"),
          station.modeAffectation || "",
        ];
        tableRows.push(rowData);
      });
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 5 },
    });

    // Calculate the center of the page
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth =
      (doc.getStringUnitWidth(t("routes.manageStations")) *
        doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const xOffset = (pageWidth - titleWidth) / 2;

    // Center align the title
    doc.text(t("routes.manageStations"), xOffset, 10);

    const title = t("routes.manageStations");

    doc.save(`${title}.pdf`);
  };

  return (
    <ButtonGroup size="sm" spacing={4}>
      <Button onClick={exportToExcelHandler}>{t("common.exportExcel")}</Button>
      <Button onClick={exportToPDFHandler}>{t("common.exportPDF")}</Button>
    </ButtonGroup>
  );
};

export default StationExporter;
