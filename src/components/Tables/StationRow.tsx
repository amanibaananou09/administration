import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { StationRowProps } from "common/react-props";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const StationRow = ({
  name,
  address,
  controllerPtsId,
  firmwareInformations,
  onEdit,
  onDelete,
}: StationRowProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "navy.900");
  const nameColor = useColorModeValue("gray.500", "white");
  const { t } = useTranslation("dashboard");

  return (
    <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
      <Flex justify="space-between" w="100%">
        <Flex direction="column" maxWidth="70%">
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
            {name}
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
          {t("common.addressLabel")}:
            <Text as="span" color={nameColor}>
              {address}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
          {t("common.controllerPtsIdLabel")}:{" "}
            <Text as="span" color={nameColor}>
              {controllerPtsId}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
          {t("stationRow.firmwareVersionLabel")}:{" "}
            <Text as="span" color={nameColor}>
              {firmwareInformations}
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
              {t("common.deleteButtonText")}
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
              {t("common.editButtonText")}
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default StationRow;
