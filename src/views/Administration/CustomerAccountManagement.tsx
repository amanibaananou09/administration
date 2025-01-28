import { Box, Flex, Text } from "@chakra-ui/react";
import { CustomerAccount, CustomerAccountCreteria } from "common/AdminModel";
import { useTranslation } from "react-i18next";

import { Mode } from "common/enums";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import ColumnSelector from "components/ColumnSelector/ColumnSelector";
import { useConfirm } from "components/Dialog/ConfirmationDialog";
import CustomerAccountExporter from "components/Exporter/CustomerAccountExporter";
import CustomerAccountModal from "components/Modal/CustomerAccountModal";
import Pagination from "components/Pagination/Pagination";
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
import Scrollbars from "react-custom-scrollbars";

const CustomerAccountManagement = () => {
  const { t } = useTranslation();
  const history = useHistory();
  let { path } = useRouteMatch();

  const [creteria, setCreteria] = useState<CustomerAccountCreteria>({
    page: 0,
    size: 25,
  });

  const {
    customerAccounts,
    totalPages,
    totalElements,
    isLoading,
  } = useCustomerAccounts(creteria);

  const { activate, desactivate } = useCustomerAccountQueries();

  const { confirm, ConfirmationDialog } = useConfirm({
    title: t("customerAccounts.exportDialog.title"),
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
  //styles
  const textColor = "gray.700";

  const columns: UIColumnDefinitionType<CustomerAccount>[] = [
    {
      header: "#",
      key: "#",
      render: (item) => <div>{item.index}</div>,
    },
    {
      header: t("common.customerIdentifier"),
      key: "identifier",
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
          {item.identifier}
        </div>
      ),
    },
    {
      header: t("common.name"),
      key: "name",
    },
    {
      header: t("common.creatorAccount"),
      key: "creatorCustomerAccountName",
    },
    {
      header: t("common.compteParent"),
      key: "parentName",
    },
    {
      header: t("common.droits"),
      key: "droits",
      render: (item: CustomerAccount) =>
        item.resaleRight ? t("common.reseller") : "-",
    },
    {
      header: t("common.cardManager"),
      key: "cardManager",
      render: (item: CustomerAccount) => <Status value={item.cardManager!!} />,
    },
    {
      header: t("common.status"),
      key: "status",
      render: (item: CustomerAccount) => (
        <div
          onClick={() => {
            const message = item.actif
              ? t("customerAccounts.updateStatusDialog.desativationMessage")
              : t("customerAccounts.updateStatusDialog.activationMessage");
            const title = t("customerAccounts.updateStatusDialog.title");
            confirm({ title, message, onConfirm: () => updateStatus(item) });
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
      key: "action",
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

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns
      .map((column) => column.key)
      .filter((key): key is string => key !== undefined),
  );

  const filteredColumns =
    visibleColumns.length > 0
      ? columns.filter((col) => visibleColumns.includes(col.key as string))
      : columns;

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex align="center" justify="space-between" p="5px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                {t("customerAccounts.header")}
              </Text>
              {customerAccounts && (
                <CustomerAccountExporter customerAccounts={customerAccounts} />
              )}
            </Flex>
          </CardHeader>

          <CardBody>
            <Flex direction="row-reverse">
              <ColumnSelector
                allColumns={columns.map((column) => ({
                  ...column,
                  key: column.key ?? "defaultKey",
                }))}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
              />
              {!isLoading ? (
                <Scrollbars style={{ height: "calc(80vh - 185px)" }}>
                  <UITable
                    data={customerAccounts}
                    columns={filteredColumns}
                    emptyListMessage={t("customerAccounts.listEmpty")}
                  />
                </Scrollbars>
              ) : (
                <SkeletonTable />
              )}
            </Flex>
          </CardBody>

          {!isLoading && (
            <Pagination
              defaultPage={creteria.page}
              defaultsize={creteria.size}
              totalPages={totalPages}
              totalElements={totalElements}
              onChange={(page, size) =>
                setCreteria({
                  page,
                  size,
                })
              }
            />
          )}
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
