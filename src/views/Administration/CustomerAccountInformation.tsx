import React from "react";
import { Box, ChakraProvider, CSSReset, extendTheme, Container, Flex, Text, Button } from "@chakra-ui/react";

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

const CustomerAccountInformation: React.FC = () => {
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
            border="1px" borderColor="gray.200"
            color="white"
            p={6}
            textAlign="left"
            width="100%"
          >
            <Text fontSize="md" color="gray.500" fontWeight="bold">Name : </Text>
            <Text fontSize="md" color="gray.500" fontWeight="bold">Status : </Text>
            <Text fontSize="md" color="gray.500" fontWeight="bold">Date Status Change : </Text>
            <Text fontSize="md" color="gray.500" fontWeight="bold">Description : </Text>

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
                List of Users
              </Text>
              <Box
                border="1px" borderColor="gray.200"
                p={6}
                width="50%"
              >
                <Text fontSize="md" color="gray.500" fontWeight="bold">User Name : </Text>
                <Text fontSize="md" color="gray.500" fontWeight="bold">First Name : </Text>
                <Text fontSize="md" color="gray.500" fontWeight="bold">Last Name : </Text>
                <Text fontSize="md" color="gray.500" fontWeight="bold">Email : </Text>
                <Text fontSize="md" color="gray.500" fontWeight="bold">Role : </Text>
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
                List of Stations
              </Text>
              <Box
                border="1px" borderColor="gray.200"
                p={6}
                width="50%"
              >
                <Text fontSize="md" color="gray.500" fontWeight="bold">Station Name : </Text>
                <Text fontSize="md" color="gray.500" fontWeight="bold">Address : </Text>
                <Text fontSize="md" color="gray.500" fontWeight="bold">ControllerPts : </Text>
                <Text fontSize="md" color="gray.500" fontWeight="bold">country : </Text>
                <Text fontSize="md" color="gray.500" fontWeight="bold">Role : </Text>
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