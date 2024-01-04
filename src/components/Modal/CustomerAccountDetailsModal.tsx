import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import UIDetailModal from "components/UI/Modal/UIDetailModal";
import { Ref, forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";

interface CustomerAccountDetailsModalProps {}

export interface CustomerAccountDetailsModalRefType {
  open: (customerAccount: CustomerAccount) => void;
}

const CustomerAccountDetailsModal = (
  {}: CustomerAccountDetailsModalProps,
  ref: Ref<CustomerAccountDetailsModalRefType>,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [accountDetails, setAccountDetails] = useState<CustomerAccount>();
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    open(account) {
      setAccountDetails(account);
      onOpen();
    },
  }));

  return (
    <UIDetailModal
      title={t("accountDetailsModel.header")}
      isOpen={isOpen}
      onClose={onClose}
    >
      {accountDetails && (
        <Flex justifyContent="space-between" flexWrap="wrap" p="4">
          <div style={{ marginBottom: "10px" }}>
            <Text fontWeight="bold" marginBottom="5px">
              {t("accountDetailsModel.name")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("accountDetailsModel.parent")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("accountDetailsModel.creator")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("accountDetailsModel.resale")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("accountDetailsModel.stations")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("accountDetailsModel.actif")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px">
              {t("accountDetailsModel.masterUser")}
            </Text>
          </div>
          <div>
            <Text fontWeight="normal" marginBottom="5px">
              {accountDetails.name ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {accountDetails.parentName ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {accountDetails.creatorCustomerAccountName ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {accountDetails.resaleRight ? t("common.reseller") : "No"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {accountDetails.stationsCount ?? "-"}
            </Text>
            <Text fontWeight="normal" marginBottom="5px">
              {accountDetails.actif ? "Yes" : "No"}
            </Text>
            <Text fontWeight="normal">
              {accountDetails.masterUser?.username ?? "-"}
            </Text>
          </div>
        </Flex>
      )}
    </UIDetailModal>
  );
};

export default forwardRef(CustomerAccountDetailsModal);
