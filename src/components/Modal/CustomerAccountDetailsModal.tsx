import React from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { ModalFooter } from "@chakra-ui/modal";
import { useTranslation } from "react-i18next";

interface CustomerAccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountDetails: CustomerAccount | null;
}

const CustomerAccountDetailsModal = ({
  isOpen,
  onClose,
  accountDetails,
}: CustomerAccountDetailsModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        style={{
          backgroundColor: "gray.100",
          borderRadius: "10px",
        }}
      >
        <ModalHeader
          style={{
            backgroundColor: "black",
            color: "white",
          }}
        >
          {t("accountDetailsModel.header")}
        </ModalHeader>
        <ModalCloseButton color="white" />

        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomerAccountDetailsModal;
