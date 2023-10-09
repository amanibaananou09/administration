import React from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
  IconType,
} from "@chakra-ui/react";

interface InvoicesRowProps {
  date: string;
  code: string;
  price: string;
  format: string;
  logo: IconType;
}

const InvoicesRow: React.FC<InvoicesRowProps> = ({
  date,
  code,
  price,
  format,
  logo,
}: InvoicesRowProps) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex my={{ sm: "1rem", xl: "10px" }} alignItems="center">
      <Flex direction="column">
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {date}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="semibold" me="16px">
          {code}
        </Text>
      </Flex>
      <Spacer />
      <Box me="12px">
        <Text fontSize="md" color="gray.400" fontWeight="semibold">
          {price}
        </Text>
      </Box>
      <Button p="0px" bg="transparent" variant="no-effects">
        <Flex alignItems="center" p="12px">
          <Icon as={logo} w="20px" h="auto" me="5px" color={textColor} />
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {format}
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
};

export default InvoicesRow;
