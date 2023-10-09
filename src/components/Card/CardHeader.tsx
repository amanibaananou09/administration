import { Box, useStyleConfig, BoxProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface CardHeaderProps extends BoxProps {
  variant: string;
  children: ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ variant, children, ...rest }) => {
  const styles = useStyleConfig("CardHeader", { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default CardHeader;
