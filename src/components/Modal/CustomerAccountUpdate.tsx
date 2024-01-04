import { Checkbox, Flex, Input, Select, Text } from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  getCustomerAccounts,
  updateCustomerAccount,
} from "common/api/customerAccount-api";
import UIUpdateModal from "./UIUpdateModal";

interface CustomerAccountUpdateProps {
  isOpen: boolean;
  onClose: () => void;
  accountDetails: CustomerAccount | null;
}

const CustomerAccountUpdate = ({
  isOpen,
  onClose,
  accountDetails,
}: CustomerAccountUpdateProps) => {
  const { t } = useTranslation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(accountDetails?.name ?? "-");
  const [editedResaleRight, setEditedResaleRight] = useState(
    accountDetails?.resaleRight ?? false,
  );
  const [editedParentId, setEditedParentId] = useState(
    accountDetails?.parentId ?? undefined,
  );
  const [editedCreatorId, setEditedCreatorId] = useState(
    accountDetails?.creatorAccountId ?? undefined,
  );
  const [customerAccounts, setCustomerAccounts] = useState<CustomerAccount[]>(
    [],
  );

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await getCustomerAccounts();
        setCustomerAccounts(accounts);
      } catch (error) {
        console.error("Error fetching customer accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    // Set default values when the modal is opened in edit mode
    if (isOpen && accountDetails) {
      setEditedName(accountDetails.name ?? "-");
      setEditedResaleRight(accountDetails.resaleRight ?? false);
      setEditedParentId(accountDetails.parentId ?? undefined);
      setEditedCreatorId(accountDetails.creatorAccountId ?? undefined);
      setIsEditMode(true);
    }
  }, [isOpen, accountDetails]);

  const handleUpdate = async () => {
    try {
      if (accountDetails?.id) {
        // Prepare the updated account object
        const updatedAccount: CustomerAccount = {
          id: accountDetails.id,
          name: editedName,
          resaleRight: editedResaleRight,
          parentId: editedParentId,
          creatorAccountId: editedCreatorId,
        };
        console.log("Updating with values:", updatedAccount);

        await updateCustomerAccount(updatedAccount);

        handleModalClose();
      }
    } catch (error) {
      console.error("Error updating customer account:", error);
    }
  };
  const handleCreatorChange = (value: string) => {
    setEditedCreatorId(value);
  };

  const handleParentChange = (value: string) => {
    setEditedParentId(value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleResaleRightChange = () => {
    setEditedResaleRight(!editedResaleRight);
  };
  const handleModalClose = () => {
    setIsEditMode(false);
    onClose();
  };

  return (
    <UIUpdateModal
      title={t("accountDetailsModel.updateHeader")}
      isOpen={isOpen}
      onClose={handleModalClose}
      onHandleUpdate={handleUpdate}
    >
      {accountDetails && (
        <Flex justifyContent="space-between" flexWrap="wrap" p="4">
          <div style={{ marginBottom: "10px" }}>
            <Text fontWeight="bold" marginBottom="5px">
              {t("accountDetailsModel.name")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px" marginTop="1.1rem">
              {t("accountDetailsModel.parent")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px" marginTop="1rem">
              {t("accountDetailsModel.creator")}
            </Text>
            <Text fontWeight="bold" marginBottom="5px" marginTop="1rem">
              {t("accountDetailsModel.resale")}
            </Text>
          </div>
          <div>
            <Input
              type="text"
              value={editedName}
              onChange={handleNameChange}
              isReadOnly={!isEditMode}
            />
            <Select
              value={editedParentId}
              onChange={(e) => handleParentChange(e.target.value)}
              marginTop="0.5rem"
              isReadOnly={!isEditMode}
            >
              {customerAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </Select>
            <Select
              value={editedCreatorId}
              onChange={(e) => handleCreatorChange(e.target.value)}
              marginTop="0.5rem"
              isReadOnly={!isEditMode}
            >
              {customerAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </Select>
            <Checkbox
              isChecked={editedResaleRight}
              onChange={handleResaleRightChange}
              marginTop="0.5rem"
              isDisabled={!isEditMode}
            >
              {t("common.reseller")}
            </Checkbox>
          </div>
        </Flex>
      )}
    </UIUpdateModal>
  );
};

export default CustomerAccountUpdate;
