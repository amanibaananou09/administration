import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import { formatDate } from "utils/utils";
import { useHistory } from "react-router-dom";

export interface UserTableRowProps {
  user: GeneralUser;
  isLast: boolean;
}

const UserTableRow = ({ user, isLast }: UserTableRowProps) => {
  const textColor = useColorModeValue("gray.500", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const history = useHistory();

  const handleNameClick = () => {
    history.push(`/administration/UserDetails/${user.id}`);
  };

  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
      >
        <Flex direction="column">
          <Text
            textAlign="center"
            as="span"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={handleNameClick}
          >
            {user.username}
          </Text>
        </Flex>
      </Td>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
      >
        <Text
          fontSize="md"
          textAlign="center"
          color={textColor}
          fontWeight="bold"
        >
          {`${user.firstName} ${user.lastName}`}
        </Text>
      </Td>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
      >
        <Text
          fontSize="md"
          textAlign="center"
          color={textColor}
          fontWeight="bold"
        >
          {user.email}
        </Text>
      </Td>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
      >
        <Text
          fontSize="md"
          textAlign="center"
          color={textColor}
          fontWeight="bold"
        >
          {user.phone}
        </Text>
      </Td>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Badge
          bg={user.actif ? "green.400" : bgStatus}
          color={user.actif ? "white" : "white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {user.actif ? "Active" : "Desactivated"}
        </Badge>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : undefined}>
        <Button p="0px" bg="transparent" variant="no-effects">
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            Edit
          </Text>
        </Button>
      </Td>
      ;
    </Tr>
  );
};

export default UserTableRow;
