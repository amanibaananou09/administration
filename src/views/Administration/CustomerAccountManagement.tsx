import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useConfirm } from "components/Dialog/ConfirmationDialog";
import CustomerAccountExporter from "components/Exporter/CustomerAccountExporter";
import CustomerAccountModal from "components/Modal/CustomerAccountModal";
import Status from "components/Sidebar/Status";
import { SkeletonTable } from "components/Skeleton/Skeletons";
import { UIColumnDefinitionType } from "components/UI/Table/Types";
import UITable from "components/UI/Table/UITable";
import {
  useCustomerAccountQueries,
  useCustomerAccounts,
} from "hooks/use-customer-account";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

const CustomerAccountManagement = () => {
  const { t } = useTranslation();
  const history = useHistory();
  let { path } = useRouteMatch();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const {
    customerAccounts,
    totalPages,
    totalElements,
    isLoading,
  } = useCustomerAccounts({
    page: currentPage,
  });
  const { activate, desactivate } = useCustomerAccountQueries();

  const numberOfElements = customerAccounts ? customerAccounts.length : 0;

  const { confirm, ConfirmationDialog } = useConfirm({
    title: t("customerAccounts.updateStatusDialog.title"),
    onConfirm: (customerAccount) => updateStatus(customerAccount),
  });

  const submitModalHandler = async () => {};
  const updateStatus = (customerAccount: CustomerAccount) => {
    if (customerAccount.actif && customerAccount.id) {
      // If currently active, deactivate
      desactivate(customerAccount.id);
    } else if (customerAccount.id) {
      // If currently inactive, activate
      activate(customerAccount.id);
    }
  };

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

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                {t("customerAccounts.header")}
              </Text>
              {customerAccounts && (
                <CustomerAccountExporter customerAccounts={customerAccounts} />
              )}
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
          <Box
            display={{ base: "none", md: "flex" }}
            justifyContent="flex-end"
            p="4"
          >
            <ButtonGroup spacing={4}>
              <Button
                isDisabled={currentPage === 0 || totalPages === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {t("common.previous")}
              </Button>
              <Button isDisabled={currentPage === 0 || totalPages === 0}>
                {t("common.page")} {currentPage + 1} {t("common.of")}{" "}
                {totalPages}
              </Button>
              <Button
                isDisabled={currentPage === totalPages - 1 || totalPages === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {t("common.next")}
              </Button>
              <Button isDisabled={currentPage === 0 || totalPages === 0}>
                {t("common.report")} {numberOfElements} {t("common.on")}{" "}
                {totalElements}
              </Button>
            </ButtonGroup>
          </Box>
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
