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
} from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { getListOfCustomerAccount } from "common/api/customerAccount-api";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { CustomAccountModalRefType } from "common/react-props";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomerAccountModal from "components/Modal/AdministrationModal/CustomerAccountModal";
import CustomerAccountTableRow from "components/Tables/CustomerAccountTableRow";
import useHttp from "hooks/use-http";

const CustomerAccountManagement = () => {
  const {
    data: customerAccounts,
    isLoading,
    makeRequest: fetchCustomerAccounts,
  } = useHttp<CustomerAccount[]>(getListOfCustomerAccount);

  const { t } = useTranslation("administration");

  const accountModalRef = useRef<CustomAccountModalRefType>(null);

  const openAccountModal = (account?: CustomerAccount) => {
    accountModalRef.current?.open(account);
  };

  const submitModalHandler = async () => {
    await fetchCustomerAccounts();
  };

  useEffect(() => {
    fetchCustomerAccounts();
  }, []);

  //styles
  const textColor = "gray.700";
  const columnTitleTextColor = "black";
  const borderColor = "gray.200";

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" p="5px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                {t("customerAccounts.header")}
              </Text>
              <Button
                colorScheme="teal"
                size="md"
                onClick={() => openAccountModal()}
              >
                {t("customerAccounts.addAccountButton")}
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
                    {t("common.name")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("common.description")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("customerAccounts.masterUser")}
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="md"
                    textAlign="center"
                  >
                    {t("common.status")}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isLoading &&
                customerAccounts &&
                customerAccounts.length > 0 ? (
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
                          ? t("customerAccounts.isLoading")
                          : t("common.loading")}
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
