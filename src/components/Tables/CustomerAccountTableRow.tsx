import { Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import { CustomerAccountTableRowProps } from "common/AdminModel";

const CustomerAccountTableRow = ({
  name,
  description,
  status,
  masterUser,
}: CustomerAccountTableRowProps) => {
  const textColor = useColorModeValue("gray.500", "white");
  const bgColor = useColorModeValue("gray.100", "gray.800");

  return (
    <Tr _odd={{ bg: bgColor }} _even={{ bg: bgColor }}>
      <Td width="20%">
        <Text fontSize="m" align="center" color={textColor} fontWeight="bold">
          {name}
        </Text>
      </Td>
      <Td width="30%">
        <Text fontSize="m" align="center" color={textColor} fontWeight="bold">
          {description}
        </Text>
      </Td>
      <Td width="20%">
        <Text
          fontSize="m"
          align="center"
          color={textColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {status}
        </Text>
      </Td>
      <Td width="30%">
        <Text
          fontSize="m"
          align="center"
          color={textColor}
          fontWeight="bold"
          pb=".5rem"
        >
          {masterUser}
        </Text>
      </Td>
    </Tr>
  );
};

export default CustomerAccountTableRow;
