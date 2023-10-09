import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { ClockIcon } from "src/components/Icons/Icons";
import React from "react";

interface ItemContentProps {
  aName: string;
  aSrc: string;
  boldInfo: string;
  info: string;
  time: string;
}

export const ItemContent: React.FC<ItemContentProps> = ({
  aName,
  aSrc,
  boldInfo,
  info,
  time,
}) => {
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");
  const spacing = " ";

  return (
    <>
      <Avatar name={aName} src={aSrc} borderRadius="12px" me="16px" />
      <Flex flexDirection="column">
        <Text fontSize="14px" mb="5px" color={notificationColor}>
          <Text fontWeight="bold" fontSize="14px" as="span">
            {boldInfo}
            {spacing}
          </Text>
          {info}
        </Text>
        <Flex alignItems="center">
          <ClockIcon color={navbarIcon} w="13px" h="13px" me="3px" />
          <Text fontSize="xs" lineHeight="100%" color={navbarIcon}>
            {time}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
