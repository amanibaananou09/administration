import React from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import { formatDate } from "utils/utils";
import { useTranslation } from "react-i18next";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userDetails: GeneralUser | null;
}

const UserDetailsModal = ({
  isOpen,
  onClose,
  userDetails,
}: UserDetailsModalProps) => {
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
          {t("userDetailsModel.header")}
        </ModalHeader>
        <ModalCloseButton color="red" />
        <ModalBody>
          {userDetails && (
            <Flex justifyContent="space-between" flexWrap="wrap" p="4">
              <div style={{ marginBottom: "10px" }}>
                <Text fontWeight="bold" marginBottom="5px">
                  {t("userDetailsModel.username")}
                </Text>
                <Text fontWeight="bold" marginBottom="5px">
                  {t("userDetailsModel.name")}
                </Text>
                <Text fontWeight="bold" marginBottom="5px">
                  {t("userDetailsModel.email")}
                </Text>
                <Text fontWeight="bold" marginBottom="5px">
                  {t("userDetailsModel.phone")}
                </Text>
                <Text fontWeight="bold" marginBottom="5px">
                  {t("userDetailsModel.customerAccount")}
                </Text>
                <Text fontWeight="bold" marginBottom="5px">
                  {t("userDetailsModel.creatorAccount")}
                </Text>
                <Text fontWeight="bold" marginBottom="5px">
                  {t("userDetailsModel.lastConnection")}
                </Text>
              </div>
              <div>
                <Text fontWeight="normal" marginBottom="5px">
                  {userDetails.username ?? "-"}
                </Text>
                <Text fontWeight="normal" marginBottom="5px">
                  {`${userDetails.firstName ?? ""} ${
                    userDetails.lastName ?? ""
                  }`.trim() || "-"}
                </Text>

                <Text fontWeight="normal" marginBottom="5px">
                  {userDetails.email ?? "-"}
                </Text>
                <Text fontWeight="normal" marginBottom="5px">
                  {userDetails.phone ?? "-"}
                </Text>
                <Text fontWeight="normal" marginBottom="5px">
                  {userDetails.customerAccountName ?? "-"}
                </Text>
                <Text fontWeight="normal" marginBottom="5px">
                  {userDetails.creatorCustomerAccountName ?? "-"}
                </Text>
                <Text fontWeight="normal" marginBottom="5px">
                  {formatDate(userDetails.lastConnectionDate) ?? "-"}
                </Text>
              </div>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailsModal;
