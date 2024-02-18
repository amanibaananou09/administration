import { Button, ButtonGroup } from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

type CustomerAccountExporterProps = {
  customerAccounts: CustomerAccount[];
};

const CustomerAccountExporter = ({
  customerAccounts,
}: CustomerAccountExporterProps) => {
  const { t } = useTranslation();

  const exportToExcelHandler = () => {
    if (customerAccounts) {
      // Extracting only required fields and mapping them to the desired order
      const data = customerAccounts.map(
        ({
          id,
          name,
          creatorCustomerAccountName,
          parentName,
          resaleRight,
          actif,
          stationsCount,
        }) => ({
          ID: id,
          [t("common.name")]: name,
          [t("common.creator")]: creatorCustomerAccountName,
          [t("common.compteParent")]: parentName,
          [t("common.droits")]: resaleRight ? t("common.reseller") : "-",
          [t("common.status")]: actif
            ? t("accountDetailsModel.active")
            : t("accountDetailsModel.inActive"),
          [t("common.stationsCount")]: stationsCount,
        }),
      );

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        t("routes.manageAccounts"),
      );
      XLSX.writeFile(workbook, "customer_accounts.xlsx");
    }
  };

  const exportToPDFHandler = () => {
    const doc = new jsPDF() as any;
    const tableColumn = [
      "ID",
      t("common.name"),
      t("common.creator"),
      t("common.compteParent"),
      t("common.droits"),
      t("common.status"),
      t("common.stations"),
    ];
    const tableRows: any[][] = [];

    if (customerAccounts) {
      // Prepare table rows
      customerAccounts.forEach((customerAccount, index) => {
        const rowData = [
          index + 1, // ID
          customerAccount.name,
          customerAccount.creatorCustomerAccountName,
          customerAccount.parentName,
          customerAccount.resaleRight ? t("common.reseller") : "-",
          customerAccount.actif
            ? t("accountDetailsModel.active")
            : t("accountDetailsModel.inActive"),
          customerAccount.stationsCount,
        ];
        tableRows.push(rowData);
      });
    }

    // Add table headers and rows
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
    });

    // Set document title
    doc.text(t("routes.manageAccounts"), 14, 10);

    // Save PDF file
    doc.save("customer_accounts.pdf");
  };

  return (
    <ButtonGroup size="sm" spacing={4}>
      <Button onClick={exportToExcelHandler}>{t("common.exportExcel")}</Button>
      <Button onClick={exportToPDFHandler}>{t("common.exportPDF")}</Button>
    </ButtonGroup>
  );
};

export default CustomerAccountExporter;
