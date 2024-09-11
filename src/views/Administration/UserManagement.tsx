import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";

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
import React, { useState } from "react";
import { FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { formatDate } from "utils/utils";
import { FaTableList } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import LogModal from "../../components/Modal/LogModal";

const UserManagement = () => {
  const history = useHistory();
  const { t } = useTranslation();
  let { path } = useRouteMatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [creteria, setCreteria] = useState<GeneralUserCreteria>({
    page: 0,
    size: 25,
  });
  const [selectedValue, setSelectedValue] = useState<string>("administration");

  const { users, totalPages, totalElements, isLoading } = useUsers(creteria);

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
  const handleLogRedirect = (userId: number | undefined) => {
    if (userId !== undefined) {
      history.push(`${path}/log/${userId}`);
    } else {
      console.error("User ID is undefined");
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };
  const handleIconClick = async (userId: number | undefined) => {
    if (userId === undefined) {
      console.error("User ID is undefined");
      return;
    }
  };

  //styles
  const textColor = "gray.700";
  const columns: UIColumnDefinitionType<GeneralUser>[] = [
    {
      header: "#",
      key: "#",
      render: (item) => <div>{item.index}</div>,
    },
    {
      header: t("common.userIdentifier"),
      key: "identifier",
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
          {item.identifier}
        </div>
      ),
    },
    {
      header: t("userManagement.globalUsers.userNameColumn"),
      key: "username",
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
      header: t("connecte en tant que"),
      key: "..",
      render: (item: GeneralUser) => (
        <Flex justifyContent="center" alignItems="center">
          <Select onChange={(e) => handleSelectChange(e)}>
            <option value="">select </option>
            <option value="administration">administration</option>
            <option value="Dashboard">Dashboard</option>
          </Select>
          <IoMdExit
            style={{ cursor: "pointer", width: "50px", height: "20px" }}
            onClick={(e) => handleIconClick(item.id)}
          />
        </Flex>
      ),
    },
    {
      header: t("log"),
      key: "...",
      render: (item: GeneralUser) => (
        <Flex justifyContent="center">
          <FaTableList
            style={{ cursor: "pointer" }}
            onClick={() => handleLogRedirect(item.id)}
          />
        </Flex>
      ),
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
  >([]);
  // Filter columns based on visibleColumns
  const filteredColumns =
    visibleColumns.length > 0
      ? columns.filter((col) => visibleColumns.includes(col.key as string))
      : columns;
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
            onClose={() => setIsOpen(false)}
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
                  columns={filteredColumns}
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
        <Route path={`${path}/log/:userId`}>
          <LogModal />
        </Route>
      </Switch>
      <ConfirmationDialog />
    </>
  );
};

export default UserManagement;
