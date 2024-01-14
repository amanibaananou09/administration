import { Flex, Text } from "@chakra-ui/react";

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
import UserDetailsModal, {
  UserDetailsModalRefType,
} from "components/Modal/UserDetailsModal";
import UserModal from "components/Modal/UserModal";
import Status from "components/Sidebar/Status";
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import useHttp from "hooks/use-http";
import useQuery from "hooks/use-query";
import { useEffect, useRef, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { formatDate } from "utils/utils";

const UserManagement = () => {
  const { data: users, isLoading, makeRequest: fetchUsers } = useHttp<
    GeneralUser[]
  >(getUsers, false);
  const { t } = useTranslation();
  let { path } = useRouteMatch();
  const confirmationDialogRef = useRef<ConfirmationDialogRefType>(null);
  const [selectedUser, setSelectedUser] = useState<GeneralUser>();

  const userDetailModalRef = useRef<UserDetailsModalRefType>(null);

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
          onClick={() => userDetailModalRef.current?.open(item)}
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
      header: t("common.delete"),
      render: () => <Status value={false} />,
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
      <Route path={`${path}/new`}>
        <UserModal onSubmit={fetchUsers} />
      </Route>
      <ConfirmationDialog
        onConfirm={updateStatusHandler}
        ref={confirmationDialogRef}
      />
      <UserDetailsModal ref={userDetailModalRef} />
    </>
  );
};

export default UserManagement;
