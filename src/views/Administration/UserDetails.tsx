import {
  Box,
  chakra,
  ChakraProvider,
  Container,
  CSSReset,
  extendTheme,
  Flex,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { functionScope, userInformation } from "common/api/general-user-api";
import { GeneralUser, RouteParams, userScope } from "common/AdminModel";
import { useParams } from "react-router-dom";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
      },
    },
  },
});

const UserDetails = () => {
  const { id } = useParams<RouteParams>();
  const [userInfo, setUserInfo] = useState<GeneralUser | null>(null);
  const [userScope, setUserScope] = useState<userScope | null>(null);

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
    <Flex direction="column" pt={{ base: "125px", md: "75px" }}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Container bg="white" maxW="container.xl" p={6} borderRadius="16px">
          <Text
            fontSize="3xl"
            color="gray.700"
            textAlign="left"
            fontWeight="bold"
          >
            User Information
          </Text>
          <br />
          <Box
            border="1px"
            borderColor="gray.200"
            color="white"
            p={6}
            textAlign="left"
            width="100%"
          >
            {userInfo ? (
              <div>
                <Text fontSize="xl" color="gray.900" fontWeight="bold">
                  User Name :{" "}
                  <chakra.span
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.500"
                  >
                    {userInfo.username}
                  </chakra.span>
                </Text>

                <Text fontSize="xl" color="gray.900" fontWeight="bold">
                  First Name :{" "}
                  <chakra.span
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.500"
                  >
                    {userInfo.firstName}
                  </chakra.span>
                </Text>
                <Text fontSize="xl" color="gray.900" fontWeight="bold">
                  Last Name :{" "}
                  <chakra.span
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.500"
                  >
                    {userInfo.lastName}
                  </chakra.span>
                </Text>
                <Text fontSize="xl" color="gray.900" fontWeight="bold">
                  Phone :{" "}
                  <chakra.span
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.500"
                  >
                    {userInfo.phone}
                  </chakra.span>
                </Text>
                <Text fontSize="xl" color="gray.900" fontWeight="bold">
                  Email :{" "}
                  <chakra.span
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.500"
                  >
                    {userInfo.email}
                  </chakra.span>
                </Text>
              </div>
            ) : (
              <Text color="gray.500">No user available.</Text>
            )}
          </Box>

          <br />
          <Flex direction="row" justifyContent="space-between">
            <Flex direction="column" flex={1} ml={4} alignItems="left">
              <Text
                fontSize="xl"
                color="gray.700"
                textAlign="left"
                fontWeight="normal"
              >
                Functions Scope
              </Text>

              <Box border="1px" borderColor="gray.200" p={6} width="70%">
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
            <Flex direction="column" flex={1} ml={4} alignItems="left">
              <Text
                fontSize="xl"
                color="gray.700"
                textAlign="left"
                fontWeight="normal"
              >
                Customer Accounts
              </Text>
              <Box border="1px" borderColor="gray.200" p={6} width="50%">
                <Text color="gray.500">No customer Account available.</Text>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </ChakraProvider>
    </Flex>
  );
};

export default UserDetails;
