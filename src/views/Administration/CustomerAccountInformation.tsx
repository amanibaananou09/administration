import React, { useEffect, useState } from "react";
import { Box, ChakraProvider, CSSReset, extendTheme, Container, Flex, Text, Button, chakra } from "@chakra-ui/react";
import {
  allStationByCustomerAccount,
  allUserByCustomerAccount,
  ListOfCustomerAccount
} from "../../common/api/station-api";
import { Station, User } from "../../common/model";
import { Accounts, CustomerAccountTableRowProps } from "../../common/AdminModel";
import { formatDate } from "utils/utils";
import { useAuth } from "../../store/AuthContext";


const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0
      }
    }
  }
});

const CustomerAccountInformation = ( { id }: CustomerAccountTableRowProps ) => {
  const [stationAccounts, setStationAccounts] = useState<Station[]>([]);
  const [userAccounts, setUserAccounts] = useState<User[]>([]);
  const [accounts, setAccounts] = useState<Accounts[]>([]);

  useEffect(() => {
    const allStationByAccount = async () => {
      try {
        const result = await allStationByCustomerAccount(id);
        setStationAccounts(result);
      } catch (error) {
        console.error(error);
      }
    };
    allStationByAccount();
  }, []);
  useEffect(() => {
    const allUserByAccount = async () => {
      try {
        const result = await allUserByCustomerAccount(id);
        setUserAccounts(result);
      } catch (error) {
        console.error(error);
      }
    };
    allUserByAccount();
  }, []);

  const allAccounts = async () => {
    try {
      const result = await ListOfCustomerAccount(id);

      const accountsArray = Array.isArray(result) ? result : [result];

      setAccounts(accountsArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allAccounts();
  }, []);


  return (
    <Flex direction="column" pt={{ base: "125px", md: "75px" }}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Container bg="white" maxW="container.xl" p={6} borderRadius="16px">
          <Text
            fontSize="3xl"
            color="gray.700"
            textAlign="center"
            fontWeight="bold"
          >
            Customer Account Information
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
            {Array.isArray(accounts) && accounts.length > 0 ? (
              accounts.map((account, key) => (
                <div key={key}>
                  <Text fontSize="xl" color="gray.900" fontWeight="bold">
                    Name : {""}
                    <chakra.span fontSize="md" fontWeight="medium" color="gray.500">
                      {account.name}
                    </chakra.span>
                  </Text>

                  <Text fontSize="xl" color="gray.900" fontWeight="bold">
                    Status : {""}
                    <chakra.span fontSize="md" fontWeight="medium" color="gray.500">
                    {account.status}
                    </chakra.span>
                  </Text>
                  <Text fontSize="xl" color="gray.900" fontWeight="bold">
                    Date Status Change : {""}
                    <chakra.span fontSize="md" fontWeight="medium" color="gray.500">
                      {formatDate(account.dateStatusChange)}
                    </chakra.span>
                  </Text>
                  <Text fontSize="xl" color="gray.900" fontWeight="bold">
                    Description : {""}
                    <chakra.span fontSize="md" fontWeight="medium" color="gray.500">
                      {account.description}
                    </chakra.span>
                  </Text>
                </div>
              ))
            ) : (
              <Text color="gray.500">No accounts available.</Text>
            )}
          </Box>

          <br />
          <Flex direction="row" justifyContent="space-between">
            <Flex direction="column" flex={1} ml={4} alignItems="center">
              <Text
                fontSize="xl"
                color="gray.700"
                textAlign="center"
                fontWeight="bold"
              >
                Attached users
              </Text>
              <Box border="1px" borderColor="gray.200" p={6} width="50%">
                {userAccounts.map((user, key) => (
                  <div key={key}>
                    <Text fontSize="md" color="gray.700" fontWeight="bold">
                      {user.username}
                    </Text>
                  </div>
                ))}
              </Box>
              <Flex align="center" p="5px">
                <Button
                  colorScheme="teal"
                  size="md"
                >
                  Add User
                </Button>
              </Flex>
            </Flex>
            <Flex direction="column" flex={1} ml={4} alignItems="center">
              <Text
                fontSize="xl"
                color="gray.700"
                textAlign="center"
                fontWeight="bold"
              >
                Stations
              </Text>
              <Box border="1px" borderColor="gray.200" p={6} width="50%">
                {stationAccounts.map((station, key) => (
                  <div key={key}>
                    <Text fontSize="md" color="gray.700" fontWeight="bold">
                      {station.name}
                    </Text>
                  </div>
                ))}
              </Box>
              <Flex align="center" p="5px">
                <Button
                  colorScheme="teal"
                  size="md"
                >
                  Add Station
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </ChakraProvider>
    </Flex>
  );
};

export default CustomerAccountInformation;