import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useConfirm } from "components/Dialog/ConfirmationDialog";
import CustomerAccountModal from "components/Modal/CustomerAccountModal";
import Status from "components/Sidebar/Status";
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import {
  useCustomerAccountQueries,
  useCustomerAccounts,
} from "hooks/use-customer-account";
import { FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const CustomerAccountManagement = () => {
  const { t } = useTranslation();
  const history = useHistory();
  let { path } = useRouteMatch();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const {
    customerAccounts,
    totalPages,
    totalElements,
    isLoading,
  } = useCustomerAccounts({
    page: currentPage,
  });
  const { activate, desactivate } = useCustomerAccountQueries();

  const numberOfElements = customerAccounts ? customerAccounts.length : 0;

  const { confirm, ConfirmationDialog } = useConfirm({
    title: t("customerAccounts.updateStatusDialog.title"),
    onConfirm: (customerAccount) => updateStatus(customerAccount),
  });

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
          Name: name,
          Creator: creatorCustomerAccountName,
          Parent: parentName,
          Rights: resaleRight ? t("common.reseller") : "-",
          Status: actif
            ? t("accountDetailsModel.active")
            : t("accountDetailsModel.inActive"),
          Stations: stationsCount,
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
      "Name",
      "Creator",
      "Parent",
      "Rights",
      "Status",
      "Stations",
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
    });

    // Set document title
    doc.text(t("routes.manageAccounts"), 14, 10);

    // Save PDF file
    doc.save("customer_accounts.pdf");
  };

  const submitModalHandler = async () => {};
  const updateStatus = (customerAccount: CustomerAccount) => {
    if (customerAccount.actif && customerAccount.id) {
      // If currently active, deactivate
      desactivate(customerAccount.id);
    } else if (customerAccount.id) {
      // If currently inactive, activate
      activate(customerAccount.id);
    }
  };

  //styles
  const textColor = "gray.700";

  const columns: UIColumnDefinitionType<CustomerAccount>[] = [
    {
      header: "#",
      key: "#",
    },
    {
      header: t("common.name"),
      key: "name",
      render: (item: CustomerAccount) => (
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
      header: t("common.compteParent"),
      key: "parentName",
    },
    {
      header: t("common.droits"),
      render: (item: CustomerAccount) =>
        item.resaleRight ? t("common.reseller") : "-",
    },
    {
      header: t("common.status"),
      render: (item: CustomerAccount) => (
        <div
          onClick={() => {
            const message = item.actif
              ? t("customerAccounts.updateStatusDialog.desativationMessage")
              : t("customerAccounts.updateStatusDialog.activationMessage");
            confirm(item, message);
          }}
          style={{ cursor: "pointer" }}
        >
          <Status value={item.actif!!} />
        </div>
      ),
    },
    {
      header: t("common.stations"),
      key: "stationsCount",
    },
    {
      header: t("common.action"),
      render: (item: CustomerAccount) => (
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

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                {t("customerAccounts.header")}
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
            {!isLoading && customerAccounts && (
              <UITable
                data={customerAccounts.sort(
                  (c1, c2) => Number(c1.id!!) - Number(c2.id!!),
                )}
                columns={columns}
                emptyListMessage={t("customerAccounts.listEmpty")}
              />
            )}

            {isLoading && <SkeletonTable />}
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
          <CustomerAccountModal
            onSubmit={submitModalHandler}
            mode={Mode.CREATE}
          />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <CustomerAccountModal
            onSubmit={submitModalHandler}
            mode={Mode.EDIT}
          />
        </Route>
        <Route path={`${path}/details/:id`}>
          <CustomerAccountModal
            onSubmit={submitModalHandler}
            mode={Mode.VIEW}
          />
        </Route>
      </Switch>

      <ConfirmationDialog />
    </>
  );
};

export default CustomerAccountManagement;
