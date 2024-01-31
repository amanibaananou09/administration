import { Box, Flex, Text } from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useConfirm } from "components/Dialog/ConfirmationDialog";
import CustomerAccountModal from "components/Modal/CustomerAccountModal";
import Status from "components/Sidebar/Status";
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import {
  useCustomerAccountQueries,
  useCustomerAccounts,
} from "hooks/use-customer-account";
import { FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

const CustomerAccountManagement = () => {
  const { t } = useTranslation();
  const history = useHistory();
  let { path } = useRouteMatch();

  const { customerAccounts, isLoading } = useCustomerAccounts();
  const { activate, desactivate } = useCustomerAccountQueries();

  const { confirm, ConfirmationDialog } = useConfirm({
    title: t("customerAccounts.updateStatusDialog.title"),
    onConfirm: (customerAccount) => updateStatus(customerAccount),
  });

  const updateStatus = (customerAccount: CustomerAccount) => {
    if (customerAccount.actif && customerAccount.id) {
      // If currently active, deactivate
      desactivate(customerAccount.id);
    } else if (customerAccount.id) {
      // If currently inactive, activate
      activate(customerAccount.id);
    }
  };

  const submitModalHandler = async () => {};

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
            history.push(`${path}/details/${item.id}`);
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
          onClick={() => {
            const message = item.actif
              ? t("customerAccounts.updateStatusDialog.desativationMessage")
              : t("customerAccounts.updateStatusDialog.activationMessage");
            confirm(item, message);
          }}
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
              history.push(`${path}/edit/${item.id}`);
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

      <ConfirmationDialog />
    </>
  );
};

export default CustomerAccountManagement;
