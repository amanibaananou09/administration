import {
  Flex,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { GeneralUser } from "common/AdminModel";
import { listUser } from "common/api/general-user-api";
import { useTranslation } from "react-i18next";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import UserModal from "components/Modal/UserModal";
import UserTableRow from "components/Tables/UserTableRow";
import useHttp from "hooks/use-http";
import { Route, useRouteMatch } from "react-router-dom";

const UserManagement = () => {
  const { data: users, isLoading, makeRequest: fetchUsers } = useHttp<
    GeneralUser[]
  >(listUser);
  const { t } = useTranslation("administration");
  let { path } = useRouteMatch();

  //styles
  const textColor = "gray.700";
  const columnTitleTextColor = "black";
  const borderColor = "gray.200";

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
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="ms"
                    textAlign="center"
                  >
                    <Text fontSize="ms" fontWeight="blod" color={textColor}>
                      #
                    </Text>
                  </Th>
                  <Th
                    pl="0px"
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("userManagement.globalUsers.userNameColumn")}
                  </Th>
                  <Th
                    pl="0px"
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("userManagement.globalUsers.accountCreator")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("userManagement.globalUsers.account")}
                  </Th>

                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("userManagement.globalUsers.lastVisit")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("userManagement.globalUsers.statusColumn")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="ms"
                    textAlign="center"
                  >
                    <Text fontSize="ms" fontWeight="blod" color={textColor}>
                      {t("common.delete")}
                    </Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isLoading &&
                  users?.map(
                    (user: GeneralUser, index: number, arr: GeneralUser[]) => (
                      <UserTableRow
                        user={user}
                        isLast={index === arr.length - 1 ? true : false}
                        index={index}
                        key={index}
                      />
                    ),
                  )}
              </Tbody>
            </Table>
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
