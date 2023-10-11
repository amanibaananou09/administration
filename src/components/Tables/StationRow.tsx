import React from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

interface StationRowProps {
  id: string;
  name: string;
  address: string;
  controllerId: string;
  controllerPtsId: string;
  firmwareVersion: string;
  onEdit: () => void;
  onDelete: () => void;
}

const StationRow: React.FC<StationRowProps> = ({
  id,
  name,
  address,
  controllerId,
  controllerPtsId,
  firmwareVersion,
  onEdit,
  onDelete,
}: StationRowProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "navy.900");
  const nameColor = useColorModeValue("gray.500", "white");

  return (
    <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
      <Flex justify="space-between" w="100%">
        <Flex direction="column" maxWidth="70%">
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
            {name}
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Address:{" "}
            <Text as="span" color={nameColor}>
              {address}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Controller Pts Id:{" "}
            <Text as="span" color={nameColor}>
              {controllerPtsId}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Firmware version:{" "}
            <Text as="span" color={nameColor}>
              {firmwareVersion}
            </Text>
          </Text>
        </Flex>
        <Flex
          direction={{ sm: "column", md: "row" }}
          align="flex-start"
          p={{ md: "24px" }}
        >
          <Button
            p="0px"
            bg="transparent"
            variant="no-effects"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
            onClick={onDelete}
          >
            <Flex color="red.500" cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                DELETE
              </Text>
            </Flex>
          </Button>
          <Button
            p="0px"
            bg="transparent"
            variant="no-effects"
            onClick={onEdit}
          >
            <Flex color={textColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaPencilAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                EDIT
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default StationRow;
