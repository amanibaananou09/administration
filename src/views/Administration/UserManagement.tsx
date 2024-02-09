import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";

import { GeneralUser } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useConfirm } from "components/Dialog/ConfirmationDialog";
import UserModal from "components/Modal/UserModal";
import Status from "components/Sidebar/Status";
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import { useUserQueries, useUsers } from "hooks/use-user";
import { FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { formatDate } from "utils/utils";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const UserManagement = () => {
  const history = useHistory();
  const { t } = useTranslation();
  let { path } = useRouteMatch();

  const [currentPage, setCurrentPage] = useState<number>(0);

  const { users, totalPages, totalElements, isLoading } = useUsers({
    page: currentPage,
  });
  const { activate, desactivate } = useUserQueries();
  const numberOfElements = users ? users.length : 0;

  const { confirm, ConfirmationDialog } = useConfirm({
    title: t("customerAccounts.updateStatusDialog.title"),
    onConfirm: (user) => updateStatus(user),
  });

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

  const submitModalHandler = async () => {};
  const updateStatus = async (user: GeneralUser) => {
    if (user.actif && user.id) {
      // If currently active, deactivate
      desactivate(user.id);
    } else if (user.id) {
      // If currently inactive, activate
      activate(user.id);
    }
  };

  //styles
  const textColor = "gray.700";
  const columns: UIColumnDefinitionType<GeneralUser>[] = [
    {
      header: "#",
      key: "#",
    },
    {
      header: t("userManagement.globalUsers.userNameColumn"),
      render: (item: GeneralUser) => (
        <div
          style={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            history.push(`${path}/details/${item.id}`);
          }}
        >
          {item.username}
        </div>
      ),
    },
    {
      header: t("userManagement.globalUsers.accountCreator"),
      key: "creatorCustomerAccountName",
    },

    {
      header: t("userManagement.globalUsers.account"),
      key: "customerAccountName",
    },
    {
      header: t("userManagement.globalUsers.lastVisit"),
      render: (generalUser) => formatDate(generalUser.lastConnectionDate),
    },
    {
      header: t("userManagement.globalUsers.statusColumn"),
      render: (item) => (
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
      header: t("common.action"),
      render: (item: GeneralUser) => (
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
            <Flex align="center" justify="space-between" p="5px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                {t("userManagement.globalUsers.header")}
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
            {!isLoading && users && (
              <UITable
                data={users}
                columns={columns}
                emptyListMessage={t("userManagement.globalUsers.listEmpty")}
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
          <UserModal onSubmit={submitModalHandler} mode={Mode.CREATE} />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <UserModal onSubmit={submitModalHandler} mode={Mode.EDIT} />
        </Route>
        <Route path={`${path}/details/:id`}>
          <UserModal onSubmit={submitModalHandler} mode={Mode.VIEW} />
        </Route>
      </Switch>
      <ConfirmationDialog />
    </>
  );
};

export default UserManagement;
