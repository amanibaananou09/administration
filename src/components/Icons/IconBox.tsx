import React, { ReactNode } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

interface IconBoxProps extends FlexProps {
  children: ReactNode;
}

const IconBox: React.FC<IconBoxProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"8px"}
      {...rest}
    >
      {children}
    </Flex>
  );
}

export default IconBox;