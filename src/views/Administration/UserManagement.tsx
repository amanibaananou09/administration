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
import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { decodeToken, formatDate } from "utils/utils";
import { FaTableList } from "react-icons/fa6";
import LogModal from "../../components/Modal/LogModal";
import { impersonateUser } from "../../common/api/auth-api";
import { useAuth } from "../../store/AuthContext";
import LoggedAsSelect from "../../components/select/loggedAsSelect";
import Scrollbars from "react-custom-scrollbars";

const UserManagement = () => {
  const history = useHistory();
  const { t } = useTranslation();
  let { path } = useRouteMatch();
  const { signIn } = useAuth();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [creteria, setCreteria] = useState<GeneralUserCreteria>({
    page: 0,
    size: 25,
  });
  const [selectedValues, setSelectedValues] = useState<{
    [key: number]: string;
  }>({});

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

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    userId: number | undefined,
  ) => {
    if (userId !== undefined) {
      setSelectedValues((prevValues) => ({
        ...prevValues,
        [userId]: e.target.value,
      }));
    }
  };
  const handleImpersonate = async (userId: number | undefined) => {
    if (userId === undefined) {
      console.error("User ID is undefined");
      return;
    }
    try {
      const {
        access_token,
        impersonation_mode,
        original_user_id,
      } = await impersonateUser(userId);
      const user = decodeToken(access_token);

      if (user) {
        user.impersonationMode = impersonation_mode;
        user.originalUserId = original_user_id;
        localStorage.setItem(
          "impersonationMode",
          impersonation_mode.toString(),
        );
        localStorage.setItem(
          "originalUserId",
          original_user_id?.toString() || "",
        );
      }

      signIn(user!!);
    } catch (err) {
      console.error("Failed :", err);
    }
  };

  const handleIconClick = async (userId: number | undefined) => {
    if (userId === undefined) {
      console.error("User ID is undefined");
      return;
    }
    const selectedValue = selectedValues[userId];
    if (selectedValue === "administration") {
      await handleImpersonate(userId);
    } else if (selectedValue === "Dashboard") {
      try {
        const {
          access_token,
          impersonation_mode,
          original_user_id,
        } = await impersonateUser(userId);

        const url = `https://dashboard-rec.teknoword.com/?access_token=${encodeURIComponent(
          access_token,
        )}&impersonation_mode=${encodeURIComponent(
          impersonation_mode,
        )}&original_user_id=${encodeURIComponent(
          original_user_id?.toString() || "",
        )}#/auth/signin`;

        window.open(url, "_blank");
      } catch (err) {
        console.error("Failed to impersonate user:", err);
      }
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
      key: "userIdentifier",
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
          {item.userIdentifier}
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
      header: t("userManagement.globalUsers.connectAs"),
      key: "loggedAs",
      render: (item: GeneralUser) =>
        user?.customerAccountId != item.customerAccountId ? (
          <LoggedAsSelect
            userId={item.id}
            customerAccountId={item.customerAccountId}
            selectedValue={
              item.id !== undefined ? selectedValues[item.id] || "" : ""
            }
            handleSelectChange={handleSelectChange}
            handleIconClick={handleIconClick}
          />
        ) : null,
    },
    {
      header: t("userManagement.globalUsers.log"),
      key: "log",
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
              {!isLoading ? (
                <Scrollbars style={{ height: "calc(80vh - 185px)" }}>
                  <UITable
                    data={users}
                    columns={filteredColumns}
                    emptyListMessage={t("userManagement.globalUsers.listEmpty")}
                  />
                </Scrollbars>
              ) : (
                <SkeletonTable />
              )}
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
