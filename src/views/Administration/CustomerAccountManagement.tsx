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
import UITable from "components/UI/Table/UITable";
import useHttp from "hooks/use-http";
import useQuery from "hooks/use-query";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { UIColumnDefinitionType } from "components/UI/Table/Types";

const CustomerAccountManagement = () => {
  const {
    data: customerAccounts,
    isLoading,
    makeRequest: fetchCustomerAccounts,
  } = useHttp<CustomerAccount[]>(getCustomerAccounts, false);

  const [selectedAccount, setSelectedAccount] = useState<CustomerAccount>();

  const { t } = useTranslation("administration");
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
    confirmationDialogRef.current?.open();
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
      key: "id",
    },
    {
      header: t("common.name"),
      key: "name",
    },
    {
      header: t("common.creator"),
      key: "creatorAccountId",
      render: (item: CustomerAccount) => item.creatorCustomerAccountName,
    },
    {
      header: t("common.compteParent"),
      key: "parentId",
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
      key: "actif",
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
        title={t("customerAccounts.updateStatusDialog.title")}
        message={
          selectedAccount && selectedAccount.actif
            ? t("customerAccounts.updateStatusDialog.desativationMessage")
            : t("customerAccounts.updateStatusDialog.activationMessage")
        }
        onConfirm={updateStatusHandler}
        ref={confirmationDialogRef}
      />
    </>
  );
};

export default CustomerAccountManagement;
