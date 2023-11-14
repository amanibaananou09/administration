import { useEffect, useState, useRef } from "react";
import { useAuth } from "store/AuthContext";
import {
  CustAccount, CustomerAccountTableRowProps,
  ModalRefCustAccount
} from "common/AdminModel";
import {
  Box,
  Button,
  Card,
  CardBody,
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
  useToast ,
} from "@chakra-ui/react";
import CardHeader from "../../components/Card/CardHeader";
import CustomerAccountModal from "components/Modal/AdministrationModal/CustomerAccountModal";
import {
  createCustomerAccount,
  getListOfCustomerAccount,
} from "common/api/customerAccount-api";
import CustomerAccountTableRow from "components/Tables/CustomerAccountTableRow";

const CustomerAccount = () => {
  const textColor = useColorModeValue("teal.800", "teal.200");
  const borderColor = useColorModeValue("teal.200", "teal.600");
  const accountModalRef = useRef<ModalRefCustAccount>(null);
  const [account, setAccount] = useState<CustAccount[]>([]);
  const toast = useToast();
  const [customerAccounts, setCustomerAccounts] = useState<
    CustomerAccountTableRowProps[]
  >([]);

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
      try{
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
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px" borderRadius="16px" >
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
                  <Th pl="0px" borderColor={borderColor} color="gray.400" textAlign="center">
                    Name
                  </Th>
                  <Th borderColor={borderColor} color="gray.400" textAlign="center">
                    Description
                  </Th>
                  <Th borderColor={borderColor} color="gray.400" textAlign="center">
                    Status
                  </Th>
                  <Th borderColor={borderColor} color="gray.400" textAlign="center">
                    Master User
                  </Th>

                </Tr>
              </Thead>
              <Tbody>
                {customerAccounts.map((account, key) => (
                  <CustomerAccountTableRow
                    name={account.name}
                    description={account.description}
                    status={account.status }
                    masterUser={account.masterUser.username}
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
        station={null}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};
export default CustomerAccount;
