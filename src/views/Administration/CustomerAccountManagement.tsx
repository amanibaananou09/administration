import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { getListOfCustomerAccount } from "common/api/customerAccount-api";
import { useEffect, useRef } from "react";

import { CustomAccountModalRefType } from "common/react-props";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomerAccountModal from "components/Modal/AdministrationModal/CustomerAccountModal";
import CustomerAccountTableRow from "components/Tables/CustomerAccountTableRow";
import useHttp from "hooks/use-http";

const CustomerAccountManagement = () => {
  const {
    makeRequest: fetchCustomerAccounts,
    isLoading,
    data: customerAccounts,
  } = useHttp(getListOfCustomerAccount);

  const textColor = useColorModeValue("gray.700", "white");
  const columnTitleTextColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const accountModalRef = useRef<CustomAccountModalRefType>(null);
  const toast = useToast();

  const openAccountModal = (account?: CustomerAccount) => {
    accountModalRef.current?.open(account);
  };

  const submitModalHandler = async () => {
    try {
      await fetchCustomerAccounts();

      toast({
        title: "Customer Account Added",
        description: "The customer account has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while adding the customer account.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchCustomerAccounts();
  }, []);

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" p="5px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Customer Accounts
              </Text>
              <Button
                colorScheme="teal"
                size="md"
                onClick={() => openAccountModal()}
              >
                Add Customer Account
              </Button>
            </Flex>
          </CardHeader>

          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th
                    pl="0px"
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
                    Description
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    Master User
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
                {!isLoading && customerAccounts.length > 0 ? (
                  customerAccounts.map(
                    (account: CustomerAccount, index: number) => (
                      <CustomerAccountTableRow
                        customerAccount={account}
                        isLastRow={index === customerAccounts.length - 1}
                        key={index}
                      />
                    ),
                  )
                ) : (
                  <Tr>
                    <Td colSpan={4} textAlign="center">
                      <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.600"
                        mt={4}
                      >
                        {!isLoading
                          ? "You don't have a customer account."
                          : "Loading..."}
                      </Text>
                    </Td>
                  </Tr>
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
      <CustomerAccountModal
        onSubmit={submitModalHandler}
        ref={accountModalRef}
        account={null}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};
export default CustomerAccountManagement;
