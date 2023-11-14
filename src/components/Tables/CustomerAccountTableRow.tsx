import { Badge, Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import { CustomerAccountTableRowProps } from "common/AdminModel";
import { useHistory } from "react-router-dom";

const CustomerAccountTableRow = ({
                                   name,
                                   description,
                                   status,
                                   masterUser
                                 }: CustomerAccountTableRowProps) => {
  const textColor = useColorModeValue("gray.500", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const history = useHistory();

  const handleLinkClick = () => {
    history.push(`/CustomerAccountInformation/${name}`);
  };

  return (
    <Tr>
      <Td borderColor={borderColor}>
        <Flex direction="column">
          <Text
            fontSize="md"
            textAlign="center"
            color={textColor}
            fontWeight="bold"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={handleLinkClick}
          >
            {name}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Text fontSize="md" textAlign="center" color={textColor} fontWeight="bold">
          {description}
        </Text>
      </Td>
      <Td borderColor={borderColor} display="flex" justifyContent="center" alignItems="center">
        <Badge
          bg={status ? "green.400" : bgStatus}
          color={status ? "white" : "white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>
      <Td borderColor={borderColor}>
        <Text fontSize="md" textAlign="center" color={textColor} fontWeight="bold">
          {masterUser}
        </Text>
      </Td>
    </Tr>
  );
};

export default CustomerAccountTableRow;
