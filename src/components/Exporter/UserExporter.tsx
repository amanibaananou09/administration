import { Button, ButtonGroup } from "@chakra-ui/react";

import { GeneralUser } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatDate } from "utils/utils";
import * as XLSX from "xlsx";

type UserExporterProps = {
  users: GeneralUser[];
};

const UserExporter = ({ users }: UserExporterProps) => {
  const { t } = useTranslation();

  const exportToExcelHandler = () => {
    if (users) {
      const data = users.map((user) => ({
        ID: user.id || "",
        [t("userManagement.globalUsers.userNameColumn")]: user.username || "",
        [t("userManagement.globalUsers.accountCreator")]:
          user.creatorCustomerAccountName || "",
        [t("userManagement.globalUsers.account")]:
          user.customerAccountName || "",
        [t("userManagement.globalUsers.statusColumn")]: user.actif
          ? "Active"
          : "Inactive",
        [t("userManagement.globalUsers.lastVisit")]: formatDate(
          user.lastConnectionDate,
        ),
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        t("routes.manageUsers"),
      );
      XLSX.writeFile(workbook, "users.xlsx");
    }
  };

  const exportToPDFHandler = () => {
    const doc = new jsPDF() as any;
    const tableColumn = [
      "ID",
      t("userManagement.globalUsers.userNameColumn"),
      t("userManagement.globalUsers.accountCreator"),
      t("userManagement.globalUsers.account"),
      t("userManagement.globalUsers.statusColumn"),
      t("userManagement.globalUsers.lastVisit"),
    ];
    const tableRows: any[][] = [];

    if (users) {
      users.forEach((user, index) => {
        const rowData = [
          user.id || "",
          user.username || "",
          user.creatorCustomerAccountName || "",
          user.customerAccountName || "",
          user.actif
            ? t("accountDetailsModel.active")
            : t("accountDetailsModel.inActive"),
          formatDate(user.lastConnectionDate),
        ];
        tableRows.push(rowData);
      });
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
    });

    doc.text(t("routes.manageUsers"), 14, 10);
    doc.save("users.pdf");
  };

  return (
    <ButtonGroup size="sm" spacing={4}>
      <Button onClick={exportToExcelHandler}>{t("common.exportExcel")}</Button>
      <Button onClick={exportToPDFHandler}>{t("common.exportPDF")}</Button>
    </ButtonGroup>
  );
};

export default UserExporter;
