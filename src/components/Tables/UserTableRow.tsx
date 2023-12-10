import { Badge, Td, Text, Tr } from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import { useHistory } from "react-router-dom";

export interface UserTableRowProps {
  user: GeneralUser;
  isLast: boolean;
}

const UserTableRow = ({ user, isLast }: UserTableRowProps) => {
  const history = useHistory();

  const handleNameClick = () => {
    history.push(`/administration/users/${user.id}/details`);
  };

  //styles
  const textColor = "gray.500";
  const borderColor = "gray.200";

  return (
    <Tr>
      <Td
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <Text
          as="span"
          textDecoration="underline"
          cursor="pointer"
          onClick={handleNameClick}
        >
          {user.username}
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {`${user.firstName} ${user.lastName}`}
        </Text>
      </Td>

      <Td
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {user.phone}
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {user.email}
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        textAlign="center"
      >
        <Badge
          bg={user.actif ? "green.400" : "red.400"}
          color={user.actif ? "white" : "white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {user.actif ? "Active" : "Deactivate"}
        </Badge>
      </Td>
    </Tr>
  );
};

export default UserTableRow;
