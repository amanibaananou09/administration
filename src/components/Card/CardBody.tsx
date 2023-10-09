import { Box, useStyleConfig, BoxProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface CardBodyProps extends BoxProps {
  variant: string;
  children: ReactNode;
}

const CardBody: React.FC<CardBodyProps> = ({ variant, children, ...rest }) => {
  const styles = useStyleConfig("CardBody", { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default CardBody;
