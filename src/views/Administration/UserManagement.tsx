import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react";

import { GeneralUser } from "common/AdminModel";
import {
  activateUser,
  deactivateUser,
  listUser,
  findUserByFilter,
} from "common/api/general-user-api";
import { useTranslation } from "react-i18next";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import UserModal from "components/Modal/UserModal";
import useHttp from "hooks/use-http";
import { Route, useRouteMatch } from "react-router-dom";
import useQuery from "../../hooks/use-query";
import { useEffect, useState } from "react";
import { UIColumnDefinitionType } from "../../components/Table/Types";
import UITable from "../../components/Table/UITable";
import { getCustomerAccountInformation } from "../../common/api/station-api";

const UserManagement = () => {
  const { data: users, isLoading, makeRequest: fetchUsers } = useHttp<
    GeneralUser[]
  >(listUser);
  const { t } = useTranslation("administration");
  let { path } = useRouteMatch();

  //styles
  const textColor = "gray.700";

  const [actif, setActif] = useState(false);

  const [filteredAccounts, setFilteredAccounts] = useState([]);
  let filterType = "";
  let filterValue = "";

  const query = useQuery();
  const name = query.get("name") || "";
  const creator = query.get("creator") || "";
  const parent = query.get("parent") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have choice, name, creator, and parent from query parameters
        if (name) {
          filterType = "name";
          filterValue = name;
        } else if (creator) {
          filterType = "creator";
          filterValue = creator;
        } else if (parent) {
          filterType = "parent";
          filterValue = parent;
        } else if (!name && !creator && !parent) {
          filterType = "";
          filterValue = "";
        } else {
          console.error("No valid query parameter found.");
          return;
        }

        const filteredAccounts = await findUserByFilter(
          filterType,
          filterValue,
        );
        setFilteredAccounts(filteredAccounts);
      } catch (error) {
        console.error("Error fetching filtered accounts:", error);
      }
    };

    fetchData();
  }, [name, creator, parent]);

  console.log("users", users);
  console.log("filteredAccounts", filteredAccounts);

  const handleClick = async (item: GeneralUser) => {
    try {
      if (item.actif && item.id !== undefined) {
        // If currently active, deactivate
        await deactivateUser(item.id);
        setActif(false);
      } else if (item.id !== undefined) {
        // If currently inactive, activate
        await activateUser(item.id);
        setActif(true);
      }
      setActif(!actif);

      console.log("Clicked!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns: UIColumnDefinitionType<GeneralUser>[] = [
    {
      header: "#",
      key: "id",
    },
    {
      header: t("userManagement.globalUsers.userNameColumn"),
      key: "username",
    },
    {
      header: t("userManagement.globalUsers.accountCreator"),
      key: "creatorAccountId",
      render: (item: GeneralUser) => {
        const [accountName, setAccountName] = useState<string | null>(null);

        useEffect(() => {
          const fetchAccountName = async () => {
            try {
              if (item.creatorAccountId) {
                const accountInfo = await getCustomerAccountInformation(
                  item.creatorAccountId,
                );
                setAccountName(accountInfo?.name || null);
              } else {
                setAccountName(null);
              }
            } catch (error) {
              console.error("Error fetching account information:", error);
            }
          };

          fetchAccountName();
        }, [item.creatorAccountId]);

        return <>{accountName}</>;
      },
    },

    {
      header: t("userManagement.globalUsers.account"),
      key: "customerAccountId",
      render: (item: GeneralUser) => {
        const [creatorName, setCreatorName] = useState<string | null>(null);

        useEffect(() => {
          const fetchAccountName = async () => {
            try {
              if (item.customerAccountId) {
                const creatorInfo = await getCustomerAccountInformation(
                  item.customerAccountId,
                );
                setCreatorName(creatorInfo?.name || "");
              } else {
                setCreatorName(null);
              }
            } catch (error) {
              console.error("Error fetching account information:", error);
            }
          };

          fetchAccountName();
        }, [item.customerAccountId]);

        return <>{creatorName}</>;
      },
    },
    {
      header: t("userManagement.globalUsers.lastVisit"),
      key: "lastVisit",
    },
    {
      header: t("userManagement.globalUsers.statusColumn"),
      key: "actif",
      render: (item: GeneralUser) => (
        <div onClick={() => handleClick(item)} style={{ cursor: "pointer" }}>
          {item.actif ? (
            <Text fontSize="md" color="green.400" fontWeight="bold">
              ✓
            </Text>
          ) : (
            <Text fontSize="md" color="red.400" fontWeight="bold">
              X
            </Text>
          )}
        </div>
      ),
    },
    {
      header: t("common.delete"),
      key: "actif",
      render: (item: GeneralUser) => (
        <Text fontSize="md" color="red.400" fontWeight="bold">
          X
        </Text>
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
            </Flex>
          </CardHeader>

          <CardBody>
            {!isLoading && users && (
              <UITable
                data={filteredAccounts.length === 0 ? users : filteredAccounts}
                columns={columns}
                emptyListMessage={t("customerAccounts.listEmpty")}
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
    </>
  );
};

export default UserManagement;
