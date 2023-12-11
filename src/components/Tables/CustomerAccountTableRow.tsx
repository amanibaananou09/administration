import { Badge, Td, Text, Tr } from "@chakra-ui/react";
import { CustomerAccountTableRowProps } from "common/react-props";
import { useHistory } from "react-router-dom";
import { GeneralUser } from "../../common/AdminModel";
import { useTranslation } from "react-i18next";
import {
  activateCustomerAccount,
  deactivateCustomerAccount,
} from "../../common/api/customerAccount-api";

const CustomerAccountTableRow = ({
  index,
  customerAccount,
  isLastRow,
}: CustomerAccountTableRowProps & { index: number }) => {
  const {
    id,
    name,
    creatorUser,
    parentName,
    resaleRight,
    stationsCount,
    status,
    actif,
  } = customerAccount;

  const { t } = useTranslation("administration");

  const handleClick = async () => {
    try {
      if (actif) {
        // If currently active, deactivate
        await deactivateCustomerAccount(id);
      } else {
        // If currently inactive, activate
        await activateCustomerAccount(id);
      }

      console.log("Clicked!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //styles
  const borderColor = "gray.200";
  const columnWidth = "100px";
  return (
    <Tr>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {index + 1}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {name}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {name}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" fontWeight="normal">
          {parentName}
        </Text>
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        {resaleRight ? t("common.reseller") : "-"}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {actif ? (
            <Text fontSize="md" color="green.400" fontWeight="bold">
              ✓
            </Text>
          ) : (
            <Text fontSize="md" color="red.400" fontWeight="bold">
              X
            </Text>
          )}
        </div>
      </Td>

      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" fontWeight="normal">
          {stationsCount}
        </Text>
      </Td>

      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" color="red.400" fontWeight="bold">
          X
        </Text>
      </Td>
    </Tr>
  );
};

export default CustomerAccountTableRow;
