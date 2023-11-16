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
import { CustAccount, ModalRefCustAccount } from "common/AdminModel";
import {
  createCustomerAccount,
  getListOfCustomerAccount,
} from "common/api/customerAccount-api";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomerAccountModal from "components/Modal/AdministrationModal/CustomerAccountModal";
import CustomerAccountTableRow from "components/Tables/CustomerAccountTableRow";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CustomerAccount = () => {
  const textColor = useColorModeValue("teal.800", "teal.200");
  const borderColor = useColorModeValue("teal.200", "teal.600");
  const accountModalRef = useRef<ModalRefCustAccount>(null);
  const [account, setAccount] = useState<CustAccount[]>([]);
  const toast = useToast();
  const [customerAccounts, setCustomerAccounts] = useState<CustAccount[]>([]);
  const history = useHistory();

  const openAccountModal = (account?: CustAccount) => {
    accountModalRef.current?.open(account);
  };

  const submitModalHandler = async (account: CustAccount) => {
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
          key: uuidv4(),
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
                variant="solid"
                onClick={() => openAccountModal()}
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
                {customerAccounts.map((account: CustAccount, key: number) => (
                  <CustomerAccountTableRow
                    id={account.id}
                    name={account.name}
                    description={account.description}
                    status={account.status}
                    masterUser={account.masterUser}
                    key={key}
                  />
                ))}
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

export default CustomerAccount;
