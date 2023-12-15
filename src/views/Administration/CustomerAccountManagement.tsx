import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import {
  activateCustomerAccount,
  deactivateCustomerAccount,
  getListOfCustomerAccount,
} from "common/api/customerAccount-api";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomerAccountModal from "components/Modal/AdministrationModal/CustomerAccountModal";
import { UIColumnDefinitionType } from "components/Table/Types";
import UITable from "components/Table/UITable";
import useHttp from "hooks/use-http";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const CustomerAccountManagement = () => {
  const {
    data: customerAccounts,
    isLoading,
    makeRequest: fetchCustomerAccounts,
  } = useHttp<CustomerAccount[]>(getListOfCustomerAccount, false);

  const { t } = useTranslation("administration");
  let { path } = useRouteMatch();

  const submitModalHandler = async () => {
    await fetchCustomerAccounts();
  };

  const handleClick = async (item: CustomerAccount) => {
    try {
      if (item.actif) {
        // If currently active, deactivate
        await deactivateCustomerAccount(item.id);
      } else {
        // If currently inactive, activate
        await activateCustomerAccount(item.id);
      }

      console.log("Clicked!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCustomerAccounts();
  }, []);

  //styles
  const textColor = "gray.700";

  const columns: UIColumnDefinitionType<CustomerAccount>[] = [
    {
      header: "#",
      key: "id",
    },
    {
      header: t("common.name"),
      key: "name",
    },
    {
      header: t("common.creator"),
      key: "creatorUser",
      render: (item: CustomerAccount) => item.name,
    },
    {
      header: t("common.compteParent"),
      key: "parentName",
      render: (item: CustomerAccount) => item.parentName,
    },
    {
      header: t("common.droits"),
      key: "resaleRight",
    },
    {
      header: t("common.status"),
      key: "status",
      render: (item: CustomerAccount) => (
        <div onClick={() => handleClick(item)} style={{ cursor: "pointer" }}>
          {item.actif ? (
            <Text fontSize="md" color="green.400" fontWeight="bold">
              ✓
            </Text>
          ) : (
            <Text fontSize="md" color="red.400" fontWeight="bold">
              X
            </Text>
          )}
        </div>
      ),
    },
    {
      header: t("common.stations"),
      key: "stationsCount",
    },
    {
      header: t("common.delete"),
      key: "actif",
      render: (item: CustomerAccount) => (
        <Text fontSize="md" color="red.400" fontWeight="bold">
          X
        </Text>
      ),
    },
  ];

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
            {!isLoading && customerAccounts && (
              <UITable
                data={customerAccounts}
                columns={columns}
                emptyListMessage={t("customerAccounts.listEmpty")}
              />
            )}

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
