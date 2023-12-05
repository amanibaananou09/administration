import {
  Button,
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
import { UserModalRefType } from "common/react-props";
import { useTranslation } from "react-i18next";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import UserModal from "components/Modal/UserModal";
import UserTableRow from "components/Tables/UserTableRow";
import useHttp from "hooks/use-http";
import { useRef } from "react";

const UserManagement = () => {
  const { data: users, isLoading, makeRequest: fetchUsers } = useHttp<
    GeneralUser[]
  >(listUser);
  const userModalRef = useRef<UserModalRefType>(null);
  const { t } = useTranslation("administration");

  const openUserModal = () => {
    userModalRef.current?.open();
  };

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
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => openUserModal()}
              >
                {t("userManagement.globalUsers.addNewUserButton")}
              </Button>
            </Flex>
          </CardHeader>

          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px">
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
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("userManagement.globalUsers.nameColumn")}
                  </Th>

                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    Phone
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("userManagement.globalUsers.emailColumn")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("userManagement.globalUsers.statusColumn")}
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
      <UserModal ref={userModalRef} onSubmit={fetchUsers} />
    </>
  );
};

export default UserManagement;
