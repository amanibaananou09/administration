import React from "react";
import { Flex, Text, BoxProps } from "@chakra-ui/react";

interface FooterProps {
  alignBase: string;
}

export default function Footer(props: FooterProps) {
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
      ></Text>
    </Flex>
  );
}
