import { Box, useStyleConfig, BoxProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface CardProps extends BoxProps {
  variant: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ variant, children, ...rest }) => {
  const styles = useStyleConfig("Card", { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
