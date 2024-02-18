import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { GeneralUser, GeneralUserCreteria } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ColumnSelectionDropdown from "components/ColumnSelector/ColumnSelector";
import { useConfirm } from "components/Dialog/ConfirmationDialog";
import UserExporter from "components/Exporter/UserExporter";
import UserModal from "components/Modal/UserModal";
import Pagination from "components/Pagination/Pagination";
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

const UserManagement = () => {
  const history = useHistory();
  const { t } = useTranslation();
  let { path } = useRouteMatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [creteria, setCreteria] = useState<GeneralUserCreteria>({
    page: 0,
    size: 25,
  });

  const { users, totalPages, totalElements, size, isLoading } = useUsers(
    creteria,
  );
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
        <div>{calculateIndex(creteria.page, index)}</div>
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
              <Button
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                bg="white"
                mr={1}
              >
                <FaEllipsisV />
              </Button>
              {!isLoading && (
                <UITable
                  data={users}
                  columns={displayedColumns}
                  emptyListMessage={t("userManagement.globalUsers.listEmpty")}
                />
              )}

              {isLoading && <SkeletonTable />}
            </Flex>
          </CardBody>
          {!isLoading && (
            <Pagination
              defaultPage={creteria.page}
              defaultsize={creteria.size}
              totalPages={totalPages}
              totalElements={totalElements}
              onChange={(page, size) =>
                setCreteria({
                  page,
                  size,
                })
              }
            />
          )}
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
