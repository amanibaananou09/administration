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

import { GeneralUser, UserModalRefType } from "common/AdminModel";
import { listUser } from "common/api/general-user-api";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import UserModal from "components/Modal/UserModal";
import UserTableRow from "components/Tables/UserTableRow";
import useHttp from "hooks/use-http";
import { useEffect, useRef } from "react";

const ManageUsers = () => {
  const { makeRequest, isLoading, data: users } = useHttp(listUser);
  const userModalRef = useRef<UserModalRefType>(null);

  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    makeRequest();
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
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th pl="0px" borderColor={borderColor} color="gray.400">
                    Name
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Email
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Address
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Status
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Last update
                  </Th>
                  <Th borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isLoading &&
                  users.map((user: GeneralUser, index: number, arr: []) => {
                    return (
                      <UserTableRow
                        user={user}
                        isLast={index === arr.length - 1 ? true : false}
                        key={index}
                      />
                    );
                  })}
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
      <UserModal ref={userModalRef} />
    </>
  );
};

export default ManageUsers;
