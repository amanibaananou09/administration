import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { CustAccount } from "common/AdminModel";
import { useHistory } from "react-router-dom";

export interface CustomerAccountTableRowProps {
  customerAccount: CustAccount;
  isLast: boolean;
}

const CustomerAccountTableRow = ({
  customerAccount,
  isLast,
}: CustomerAccountTableRowProps) => {
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const history = useHistory();

  const handleNameClick = () => {
    history.push(
      `/administration/CustomerAccountInformation/${customerAccount.id}`,
    );
  };

  return (
    <Tr>
      <Td
        borderColor={borderColor}
        borderBottom={isLast ? "none" : undefined}
        paddingLeft="0"
      >
        <Flex direction="column">
          <Text fontSize="md" color={titleColor} fontWeight="bold">
            {customerAccount.name}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : undefined}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {customerAccount.description}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : undefined}>
        <Badge
          bg={customerAccount.status === "ENABLED" ? "green.400" : bgStatus}
          color={customerAccount.status === "DESABLED" ? "white" : "white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {customerAccount.status}
        </Badge>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : undefined}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {customerAccount.masterUser.username}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : undefined}>
        <Button
          p="0px"
          bg="transparent"
          variant="no-effects"
          onClick={handleNameClick}
        >
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            View
          </Text>
        </Button>
      </Td>
    </Tr>
  );
};

export default CustomerAccountTableRow;
