import { Box, Flex, Text } from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import {
  activateCustomerAccount,
  deactivateCustomerAccount,
  getCustomerAccounts,
} from "common/api/customerAccount-api";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ConfirmationDialog, {
  ConfirmationDialogRefType,
} from "components/Dialog/ConfirmationDialog";
import CustomerAccountModal from "components/Modal/CustomerAccountModal";
import Status from "components/Sidebar/Status";
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import useHttp from "hooks/use-http";
import useQuery from "hooks/use-query";
import { FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

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

  const history = useHistory();

  const confirmationDialogRef = useRef<ConfirmationDialogRefType>(null);

  const submitModalHandler = async () => {
    await fetchCustomerAccounts();
  };

  const updateStatusHandler = async () => {
    if (selectedAccount) {
      let item = selectedAccount;
      if (item.actif && item.id) {
        // If currently active, deactivate
        await deactivateCustomerAccount(item.id);
      } else if (item.id) {
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

  const columns: UIColumnDefinitionType<CustomerAccount>[] = [
    {
      header: "#",
      key: "#",
    },
    {
      header: t("common.name"),
      key: "name",
      render: (item: CustomerAccount) => (
        <div
          style={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            const clickedAccount = customerAccounts?.find(
              (acc) => acc && acc.id === item.id,
            );

            if (clickedAccount) {
              setSelectedAccount(clickedAccount);
              history.push(`${path}/details/${item.id}`);
            }
          }}
        >
          {item.name}
        </div>
      ),
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
      header: t("common.action"),
      render: (item: CustomerAccount) => (
        <Flex justifyContent="center">
          <Box pr={6}>
            <Status value={false} />
          </Box>
          <FaPencilAlt
            style={{ cursor: "pointer" }}
            onClick={() => {
              const clickedAccount = customerAccounts?.find(
                (acc) => acc && acc.id === item.id,
              );

              if (clickedAccount) {
                setSelectedAccount(clickedAccount);
                history.push(`${path}/edit/${item.id}`);
              }
            }}
          />
        </Flex>
      ),
    },
  ];

  //styles
  const textColor = "gray.700";

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
                data={customerAccounts.sort(
                  (c1, c2) => Number(c1.id!!) - Number(c2.id!!),
                )}
                columns={columns}
                emptyListMessage={t("customerAccounts.listEmpty")}
              />
            )}

            {isLoading && <SkeletonTable />}
          </CardBody>
        </Card>
      </Flex>
      <Switch>
        <Route path={`${path}/new`}>
          <CustomerAccountModal
            onSubmit={submitModalHandler}
            mode={Mode.CREATE}
          />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <CustomerAccountModal
            onSubmit={submitModalHandler}
            mode={Mode.EDIT}
          />
        </Route>
        <Route path={`${path}/details/:id`}>
          <CustomerAccountModal
            onSubmit={submitModalHandler}
            mode={Mode.VIEW}
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
