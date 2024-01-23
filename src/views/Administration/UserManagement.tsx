import { Box, Flex, Text } from "@chakra-ui/react";

import { GeneralUser } from "common/AdminModel";
import {
  activateUser,
  deactivateUser,
  getUsers,
} from "common/api/general-user-api";
import { useTranslation } from "react-i18next";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ConfirmationDialog, {
  ConfirmationDialogRefType,
} from "components/Dialog/ConfirmationDialog";
import UserModal from "components/Modal/UserModal";
import Status from "components/Sidebar/Status";
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import useHttp from "hooks/use-http";
import useQuery from "hooks/use-query";
import { useEffect, useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { formatDate } from "utils/utils";
import { Mode } from "../../common/enums";

const UserManagement = () => {
  const { data: users, isLoading, makeRequest: fetchUsers } = useHttp<
    GeneralUser[]
  >(getUsers, false);
  const { t } = useTranslation();
  let { path } = useRouteMatch();
  const confirmationDialogRef = useRef<ConfirmationDialogRefType>(null);
  const [selectedUser, setSelectedUser] = useState<GeneralUser>();

  const history = useHistory();

  const query = useQuery();
  const name = query.get("name");
  const creator = query.get("creator");
  const parent = query.get("parent");

  useEffect(() => {
    fetchUsers({
      name,
      creator,
      parent,
    });
  }, [query]);

  const updateStatusHandler = async () => {
    if (selectedUser) {
      let item = selectedUser;
      if (item.actif && item.id) {
        // If currently active, deactivate
        await deactivateUser(item.id);
      } else if (item.id) {
        // If currently inactive, activate
        await activateUser(item.id);
      }

      await fetchUsers({
        name,
        creator,
        parent,
      });
    }
  };
  const submitModalHandler = async () => {
    await fetchUsers();
  };

  const openConfirmationDialog = (user: GeneralUser) => {
    setSelectedUser(user);
    const message =
      user && user.actif
        ? t("customerAccounts.updateStatusDialog.desativationMessage")
        : t("customerAccounts.updateStatusDialog.activationMessage");
    const title = t("customerAccounts.updateStatusDialog.title");
    confirmationDialogRef.current?.open(title, message);
  };

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
            const clickedUser = users?.find((acc) => acc && acc.id === item.id);

            if (clickedUser) {
              setSelectedUser(clickedUser);
              history.push(`${path}/details/${item.id}`);
            }
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
          onClick={() => openConfirmationDialog(item)}
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
              const clickedUser = users?.find(
                (user) => user && user.id === item.id,
              );

              if (clickedUser) {
                setSelectedUser(clickedUser);
                history.push(`${path}/edit/${item.id}`);
              }
            }}
          />
        </Flex>
      ),
    },
  ];

  //styles
  const textColor = "gray.700";

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" p="5px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                {t("userManagement.globalUsers.header")}
              </Text>
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
        </Card>
      </Flex>
      <Switch>
        <Route path={`${path}/new`}>
          <UserModal onSubmit={fetchUsers} mode={Mode.CREATE} />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <UserModal onSubmit={submitModalHandler} mode={Mode.EDIT} />
        </Route>
        <Route path={`${path}/details/:id`}>
          <UserModal onSubmit={submitModalHandler} mode={Mode.VIEW} />
        </Route>
      </Switch>
      <ConfirmationDialog
        onConfirm={updateStatusHandler}
        ref={confirmationDialogRef}
      />
    </>
  );
};

export default UserManagement;
