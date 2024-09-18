import { Flex, Select } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IoMdExit } from "react-icons/io";
import { useCustomerAccountById } from "../../hooks/use-customer-account";
import { useTranslation } from "react-i18next";

interface LoggedAsSelectProps {
  userId: number | undefined;
  customerAccountId: String;
  selectedValue: string;
  handleSelectChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    userId: number | undefined,
  ) => void;
  handleIconClick: (userId: number | undefined) => void;
}

const LoggedAsSelect = ({
  userId,
  customerAccountId,
  selectedValue,
  handleSelectChange,
  handleIconClick,
}: LoggedAsSelectProps) => {
  const { customerAccount, isLoading } = useCustomerAccountById(
    Number(customerAccountId),
  );
  const { t } = useTranslation();

  const handleSelectClick = () => {
    if (customerAccount) {
      console.log(
        "LoggedAsSelect opened with customerAccount:",
        customerAccount,
      );
    }
  };

  if (userId === undefined) {
    return null;
  }

  return (
    <Flex justifyContent="center" alignItems="center">
      {customerAccount?.resaleRight ? (
        <Select
          value={selectedValue || ""}
          onChange={(e) => handleSelectChange(e, userId)}
          onClick={handleSelectClick}
        >
          <option value="" disabled hidden>
            {t("common.accessLinks")}
          </option>
          <option value="administration">administration</option>
          <option value="Dashboard">Dashboard</option>
        </Select>
      ) : (
        <Select
          value={selectedValue || ""}
          onChange={(e) => handleSelectChange(e, userId)}
          onClick={handleSelectClick}
        >
          <option value="" disabled hidden>
            {t("common.accessLinks")}
          </option>
          <option value="Dashboard">Dashboard</option>
        </Select>
      )}
      <IoMdExit
        style={{ cursor: "pointer", width: "50px", height: "20px" }}
        onClick={() => handleIconClick(userId)}
      />
    </Flex>
  );
};

export default LoggedAsSelect;
