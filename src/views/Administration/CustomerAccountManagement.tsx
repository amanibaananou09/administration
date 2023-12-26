import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import {
  activateCustomerAccount,
  deactivateCustomerAccount,
  getCustomerAccounts,
} from "common/api/customerAccount-api";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ConfirmationDialog, {
  ConfirmationDialogRefType,
} from "components/Dialog/ConfirmationDialog";
import CustomerAccountModal from "components/Modal/CustomerAccountModal";
import Status from "components/Sidebar/Status";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import useHttp from "hooks/use-http";
import useQuery from "hooks/use-query";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const CustomerAccountManagement = () => {
  const {
    data: customerAccounts,
    isLoading,
    makeRequest: fetchCustomerAccounts,
  } = useHttp<CustomerAccount[]>(getCustomerAccounts, false);

  const [selectedAccount, setSelectedAccount] = useState<CustomerAccount>();

  const { t } = useTranslation();
  let { path } = useRouteMatch();
  const query = useQuery();
  const name = query.get("name");
  const creator = query.get("creator");
  const parent = query.get("parent");

  const confirmationDialogRef = useRef<ConfirmationDialogRefType>(null);

  const submitModalHandler = async () => {
    await fetchCustomerAccounts();
  };

  const updateStatusHandler = async () => {
    if (selectedAccount) {
      let item = selectedAccount;
      if (item.actif && item.id !== undefined) {
        // If currently active, deactivate
        await deactivateCustomerAccount(item.id);
      } else if (item.id !== undefined) {
        // If currently inactive, activate
        await activateCustomerAccount(item.id);
      }

      await fetchCustomerAccounts({
        name,
        creator,
        parent,
      });
    }
  };

  const openConfirmationDialog = (customerAccount: CustomerAccount) => {
    setSelectedAccount(customerAccount);
    const title = t("customerAccounts.updateStatusDialog.title");
    const message = customerAccount.actif
      ? t("customerAccounts.updateStatusDialog.desativationMessage")
      : t("customerAccounts.updateStatusDialog.activationMessage");
    confirmationDialogRef.current?.open(title, message);
  };

  useEffect(() => {
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
      key: "#",
    },
    {
      header: t("common.name"),
      key: "name",
    },
    {
      header: t("common.creator"),
      key: "creatorCustomerAccountName",
    },
    {
      header: t("common.compteParent"),
      key: "parentName",
    },
    {
      header: t("common.droits"),
      render: (item: CustomerAccount) =>
        item.resaleRight ? t("common.reseller") : "-",
    },
    {
      header: t("common.status"),
      render: (item: CustomerAccount) => (
        <div
          onClick={() => openConfirmationDialog(item)}
          style={{ cursor: "pointer" }}
        >
          <Status value={item.actif!!} />
        </div>
      ),
    },
    {
      header: t("common.stations"),
      key: "stationsCount",
    },
    {
      header: t("common.delete"),
      render: (item: CustomerAccount) => <Status value={false} />,
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
                data={customerAccounts.sort((c1, c2) => c1.id!! - c2.id!!)}
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
      <ConfirmationDialog
        onConfirm={updateStatusHandler}
        ref={confirmationDialogRef}
      />
    </>
  );
};

export default CustomerAccountManagement;
