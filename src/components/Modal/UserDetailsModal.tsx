import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import UIDetailModal from "components/UI/Modal/UIDetailModal";
import { Ref, forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/utils";

interface UserDetailsModalProps {}

export interface UserDetailsModalRefType {
  open: (user: GeneralUser) => void;
}

const UserDetailsModal = (
  props: UserDetailsModalProps,
  ref: Ref<UserDetailsModalRefType>,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userDetails, setUserDetails] = useState<GeneralUser>();
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    open(user) {
      setUserDetails(user);
      onOpen();
    },
  }));

  return (
    <UIDetailModal
      title={t("userDetailsModel.header")}
      isOpen={isOpen}
      onClose={onClose}
    >
      {userDetails && (
        <Flex justifyContent="space-between" flexWrap="wrap">
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

export default forwardRef(UserDetailsModal);
