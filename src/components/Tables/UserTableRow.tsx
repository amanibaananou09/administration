import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserAcount } from "common/model";

export interface UserTableRowProps {
  user: UserAcount;
  isLast: boolean;
}

const UserTableRow = ({ user, isLast }: UserTableRowProps) => {
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
      >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={titleColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {`${user.firstName} ${user.lastName}`}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {user.username}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : undefined}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {user.email}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : undefined}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {user.address}
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : undefined}>
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
    </Tr>
  );
};

export default UserTableRow;
