import React, { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        Footer Content
      </Text>
    </Flex>
  );
};

export default Footer;
