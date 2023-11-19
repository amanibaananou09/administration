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
  useToast,
} from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import {
  createCustomerAccount,
  getListOfCustomerAccount,
} from "common/api/customerAccount-api";
import { useEffect, useRef, useState } from "react";

import { CustomAccountModalRefType } from "common/react-props";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomerAccountModal from "components/Modal/AdministrationModal/CustomerAccountModal";
import CustomerAccountTableRow from "components/Tables/CustomerAccountTableRow";

const CustomerAccountManagement = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const columnTitleTextColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const accountModalRef = useRef<CustomAccountModalRefType>(null);
  const [account, setAccount] = useState<CustomerAccount[]>([]);
  const toast = useToast();
  const [customerAccounts, setCustomerAccounts] = useState<CustomerAccount[]>(
    [],
  );

  const openAccountModal = (account?: CustomerAccount) => {
    accountModalRef.current?.open(account);
  };

  const submitModalHandler = async (account: CustomerAccount) => {
    try {
      const newAccount = await createCustomerAccount(account);

      setAccount((prev) => [newAccount, ...prev]);
      accountModalRef.current?.close();
      toast({
        title: "Customer Account Added",
        description: "The customer account has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      const updatedAccounts = [
        ...customerAccounts,
        {
          name: newAccount.name,
          description: newAccount.description,
          status: newAccount.status,
          masterUser: newAccount.masterUser,
        },
      ];

      setCustomerAccounts(updatedAccounts);
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
    const getListAccounts = async () => {
      try {
        const result = await getListOfCustomerAccount();
        setCustomerAccounts(result);
      } catch (error) {
        console.error(error);
      }
    };
    getListAccounts();
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
                {customerAccounts.map(
                  (account: CustomerAccount, index: number) => (
                    <CustomerAccountTableRow
                      customerAccount={account}
                      isLastRow={index == customerAccounts.length - 1}
                      key={index}
                    />
                  ),
                )}
              </Tbody>
            </Table>
            {customerAccounts.length === 0 && (
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
