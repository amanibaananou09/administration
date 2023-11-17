import { Badge, Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import { customerAccount } from "common/AdminModel";
import { useHistory } from 'react-router-dom';


const CustomerAccountTableRow = ({ id,
                                   name,
                                   description,
                                   status,
                                   masterUser
                                 }: customerAccount )=> {
  const textColor = useColorModeValue("gray.500", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const history = useHistory();

  const getStatusColor = (status : string) => {
    return status === 'ENABLED' ? 'green.400' : 'red.400';
  };

  const handleNameClick = () => {
    history.push(`/administration/CustomerAccountInformation/${id}`);
  };

  return (
    <Tr>
      <Td borderColor={borderColor}>
        <Flex direction="column">
          <Text
            textAlign="center"
            as="span"
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={handleNameClick}
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
          bg={getStatusColor(status)}
          color="white"
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>
      <Td borderColor={borderColor}>
        <Text fontSize="md" textAlign="center" color={textColor} fontWeight="bold">
          {masterUser.username}
        </Text>
      </Td>
    </Tr>
  );
};

export default CustomerAccountTableRow;
