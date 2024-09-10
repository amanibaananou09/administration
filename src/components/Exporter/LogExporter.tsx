import { Button, ButtonGroup } from "@chakra-ui/react";

import { GeneralUser, Log } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatDate } from "utils/utils";
import * as XLSX from "xlsx";

type LogExporterProps = {
  logs: Log[];
};

const LogExporter = ({ logs }: LogExporterProps) => {
  const { t } = useTranslation();

  const exportToExcelHandler = () => {
    if (logs) {
      const data = logs.map((log,index) => ({
        [t("#")]: index + 1,
        [t("logModal.dateAndTime")]: formatDate(log.activityDate) || "",
        [t("logModal.user")]: log.userName || "",
        [t("logModal.action")]: log.action || "",
        [t("logModal.typeOfAction")]: log.impersonationMode
          ? "Impersonation"
          : "Ressource",
        [t("logModal.host")]: log.ipAddress || "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, t("logModal.title"));
      XLSX.writeFile(workbook, "log.xlsx");
    }
  };

  return (
    <ButtonGroup fontSize="md" colorScheme="teal" fontWeight="bold" size="lg">
      <Button onClick={exportToExcelHandler}>{t("logModal.export")}</Button>
    </ButtonGroup>
  );
};

export default LogExporter;
