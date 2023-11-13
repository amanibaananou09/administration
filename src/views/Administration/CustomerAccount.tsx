import { useEffect, useState, useRef } from "react";
import { useAuth } from "store/AuthContext";
import {
  CustomerAccountTableRowProps,
  CustAccount,
  ModalRefCustAccount,
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
  const bgColor = useColorModeValue("white", "gray.800");
  const skeletonColor = useColorModeValue("gray.200", "gray.600");
  const accountModalRef = useRef<ModalRefCustAccount>(null);
  const [account, setAccount] = useState<CustAccount[]>([]);

  const [customerAccounts, setCustomerAccounts] = useState<
    CustomerAccountTableRowProps[]
  >([]);
  const { user } = useAuth();
  const token = user?.token || "";

  const openAccountModal = (account?: CustAccount) => {
    accountModalRef.current?.open(account);
  };

  const submitModalHandler = async (account: CustAccount) => {
    try {
      if (!user) {
        return;
      }
      const newAccount = await createCustomerAccount(account);
      setAccount((prev) => [newAccount, ...prev]);
      accountModalRef.current?.close();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getListAccounts = async () => {
      const result = await getListOfCustomerAccount();
      setCustomerAccounts(result);
    };
    getListAccounts();
  });

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card
          overflowX={{ sm: "scroll", xl: "hidden" }}
          pb="0px"
          bgColor={bgColor}
          maxW="80vw"
        >
          <CardHeader p="6px 0px 22px 0px" bgColor={bgColor}>
            <br />
            <Text
              fontSize="3xl"
              color={textColor}
              textAlign="center"
              fontWeight="bold"
            >
              Customer Accounts
            </Text>
          </CardHeader>
          <CardBody bgColor={bgColor}>
            <Table
              variant="simple"
              color={textColor}
              size="lg"
              textAlign="center"
            >
              <Thead>
                <Tr bg="teal.200" color="white">
                  <Th
                    borderColor={borderColor}
                    textAlign="center"
                    fontSize="lg"
                    fontWeight="bold"
                    p={4}
                  >
                    Name
                  </Th>
                  <Th
                    borderColor={borderColor}
                    textAlign="center"
                    fontSize="lg"
                    fontWeight="bold"
                    p={4}
                  >
                    Description
                  </Th>
                  <Th
                    borderColor={borderColor}
                    textAlign="center"
                    fontSize="lg"
                    fontWeight="bold"
                    p={4}
                  >
                    Status
                  </Th>
                  <Th
                    borderColor={borderColor}
                    textAlign="center"
                    fontSize="lg"
                    fontWeight="bold"
                    p={4}
                  >
                    Master User
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {customerAccounts.map((account, key) => (
                  <CustomerAccountTableRow
                    name={account.name}
                    description={account.description}
                    status={account.status}
                    masterUser={account.masterUser.username}
                    key={key}
                  />
                ))}
              </Tbody>
            </Table>
            {customerAccounts.length === 0 && (
              <Stack width="100%" margin="20px 0px">
                <Skeleton
                  height="50px"
                  borderRadius="10px"
                  bgColor={skeletonColor}
                />
                <Skeleton
                  height="50px"
                  borderRadius="10px"
                  bgColor={skeletonColor}
                />
                <Skeleton
                  height="50px"
                  borderRadius="10px"
                  bgColor={skeletonColor}
                />
                <Skeleton
                  height="50px"
                  borderRadius="10px"
                  bgColor={skeletonColor}
                />
              </Stack>
            )}
          </CardBody>
          <br />
          <Flex justify="right" align="flex-end">
            <Box marginRight="4">
              <Button
                colorScheme="teal"
                size="lg"
                onClick={() => openAccountModal()}
              >
                Add Customer Account
              </Button>
            </Box>
          </Flex>
          <br />
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
