import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import {
  activateCustomerAccount,
  deactivateCustomerAccount,
  getCustomerAccounts,
} from "common/api/customerAccount-api";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomerAccountModal from "components/Modal/AdministrationModal/CustomerAccountModal";
import { UIColumnDefinitionType } from "components/Table/Types";
import UITable from "components/Table/UITable";
import useHttp from "hooks/use-http";
import useQuery from "hooks/use-query";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const CustomerAccountManagement = () => {
  const {
    data: customerAccounts,
    isLoading,
    makeRequest: fetchCustomerAccounts,
  } = useHttp<CustomerAccount[]>(getCustomerAccounts, false);
  const [actif, setActif] = useState(false);

  const { t } = useTranslation("administration");
  let { path } = useRouteMatch();
  const query = useQuery();

  const submitModalHandler = async () => {
    await fetchCustomerAccounts();
  };

  const handleClick = async (item: CustomerAccount) => {
    try {
      if (item.actif && item.id !== undefined) {
        // If currently active, deactivate
        await deactivateCustomerAccount(item.id);
        item.actif = false;
      } else if (item.id !== undefined) {
        // If currently inactive, activate
        await activateCustomerAccount(item.id);
        item.actif = true;
      }
      setActif(!actif);

      console.log("Clicked!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const name = query.get("name");
    const creator = query.get("creator");
    const parent = query.get("parent");

    fetchCustomerAccounts({
      name,
      creator,
      parent,
    });
  }, [query]);

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
      render: (item: CustomerAccount) =>
        item.resaleRight ? t("common.reseller") : "-",
    },
    {
      header: t("common.status"),
      key: "status",
      render: (item: CustomerAccount) => (
        <div onClick={() => handleClick(item)} style={{ cursor: "pointer" }}>
          <Text
            fontSize="md"
            color={item.actif ? "green.400" : "red.400"}
            fontWeight="bold"
            textAlign="center"
          >
            {item.actif ? "✓" : "X"}
          </Text>
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
        <Text
          fontSize="md"
          color="red.400"
          fontWeight="bold"
          textAlign="center"
        >
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
                headerStyles={{
                  fontSize: "md",
                  textColor: "gray.700",
                }}
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
