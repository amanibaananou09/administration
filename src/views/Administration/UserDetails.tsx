import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useEffect, useState } from "react";
import { functionScope, userInformation } from "common/api/general-user-api";
import { GeneralUser, RouteParams, userScope } from "common/AdminModel";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams<RouteParams>();
  const [userInfo, setUserInfo] = useState<GeneralUser | null>(null);
  const [userScope, setUserScope] = useState<userScope | null>(null);

  const textColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const result = await userInformation(id);
        setUserInfo(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetail();
  }, [id]);

  useEffect(() => {
    const ListOfFunctionScope = async () => {
      try {
        const result = await functionScope(id, "GLOBAL");
        if (result) {
          setUserScope(result);
        }
      } catch (error) {
        console.error(error);
      }
    };

    ListOfFunctionScope();
  }, [id]);

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              User Information
            </Text>
          </CardHeader>
          <CardBody>
            <Box backgroundColor="gray.200" p={6} borderRadius="16px" mb="50px">
              {userInfo ? (
                <Flex width="100%" gap="10%">
                  <Box>
                    <Text fontSize="md" color="gray.900" fontWeight="bold">
                      User Name :{" "}
                    </Text>
                    <Text fontSize="md" color="gray.900" fontWeight="bold">
                      First Name :{" "}
                    </Text>
                    <Text fontSize="md" color="gray.900" fontWeight="bold">
                      Last Name :{" "}
                    </Text>
                    <Text fontSize="md" color="gray.900" fontWeight="bold">
                      Phone :{" "}
                    </Text>
                    <Text fontSize="md" color="gray.900" fontWeight="bold">
                      Email :{" "}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                      {userInfo.username}
                    </Text>

                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                      {userInfo.firstName}
                    </Text>

                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                      {userInfo.lastName}
                    </Text>
                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                      {userInfo.phone}
                    </Text>

                    <Text fontSize="md" fontWeight="medium" color="gray.500">
                      {userInfo.email}
                    </Text>
                  </Box>
                </Flex>
              ) : (
                <Text color="gray.500">No accounts available.</Text>
              )}
            </Box>
            <Flex gap={4}>
              <Flex direction="column" flex={1}>
                <Text
                  fontSize="xl"
                  color="gray.700"
                  textAlign="left"
                  fontWeight="bold"
                >
                  Functions Scope
                </Text>
                <Box
                  backgroundColor="gray.200"
                  borderRadius="16px"
                  p={6}
                  marginBottom="20px"
                  width="100%"
                >
                  {userScope && Array.isArray(userScope) ? (
                    userScope.map((scop, key) => (
                      <div
                        key={key}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <input
                          type="checkbox"
                          id={`checkbox-${key}`}
                          defaultChecked={scop.id}
                          style={{ marginRight: "8px" }}
                        />
                        <label htmlFor={`checkbox-${key}`}>
                          <Text
                            fontSize="md"
                            color="gray.500"
                            fontWeight="normal"
                          >
                            {scop.code}
                          </Text>
                        </label>
                      </div>
                    ))
                  ) : (
                    <Text color="gray.500">No data available.</Text>
                  )}
                </Box>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default UserDetails;
