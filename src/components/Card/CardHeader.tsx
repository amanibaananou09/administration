import React, { FC } from "react";
import { Box, useStyleConfig, BoxProps } from "@chakra-ui/react";

interface CardHeaderProps extends BoxProps {
  variant: string;
}

const CardHeader: FC<CardHeaderProps> = (props) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardHeader", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default CardHeader;