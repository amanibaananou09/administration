import { Td, Text, Tr } from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import { useHistory } from "react-router-dom";
import {
  activateUser,
  deactivateUser,
} from "../../common/api/general-user-api";
import { useEffect, useState } from "react";
import { getCustomerAccountInformation } from "../../common/api/station-api";

export interface UserTableRowProps {
  user: GeneralUser;
  isLast: boolean;
}

const UserTableRow = ({
  index,
  user,
  isLast,
}: UserTableRowProps & { index: number }) => {
  const [customerAccountName, setCustomerAccountName] = useState("");
  const [creatorAccountName, setCreatorAccountName] = useState("");

  useEffect(() => {
    const fetchCustomerAccountName = async () => {
      try {
        if (user.customerAccountId) {
          const customerAccountInfo = await getCustomerAccountInformation(
            user.customerAccountId,
          );
          setCustomerAccountName(customerAccountInfo.name);
        } else {
          console.error("user.customerAccountId is undefined");
        }
      } catch (error) {
        console.error("Error fetching customer account information:", error);
      }
    };

    const fetchCreatorAccountName = async () => {
      try {
        if (user.creatorAccountId) {
          const creatorAccountInfo = await getCustomerAccountInformation(
            user.creatorAccountId,
          );
          setCreatorAccountName(creatorAccountInfo.name);
        } else {
          console.error("user.creatorAccountId is undefined");
        }
      } catch (error) {
        console.error("Error fetching creator account information:", error);
      }
    };

    fetchCustomerAccountName();
    fetchCreatorAccountName();
  }, [user.creatorAccountId, user.customerAccountId]);

  const handleClick = async () => {
    try {
      if (user.actif) {
        // If currently active, deactivate
        await deactivateUser(user.id);
      } else {
        // If currently inactive, activate
        await activateUser(user.id);
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
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        {index + 1}
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" fontWeight="normal">
          {user.username}
        </Text>
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" fontWeight="normal">
          {creatorAccountName}
        </Text>
      </Td>

      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" fontWeight="normal">
          {customerAccountName}
        </Text>
      </Td>
      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" fontWeight="normal"></Text>
      </Td>

      <Td
        width={columnWidth}
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {user.actif ? (
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
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" color="red.400" fontWeight="bold">
          X
        </Text>
      </Td>
    </Tr>
  );
};

export default UserTableRow;
