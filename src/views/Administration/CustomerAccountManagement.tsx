import {
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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomerAccountModal from "components/Modal/AdministrationModal/CustomerAccountModal";
import CustomerAccountTableRow from "components/Tables/CustomerAccountTableRow";
import useHttp from "hooks/use-http";
import useQuery from "hooks/use-query";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const CustomerAccountManagement = () => {
  const {
    data: customerAccounts,
    isLoading,
    makeRequest: fetchCustomerAccounts,
  } = useHttp<CustomerAccount[]>(getListOfCustomerAccount, false);

  let { path } = useRouteMatch();

  const query = useQuery();

  console.log(query);

  const { t } = useTranslation("administration");

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
            </Flex>
          </CardHeader>

          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="ms"
                    textAlign="center"
                  >
                    <Text fontSize="ms" fontWeight="blod" color={textColor}>
                      #
                    </Text>
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="ms"
                    textAlign="center"
                  >
                    <Text fontSize="ms" fontWeight="blod" color={textColor}>
                      {t("common.name")}
                    </Text>
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="ms"
                    textAlign="center"
                  >
                    <Text fontSize="ms" fontWeight="blod" color={textColor}>
                      {t("common.creator")}
                    </Text>
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="ms"
                    textAlign="center"
                  >
                    <Text fontSize="ms" fontWeight="blod" color={textColor}>
                      {t("common.compteParent")}
                    </Text>
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="ms"
                    textAlign="center"
                  >
                    <Text fontSize="ms" fontWeight="blod" color={textColor}>
                      {t("common.droits")}
                    </Text>
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="ms"
                    textAlign="center"
                  >
                    <Text fontSize="ms" fontWeight="blod" color={textColor}>
                      {t("common.status")}
                    </Text>
                  </Th>
                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="ms"
                    textAlign="center"
                  >
                    <Text fontSize="ms" fontWeight="blod" color={textColor}>
                      {t("common.stations")}
                    </Text>
                  </Th>

                  <Th
                    borderColor={borderColor}
                    color={columnTitleTextColor}
                    fontSize="ms"
                    textAlign="center"
                  >
                    <Text fontSize="ms" fontWeight="blod" color={textColor}>
                      {t("common.delete")}
                    </Text>
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
                        index={index}
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
                        textAlign="center"
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
      <Switch>
        <Route path={`${path}/new`}>
          <CustomerAccountModal
            onSubmit={submitModalHandler}
            account={null}
            onClose={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Route>
      </Switch>
    </>
  );
};
export default CustomerAccountManagement;
