import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react";

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
import useHttp from "hooks/use-http";
import { useEffect, useRef, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { UIColumnDefinitionType } from "../../components/UI/Table/Types";
import UITable from "../../components/UI/Table/UITable";
import useQuery from "../../hooks/use-query";

const UserManagement = () => {
  const { data: users, isLoading, makeRequest: fetchUsers } = useHttp<
    GeneralUser[]
  >(getUsers, false);
  const { t } = useTranslation();
  let { path } = useRouteMatch();
  const confirmationDialogRef = useRef<ConfirmationDialogRefType>(null);
  const [selectedUser, setSelectedUser] = useState<GeneralUser>();

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
      if (item.actif && item.id !== undefined) {
        // If currently active, deactivate
        await deactivateUser(item.id);
      } else if (item.id !== undefined) {
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
  const openConfirmationDialog = (user: GeneralUser) => {
    setSelectedUser(user);
    const message =
      user && user.actif
        ? t("customerAccounts.updateStatusDialog.desativationMessage")
        : t("customerAccounts.updateStatusDialog.activationMessage");
    const title = t("customerAccounts.updateStatusDialog.title");
    confirmationDialogRef.current?.open(title, message);
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
      header: t("common.delete"),
      render: (item) => <Status value={false} />,
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
            {isLoading && (
              <Stack width="100%" margin="20px 0px">
                <Skeleton height="50px" borderRadius="10px" />
                <Skeleton height="50px" borderRadius="10px" />
                <Skeleton height="50px" borderRadius="10px" />
                <Skeleton height="50px" borderRadius="10px" />
                <Skeleton height="50px" borderRadius="10px" />
              </Stack>
            )}
          </CardBody>
        </Card>
      </Flex>
      <Route path={`${path}/new`}>
        <UserModal onSubmit={fetchUsers} />
      </Route>
      <ConfirmationDialog
        onConfirm={updateStatusHandler}
        ref={confirmationDialogRef}
      />
    </>
  );
};

export default UserManagement;
