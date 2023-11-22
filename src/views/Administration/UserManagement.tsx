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
  useColorModeValue,
} from "@chakra-ui/react";

import { GeneralUser } from "common/AdminModel";
import { listUser } from "common/api/general-user-api";
import { UserModalRefType } from "common/react-props";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import UserModal from "components/Modal/UserModal";
import UserTableRow from "components/Tables/UserTableRow";
import useHttp from "hooks/use-http";
import { useEffect, useRef } from "react";

const UserManagement = () => {
  const { makeRequest: fetchUsers, isLoading, data: users } = useHttp(listUser);
  const userModalRef = useRef<UserModalRefType>(null);

  const textColor = useColorModeValue("gray.700", "white");
  const columnTitleTextColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    fetchUsers();
  }, []);

  const openUserModal = () => {
    userModalRef.current?.open();
  };

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" p="5px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Global Users
              </Text>
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => openUserModal()}
              >
                Add New User
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
                    User Name
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    Name
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
                    Email
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isLoading &&
                  users.map((user: GeneralUser, index: number, arr: []) => (
                    <UserTableRow
                      user={user}
                      isLast={index === arr.length - 1 ? true : false}
                      key={index}
                    />
                  ))}
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
