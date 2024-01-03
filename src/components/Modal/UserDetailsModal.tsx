import { Flex, Text } from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import UIDetailModal from "components/UI/Modal/UIDetailModal";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/utils";

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
    <UIDetailModal
      title={t("userDetailsModel.header")}
      isOpen={isOpen}
      onClose={onClose}
    >
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
    </UIDetailModal>
  );
};

export default UserDetailsModal;
