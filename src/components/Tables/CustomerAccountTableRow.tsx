import { Badge, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import { CustomerAccountTableRowProps } from "common/react-props";
import { useHistory } from "react-router-dom";

const CustomerAccountTableRow = ({
  customerAccount,
  isLastRow,
}: CustomerAccountTableRowProps) => {
  const textColor = useColorModeValue("gray.500", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { id, name, description, status, masterUser } = customerAccount;

  const history = useHistory();

  const getStatusColor = (status: string) => {
    return status === "ENABLED" ? "green.400" : "red.400";
  };

  const handleNameClick = () => {
    history.push(`/administration/CustomerAccountInformation/${id}`);
  };

  return (
    <Tr>
      <Td
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        <Text
          as="span"
          textDecoration="underline"
          cursor="pointer"
          onClick={handleNameClick}
        >
          {name}
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {description}
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {masterUser.username}
        </Text>
      </Td>
      <Td
        borderColor={borderColor}
        borderBottom={isLastRow ? "none" : undefined}
        textAlign="center"
      >
        <Badge
          bg={getStatusColor(status)}
          color="white"
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>
    </Tr>
  );
};

export default CustomerAccountTableRow;
