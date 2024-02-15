import { Box, Button, ButtonGroup, Flex, Select, Text } from "@chakra-ui/react";

import { GeneralUser } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useConfirm } from "components/Dialog/ConfirmationDialog";
import UserExporter from "components/Exporter/UserExporter";
import UserModal from "components/Modal/UserModal";
import Status from "components/Sidebar/Status";
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import { useUserQueries, useUsers } from "hooks/use-user";
import "jspdf-autotable";
import { useState } from "react";
import { FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { formatDate } from "utils/utils";
import ColumnSelectionDropdown from "components/ColumnSelector/ColumnSelector";

const UserManagement = () => {
  const history = useHistory();
  const { t } = useTranslation();
  let { path } = useRouteMatch();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(50);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { users, totalPages, totalElements, size, isLoading } = useUsers({
    page: currentPage,
    size: pageSize,
  });
  const { activate, desactivate } = useUserQueries();

  const { confirm, ConfirmationDialog } = useConfirm({
    title: t("customerAccounts.updateStatusDialog.title"),
  });

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

  const calculateIndex = (currentPage: number, index: number) => {
    return currentPage * size + index + 1;
  };

  //styles
  const textColor = "gray.700";
  const columns: UIColumnDefinitionType<GeneralUser>[] = [
    {
      header: "#",
      key: "#",
      render: (item: GeneralUser, index: number) => (
        <div>{calculateIndex(currentPage, index)}</div>
      ),
    },
    {
      header: t("userManagement.globalUsers.userNameColumn"),
      key: "userNameColumn",
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
      key: "lastVisit",
      render: (generalUser) => formatDate(generalUser.lastConnectionDate),
    },
    {
      header: t("userManagement.globalUsers.statusColumn"),
      key: "statusColumn",
      render: (item) => (
        <div
          onClick={() => {
            const message = item.actif
              ? t("customerAccounts.updateStatusDialog.desativationMessage")
              : t("customerAccounts.updateStatusDialog.activationMessage");
            confirm({ message, onConfirm: () => updateStatus(item) });
          }}
          style={{ cursor: "pointer" }}
        >
          <Status value={item.actif!!} />
        </div>
      ),
    },
    {
      header: t("common.action"),
      key: "action",
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
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [displayedColumns, setDisplayedColumns] = useState<
    UIColumnDefinitionType<GeneralUser>[]
  >(columns);
  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" p="5px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                {t("userManagement.globalUsers.header")}
              </Text>
              {users && <UserExporter users={users} />}
            </Flex>
          </CardHeader>
          <ColumnSelectionDropdown
            columns={columns}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            setDisplayedColumns={setDisplayedColumns}
            isOpen={isOpen}
          />
          <CardBody>
            <Flex direction="row-reverse">
              <Button onClick={() => setIsOpen(!isOpen)} bg="white" mr={1}>
                <FaEllipsisV />
              </Button>
              {!isLoading && users && (
                <UITable
                  data={users}
                  columns={displayedColumns}
                  emptyListMessage={t("userManagement.globalUsers.listEmpty")}
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
                onClick={() => setCurrentPage(0)}
              >
                {"<<"}
              </Button>
              <Button
                isDisabled={currentPage === 0 || totalPages === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {"<"}
              </Button>
              <Button isDisabled={currentPage === 0 || totalPages === 0}>
                {t("common.page")} {currentPage + 1} {t("common.of")}{" "}
                {totalPages}
              </Button>
              <Button
                isDisabled={currentPage === totalPages - 1 || totalPages === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {">"}
              </Button>
              <Button
                isDisabled={currentPage === totalPages - 1 || totalPages === 0}
                onClick={() => setCurrentPage(totalPages - 1)}
              >
                {">>"}
              </Button>
              <Button isDisabled={currentPage === 0 || totalPages === 0}>
                {totalElements} {t("common.report")}
              </Button>
            </ButtonGroup>
            <Select
              value={pageSize.toString()}
              onChange={(e) => setPageSize(Number(e.target.value))}
              w="fit-content"
              ml="4"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="500">500</option>
            </Select>
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
